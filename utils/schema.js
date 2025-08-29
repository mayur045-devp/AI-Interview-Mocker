
// utils/schema.js
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
    jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
    jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
    createdBy: varchar("createdBy", { length: 255 }).notNull(),
    createdAt: varchar("createdAt", { length: 255 }).default("now()"),
    mockId: varchar("mockId", { length: 255 }).notNull(),
});


export const UserAnswerDB = pgTable("userAnswer", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    interviewId: varchar("interviewId", { length: 255 }).notNull(),
    userEmail: varchar("userEmail", { length: 255 }).notNull(),
    question: varchar("question", { length: 255 }).notNull(),
    userAns: text("userAns").notNull(),
    correctAns: text("correctAns").notNull(),
    feedback: text("feedback").notNull(),
    rating: varchar("rating", { length: 255 }).notNull(),
    createdAt: varchar("createdAt", { length: 255 }).default("now()"),
});