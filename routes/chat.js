const express = require('express');
const { GoogleGenAI } = require('@google/genai');

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

router.post('/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing.');
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid user message required.' });
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

    // 🟢 Using gemini-1.5-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents,
      config: {
        systemInstruction: STORE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response.";
    return res.json({ reply });

  } catch (error) {
    console.error('Gemini API Error details:', error);
    return res.status(500).json({ error: 'Failed to process request with AI.', details: error.message });
  }
});

module.exports = router;