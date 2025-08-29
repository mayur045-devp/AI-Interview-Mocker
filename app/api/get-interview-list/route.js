
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";

// GET /api/get-interview-list?userEmail=abc@gmail.com
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("userEmail");

        if (!userEmail) {
            return NextResponse.json(
                { error: "Missing userEmail" },
                { status: 400 }
            );
        }

        const interviews = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, userEmail))
            .orderBy(desc(MockInterview.id));

        return NextResponse.json(interviews);
    } catch (err) {
        console.error("❌ Error fetching interviews:", err);
        return NextResponse.json(
            { error: "Failed to fetch interviews" },
            { status: 500 }
        );
    }
}
