import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Use Gemini-1.5 model (or another variant you prefer)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content
        const result = await model.generateContent(prompt);

        // Extract plain text response
        const text = result.response.text();

        // Try parsing into JSON
        let feedbackObj;
        try {
            feedbackObj = JSON.parse(text);
        } catch (e) {
            feedbackObj = { feedback: text }; // fallback if not valid JSON
        }

        return NextResponse.json({ feedback: feedbackObj });
    } catch (error) {
        console.error("❌ Error in /api/generate-feedback:", error);
        return NextResponse.json(
            { error: "Failed to generate feedback" },
            { status: 500 }
        );
    }
}
