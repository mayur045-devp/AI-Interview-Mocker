import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Job Position: Full Stack Developer, Job Description: React, MySql, Node.js, Years of Experience: 6, Depends on this information please give me 5 interview questions with Answered in JSON format, ask only technical questions, Give questions and answer as field in Json";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();