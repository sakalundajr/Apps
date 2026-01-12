
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMarketQuery = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a professional financial analyst specializing in Forex, Crypto, and Betting, analyze the following user query: "${query}". Provide a concise, professional opinion, potential support/resistance levels if applicable, and a sentiment score from 1-10.`,
      config: {
        systemInstruction: "You are the Multi Signal Hub AI Assistant. Your goal is to provide expert financial insights while reminding users that trading involves risk.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "I'm currently recalibrating my market models. Please try again in a moment.";
  }
};

export const analyzePostImage = async (base64Image: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: `Analyze this chart or financial image for the Multi Signal Hub community. ${prompt}` }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Image Analysis Error:", error);
    return "Unable to process the image at this time.";
  }
};
