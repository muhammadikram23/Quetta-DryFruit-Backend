const express = require('express');
const axios = require('axios');
const router = express.Router();

// Import database connection module
const db = require('../db');

// Helper function to dynamically generate system instruction with live database catalog & strict UI guardrails
async function getDynamicSystemInstruction() {
  let catalogText = 'Currently unavailable.';

  try {
    // Query live products from MySQL database
    const [products] = await db.query(
      'SELECT title, category, price_per_kg, stock_kg FROM products ORDER BY title ASC'
    );

    if (products && products.length > 0) {
      catalogText = products
        .map(
          (p) =>
            `* **${p.title}** (${p.category}): PKR ${p.price_per_kg.toLocaleString()} / kg | Stock Available: ${p.stock_kg} kg`
        )
        .join('\n');
    }
  } catch (err) {
    console.error('Failed to fetch live catalog for AI assistant:', err.message);
    // Fallback static list in case DB query fails
    catalogText = `
* **Premium Chilghoza (Pine Nuts)**: PKR 8,500 / kg
* **Quetta Kaghzi Badam (Soft-Shell Almonds)**: PKR 2,200 / kg
* **Afghani White Anjeer (Dried Figs)**: PKR 2,600 / kg
* **Sundarkhani Golden Kishmish**: PKR 1,800 / kg`;
  }

  return `
You are "Quetta Dry Fruits AI Assistant", a dedicated, friendly sales helper for the online e-commerce store "Quetta Dry Fruits" in Quetta, Pakistan.

STRICT UI & FORMATTING GUARDRAILS:
1. **Clean & Scannable Formatting**:
   - ALWAYS format lists using bullet points (\`*\`) or clean numbered lists.
   - Use **bold text** for product names, prices, and key emphasis (e.g., **PKR 2,200 / kg**).
   - Use Markdown tables when comparing 2 or more products, their categories, or pricing.
   - Keep paragraphs extremely short (1–3 sentences max) so it looks clean inside small chat widget windows.
2. **Visual Hierarchy**:
   - Use headings (\`###\`) sparingly for distinct sections (e.g., \`### 🛒 Product Prices\`).
   - Use friendly, professional emojis where appropriate (e.g., 📦, 🚚, 🥜, 💳).

STRICT SCOPE & TOPIC GUARDRAILS:
1. **Store Topics Only**: You ONLY answer questions directly related to Quetta Dry Fruits products, live prices, stock availability, shipping rates, order process, store policies, and health benefits of dry fruits.
2. **No Coding / Off-Topic Content**: NEVER write code snippets, solve math equations, teach programming, discuss weather, politics, or general news.
3. **Graceful Redirection**: If a user asks anything off-topic, politely decline and pivot back immediately using clean formatting:
   "I am specifically designed to assist with **Quetta Dry Fruits**! How can I help you choose from our fresh catalog today?"
4. **No Price Hallucination**: Quote prices and stock levels EXACTLY as provided in the live catalog below. Never invent products or prices.

STORE DETAILS & LIVE CATALOG:
* **Store Name**: Quetta Dry Fruits
* **Sourcing**: Sourced directly from Suraj Ganj Bazaar & Kandahari Bazaar, Quetta.
* **Delivery Fee**: Flat **PKR 200** delivery fee across Quetta with same-day processing.

LIVE PRODUCT CATALOG (REAL-TIME FROM DATABASE):
${catalogText}

LANGUAGE & TONE:
- Professional, welcoming, concise, and helpful.
- Respond in English or Roman Urdu / Urdu based on user preference.
`;
}

// 🔍 GET /api/chat/models
router.get('/models', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing.' });
    }

    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const availableModels = response.data?.models?.map((m) => m.name.replace('models/', '')) || [];

    return res.json({
      status: 'success',
      totalModels: availableModels.length,
      models: availableModels,
    });
  } catch (error) {
    const errData = error.response?.data || error.message;
    console.error('Failed to fetch models:', errData);
    return res.status(error.response?.status || 500).json({
      error: 'Failed to retrieve models for this API key.',
      details: errData,
    });
  }
});

// 💬 POST /api/chat
router.post('/', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing API Key',
        message: 'GEMINI_API_KEY is not set on Vercel environment variables.',
      });
    }

    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Validation Error', message: 'Message string is required.' });
    }

    // Build fresh system prompt with current database prices & strict UI instructions
    const systemInstruction = await getDynamicSystemInstruction();

    const formattedHistory = Array.isArray(conversationHistory)
      ? conversationHistory.map((item) => ({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text: item.text || item.parts?.[0]?.text || '' }],
        }))
      : [];

    const contents = [...formattedHistory, { role: 'user', parts: [{ text: message }] }];

    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-3.7-flash',
      'gemini-flash-latest',
    ];

    let lastError = null;

    for (const model of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const apiResponse = await axios.post(
          endpoint,
          {
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: contents,
            generationConfig: {
              temperature: 0.2,
              topP: 0.8,
            },
          },
          { headers: { 'Content-Type': 'application/json' }, timeout: 12000 }
        );

        const reply = apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.json({ reply, modelUsed: model });
        }
      } catch (err) {
        lastError = err.response?.data || err.message;
        const statusCode = err.response?.status;
        console.warn(`Model ${model} failed (${statusCode}):`, JSON.stringify(lastError));
      }
    }

    return res.status(500).json({
      error: 'AI Generation Failed',
      message: 'All Gemini candidate models returned an error.',
      rootCause: lastError,
    });
  } catch (error) {
    console.error('Unhandled Chat Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
});

module.exports = router;