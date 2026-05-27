import { generateAnswer } from "@/lib/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const answer = await generateAnswer(body.question);

    return Response.json({
      success: true,
      answer,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
