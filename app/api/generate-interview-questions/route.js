
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// --- Gemini Setup ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
    You are a TECHNICAL interviewer.
    Generate exactly 5 TECHNICAL questions with precise answers.
    Each question must directly relate to the provided role, tech stack, and experience.
    Do NOT include HR or behavioral questions.
    Return ONLY valid JSON in this structure:
    [
      {
        "question": "string",
        "answer": "string"
      }
    ]
  `,
});

// --- POST: Generate and Save Interview Questions ---
export async function POST(req) {
    try {
        const body = await req.json();
        const { jobPosition, jobDescription, yearsOfExperience, createdBy } = body || {};

        if (!jobPosition || !jobDescription || !yearsOfExperience) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: jobPosition, jobDescription, yearsOfExperience" },
                { status: 400 }
            );
        }

        console.log("📥 Incoming payload:", { jobPosition, jobDescription, yearsOfExperience, createdBy });

        // Call Gemini API
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Role: ${jobPosition}\nStack: ${jobDescription}\nExperience: ${yearsOfExperience} years`,
                        },
                    ],
                },
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
            },
        });

        const text = result?.response?.text?.() || "";
        console.log("🤖 Gemini raw response:", text);

        // Parse Gemini response
        let questions;
        try {
            questions = JSON.parse(text);
            if (!Array.isArray(questions)) throw new Error("Invalid format: Expected an array of questions");
        } catch (err) {
            console.error("❌ Failed to parse Gemini output:", text);
            return NextResponse.json({ success: false, error: "Gemini did not return valid JSON" }, { status: 500 });
        }

        // Save to DB
        const mockId = uuidv4();
        const mockJsonResp = JSON.stringify(questions, null, 2);

        const resp = await db
            .insert(MockInterview)
            .values({
                mockId,
                jsonMockResp: mockJsonResp,
                jobPosition,
                jobDesc: jobDescription,
                jobExperience: yearsOfExperience,
                createdBy: createdBy || "anonymous",
                createdAt: moment().format("YYYY-MM-DD"),
            })
            .returning({ mockId: MockInterview.mockId });

        console.log("✅ Inserted into DB:", resp);

        return NextResponse.json({ success: true, questions, insertedId: resp[0]?.mockId }, { status: 200 });
    } catch (err) {
        console.error("🔥 API Error:", err.message, err.stack);
        return NextResponse.json({ success: false, error: err.message || "Unknown error in API" }, { status: 500 });
    }
}

// --- GET: Fetch Interview by ID ---
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing interview ID" }, { status: 400 });
        }

        console.log("🔍 Fetching interview with ID:", id);

        // Fetch from DB
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, id)).limit(1);

        if (!result || result.length === 0) {
            console.warn("⚠️ Interview not found:", id);
            return NextResponse.json({ success: false, error: "Interview not found" }, { status: 404 });
        }

        // Parse JSON questions
        let questions = [];
        try {
            questions = JSON.parse(result[0].jsonMockResp || "[]");
        } catch (e) {
            console.error("⚠️ Failed to parse stored JSON:", e.message);
        }

        return NextResponse.json(
            {
                success: true,
                interview: {
                    ...result[0],
                    questions,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("🔥 GET Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
