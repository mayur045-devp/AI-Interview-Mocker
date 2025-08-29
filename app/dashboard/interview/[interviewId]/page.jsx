
"use client";

import { Lightbulb, Trophy, Clock, User, Briefcase, Star, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InterviewPage({ params }) {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Interview Details
  useEffect(() => {
    async function fetchInterview() {
      try {
        const { interviewId } = params;
        console.log("Interview ID :", interviewId);

        const res = await fetch(`/api/generate-interview-questions?id=${interviewId}`);
        const data = await res.json();

        if (data.success) {
          console.log("Full Interview Object:", data.interview);
          setInterview(data.interview);
        } else {
          console.error("Error fetching interview:", data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchInterview();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full mx-4 border border-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparing Your Interview</h2>
          <p className="text-gray-500">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full mx-4 border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
            <span className="text-2xl text-red-500">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Interview Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the interview you're looking for.</p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-5">
            <Trophy className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Interview Preparation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get ready for your <span className="font-semibold text-blue-600">{interview.jobPosition}</span> interview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Job Details Card */}
          <Card className="rounded-xl shadow-sm border-gray-100 overflow-hidden lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border-b rounded-t-xl mt-[-25px] pt-5 border-gray-100">
              <CardTitle className="flex items-center gap-3 text-blue-700">
                <Briefcase className="w-5 h-5" />
                Position Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg">
                <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Role</h3>
                  <p className="text-gray-800 font-medium">{interview.jobPosition}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Experience Required</h3>
                  <p className="text-gray-800 font-medium">{interview.jobExperience} years</p>
                </div>
              </div>
              
              {interview.jobDesc && (
                <div className="p-4 bg-gray-50/80 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Job Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {interview.jobDesc}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="rounded-xl shadow-sm border-amber-100 bg-amber-50/30">
            <CardHeader className="pb-3 border-b border-amber-200/50">
              <CardTitle className="flex items-center gap-3 text-amber-700">
                <Lightbulb className="w-5 h-5" />
                Preparation Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-sm font-bold">1</span>
                </div>
                <p className="text-amber-700 text-sm">
                  Review the job description and prepare examples of your relevant experience.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-sm font-bold">2</span>
                </div>
                <p className="text-amber-700 text-sm">
                  Practice answering common interview questions for this role.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-sm font-bold">3</span>
                </div>
                <p className="text-amber-700 text-sm">
                  Have questions ready to ask about the role and company.
                </p>
              </div>
              
              <div className="bg-amber-100/50 p-3 rounded-lg border border-amber-200/30 mt-3">
                <p className="text-amber-800 text-xs font-medium">
                  💡 You'll receive detailed feedback after completing the interview
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Interview Process
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Here's what to expect during your practice interview
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Answer Questions</h3>
              <p className="text-gray-600 text-sm">Respond to interview questions tailored for this role</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Our system evaluates your responses in real-time</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Feedback</h3>
              <p className="text-gray-600 text-sm">Receive detailed feedback on your performance</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">Ready when you are</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="group relative px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all duration-300">
              Begin Interview
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <p className="text-gray-500 text-sm mt-4">
            This interview will take approximately 15-20 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
}