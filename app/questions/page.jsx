"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, Target, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "technical", name: "Technical" },
    { id: "behavioral", name: "Behavioral" },
    { id: "leadership", name: "Leadership" },
    { id: "culture", name: "Culture Fit" }
  ];

  const questions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      category: "behavioral",
      difficulty: "Easy",
      frequency: "Very Common"
    },
    {
      id: 2,
      question: "What is your greatest strength and how does it apply to this role?",
      category: "behavioral",
      difficulty: "Medium",
      frequency: "Common"
    },
    {
      id: 3,
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      category: "technical",
      difficulty: "Hard",
      frequency: "Common"
    },
    {
      id: 4,
      question: "How do you handle conflict within your team?",
      category: "leadership",
      difficulty: "Medium",
      frequency: "Common"
    },
    {
      id: 5,
      question: "Explain the concept of responsive design.",
      category: "technical",
      difficulty: "Medium",
      frequency: "Very Common"
    },
    {
      id: 6,
      question: "Where do you see yourself in 5 years?",
      category: "behavioral",
      difficulty: "Easy",
      frequency: "Very Common"
    },
    {
      id: 7,
      question: "How do you stay updated with industry trends?",
      category: "culture",
      difficulty: "Easy",
      frequency: "Common"
    },
    {
      id: 8,
      question: "Describe your experience with agile methodology.",
      category: "technical",
      difficulty: "Medium",
      frequency: "Common"
    }
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Questions</h1>
        <p className="text-gray-600">
          Browse our extensive library of interview questions to prepare for your next interview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">150+</p>
                <p className="text-gray-600">Total Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-gray-600">Job Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">98%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="grid gap-4">
        {filteredQuestions.map((q) => (
          <Card key={q.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{q.question}</h3>
                  <div className="flex gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {q.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                      <Clock className="w-4 h-4" />
                      {q.frequency}
                    </span>
                  </div>
                </div>
                <Link href="/dashboard">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                    Go to Interview
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No questions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}