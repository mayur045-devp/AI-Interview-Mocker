"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Target, BarChart3, Award, Clock, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Choose Your Interview",
      description: "Select from various job positions and experience levels to match your career goals."
    },
    {
      icon: <Play className="w-8 h-8 text-blue-600" />,
      title: "Start Practice Interview",
      description: "Answer tailored questions while our AI records and analyzes your responses."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Get AI Analysis",
      description: "Our advanced AI evaluates your answers, communication skills, and presentation."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Receive Detailed Feedback",
      description: "Get comprehensive feedback with ratings, improvement areas, and model answers."
    }
  ];

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Save Time",
      description: "Practice anytime without scheduling real interviews"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Safe Environment",
      description: "Make mistakes and learn in a pressure-free setting"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Realistic Experience",
      description: "Simulate actual interview scenarios and questions"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Master your interview skills with our AI-powered platform. Here's how you can prepare for success.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How accurate is the AI feedback?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our AI is trained on thousands of successful interviews and provides feedback comparable to human experts, focusing on content, delivery, and communication skills.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I practice multiple times?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Yes! You can practice as many times as you want. Each session generates different questions to ensure comprehensive preparation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is my data secure?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Absolutely. We don't store your video recordings. Only your answers and feedback are saved to track your progress.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What industries do you support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We cover a wide range of industries including tech, finance, marketing, healthcare, and more. New positions are added regularly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to Ace Your Next Interview?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Start practicing today and get the confidence you need to succeed in your dream job interview.
        </p>
        <Link href="/dashboard">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Start Practice Interview
          </button>
        </Link>
      </div>
    </div>
  );
}