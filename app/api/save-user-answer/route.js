// app/api/save-user-answer/route.js
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswerDB } from "@/utils/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      interviewId,
      userEmail,
      question,
      userAns,
      correctAns,
      feedback,
      rating,
      createdAt,
    } = body;

    // Insert into DB
    await db.insert(UserAnswerDB).values({
      userId,
      interviewId,
      userEmail,
      question,
      userAns,
      correctAns,
      feedback,
      rating,
      createdAt,
    });

    return NextResponse.json({ success: true, message: "Answer saved!" });
  } catch (error) {
    console.error("❌ Error saving user answer:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
