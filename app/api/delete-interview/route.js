import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const interviewId = searchParams.get("id");

    if (!interviewId) {
      return new Response(JSON.stringify({ error: "Interview ID is required" }), { status: 400 });
    }

    await db.delete(MockInterview).where(eq(MockInterview.id, interviewId));

    return new Response(JSON.stringify({ success: true, message: "Interview deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return new Response(JSON.stringify({ error: "Failed to delete interview" }), { status: 500 });
  }
}
