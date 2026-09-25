import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini SDK securely on the backend (API key stays hidden from browser)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate', async (req, res) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' });
    }

    const prompt = `You are an expert travel planner. Return ONLY valid JSON matching this exact schema, with no markdown formatting like \`\`\`json, and no extra prose:
{
  "destination": "string",
  "overview": "string",
  "totalEstimatedBudget": "string",
  "days": [
    {
      "dayNumber": number,
      "title": "string",
      "stops": [
        {
          "id": "string",
          "time": "string",
          "title": "string",
          "description": "string",
          "category": "string",
          "estimatedCost": "string"
        }
      ]
    }
  ]
}

Plan a trip based on this request: ${userInput}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

  const textResponse = response.text ?? '';
    
    // Clean up markdown block if model accidentally includes it
    const cleanedJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(cleanedJson);
    res.json(parsedData);

  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate trip plan from AI.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));