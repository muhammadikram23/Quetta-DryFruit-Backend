const express = require('express');
const axios = require('axios');
const router = express.Router();

const STORE_SYSTEM_INSTRUCTION = `
You are "Quetta Dry Fruits AI Assistant", a friendly, helpful sales expert for an online dry fruit store based in Quetta, Pakistan.

Store Knowledge & Policies:
- Store Name: Quetta Dry Fruits
- Sourcing: Sourced directly from Suraj Ganj Bazaar & Kandahari Bazaar in Quetta.
- Shipping Rate: Flat PKR 200 delivery fee across Quetta with same-day order processing.
- Available Products & Pricing:
  1. Premium Chilghoza (Pine Nuts): PKR 8,500 / kg
  2. Quetta Kaghzi Badam (Soft-Shell Almonds): PKR 2,200 / kg
  3. Afghani White Anjeer (Dried Figs): PKR 2,600 / kg
  4. Sundarkhani Golden Kishmish: PKR 1,800 / kg

Guidelines:
- Answer questions politely in English or Urdu.
- Keep responses concise, clear, and focused on helping customers.
`;

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

    const availableModels = response.data?.models?.map(m => m.name.replace('models/', '')) || [];

    return res.json({
      status: 'success',
      totalModels: availableModels.length,
      models: availableModels
    });
  } catch (error) {
    const errData = error.response?.data || error.message;
    console.error('Failed to fetch models:', errData);
    return res.status(error.response?.status || 500).json({
      error: 'Failed to retrieve models for this API key.',
      details: errData
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
        message: 'GEMINI_API_KEY is not set on Vercel environment variables.'
      });
    }

    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Validation Error', message: 'Message string is required.' });
    }

    const formattedHistory = Array.isArray(conversationHistory)
      ? conversationHistory.map((item) => ({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text: item.text || item.parts?.[0]?.text || '' }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    // ✅ Verified active models directly from your API response
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-3.7-flash',
      'gemini-flash-latest'
    ];

    let lastError = null;

    for (const model of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const apiResponse = await axios.post(
          endpoint,
          {
            systemInstruction: { parts: [{ text: STORE_SYSTEM_INSTRUCTION }] },
            contents: contents,
            generationConfig: { temperature: 0.7 }
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
      rootCause: lastError
    });

  } catch (error) {
    console.error('Unhandled Chat Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
});

module.exports = router;