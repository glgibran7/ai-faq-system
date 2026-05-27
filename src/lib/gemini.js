import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAnswer(question) {
  try {
    const prompt = `
Kamu adalah customer support profesional.

ATURAN:
- Jawaban maksimal 3 paragraf
- Bahasa Indonesia
- Ramah dan formal
- Jangan terlalu panjang
- Jika tidak tahu, sarankan hubungi admin

Pertanyaan pelanggan:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("GEMINI ERROR:", error);

    return `
Halo,

Terima kasih atas pertanyaan Anda.

Pertanyaan Anda sedang ditinjau oleh admin kami dan akan segera dijawab.

Terima kasih.
    `;
  }
}
