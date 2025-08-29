// app/api/get-feedback/route.js
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswerDB, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const interviewId = searchParams.get("interviewId");

        if (!interviewId) {
            return NextResponse.json({ success: false, error: "Interview ID missing" }, { status: 400 });
        }

        // 1. Get the interview with questions
        const mock = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId))
            .orderBy(MockInterview.id);

        if (!mock.length) {
            return NextResponse.json({ success: false, error: "No interview found" }, { status: 404 });
        }

        const questions = JSON.parse(mock[0].jsonMockResp); // this holds your QnA

        // 2. Get attempted answers
        const answers = await db
            .select()
            .from(UserAnswerDB)
            .where(eq(UserAnswerDB.interviewId, interviewId))
            .orderBy(UserAnswerDB.id);

        // 3. Merge questions + answers
        const feedbackList = questions.map((q, idx) => {
            const userAnswer = answers.find(a => a.correctAns === q.answer); // match by answer or you can store question too
            if (userAnswer) {
                return {
                    question: q.question,
                    userAns: userAnswer.userAns,
                    correctAns: q.answer,
                    feedback: userAnswer.feedback,
                    rating: userAnswer.rating,
                };
            } else {
                return {
                    question: q.question,
                    userAns: null,
                    correctAns: q.answer,
                    feedback: "You haven’t attempted this one.",
                    rating: "0",
                };
            }
        });

        return NextResponse.json(feedbackList);
    } catch (error) {
        console.error("❌ Error fetching feedback:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
