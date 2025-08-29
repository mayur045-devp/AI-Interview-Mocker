"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Star, Users, Clock, Shield, Award } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "$0",
      description: "Get started with basic features",
      features: [
        "5 interview questions per month",
        "Basic AI feedback",
        "Limited question categories",
        "Standard response analysis"
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline"
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$19",
      period: "/month",
      description: "Perfect for serious job seekers",
      features: [
        "Unlimited interview questions",
        "Advanced AI feedback with ratings",
        "All question categories",
        "Detailed performance analytics",
        "Priority support",
        "Export interview reports"
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro plan",
        "Multiple user accounts",
        "Custom question sets",
        "Company branding",
        "Dedicated account manager",
        "API access",
        "SSO integration"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Unlimited Practice",
      description: "Practice as much as you want with no restrictions"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Advanced Feedback",
      description: "Get detailed ratings and improvement suggestions"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "All Categories",
      description: "Access questions for all industries and experience levels"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Save Time",
      description: "Practice efficiently with tailored question sets"
    },
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      title: "Priority Support",
      description: "Get help quickly when you need it"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Data Security",
      description: "Your interview data is always protected"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-5">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Upgrade Your Interview Skills
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Unlock advanced features to accelerate your interview preparation and land your dream job.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-all hover:scale-105 ${
              plan.popular 
                ? "border-2 border-orange-500 shadow-xl" 
                : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.buttonVariant} 
                className={`w-full ${
                  plan.popular ? "bg-orange-500 hover:bg-orange-600" : ""
                }`}
                disabled={plan.id === "free"}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    /* Testimonials */
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-orange-600">MZ</span>
                </div>
                <div>
                <h4 className="font-semibold">Mark Zuckerberg</h4>
                <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The Pro plan completely transformed my interview preparation. I landed offers from three FAANG companies!"
              </p>
            </CardContent>
            </Card>
            <Card className="bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">MC</span>
                </div>
                <div>
                <h4 className="font-semibold">Mayur Chaudhari</h4>
                <p className="text-gray-600 text-sm">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The detailed feedback helped me identify my weak areas. I improved my interview performance by 200%."
              </p>
            </CardContent>
            </Card>
          </div>
        </div>

         <div>
         <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Go to Dashboard and start your first interview now!🎉
          </h2>
          <div className="flex justify-center mb-10">
            <Link href="/dashboard">
            <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Go to Interview
            </button>
            </Link>
          </div>
         </div>

        {/* FAQ Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes, you can cancel your subscription at any time without any cancellation fees.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">We offer a 7-day free trial for the Pro plan so you can experience all features risk-free.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I upgrade from Free to Pro?</h3>
            <p className="text-gray-600">Simply click the upgrade button, choose your plan, and enter your payment details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}