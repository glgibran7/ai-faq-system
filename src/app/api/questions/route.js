import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { generateAnswer } from "@/lib/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const aiAnswer = await generateAnswer(body.question);

    await addDoc(collection(db, "questions"), {
      ...body,
      answer: aiAnswer,
      status: "pending",
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
