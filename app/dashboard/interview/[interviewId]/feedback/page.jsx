"use client";
import React,{useEffect, useState} from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";  

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const feedback = await GetFeedback();
      setFeedbackList(feedback);
    };
    fetchData();
  }, []);

  const GetFeedback = async () => {
    const result = await fetch(`/api/get-feedback?interviewId=${params.interviewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 py-10 sm:px-8 lg:px-20">
      <h2 className="text-2xl font-bold text-green-500">🎉 Congratulations!</h2>
      <p className="text-gray-700 font-bold mt-2">
        You have completed the interview. Here is your feedback:
      </p>

      <h2 className="text-md text-blue-500 mt-4">
        Your overall interview rating :{" "}
        {feedbackList.length > 0
          ? (
              feedbackList.reduce(
                (acc, item) => acc + Number(item.rating),
                0
              ) / feedbackList.length
            ).toFixed(1)
          : 0}
        /10
      </h2>

      <h2 className="text-sm text-gray-500 mt-6">
        Detailed feedback with your answers and correct ones:
      </h2>

      <div className="mt-6 space-y-4">
        {feedbackList.map((item, index) => (
          <Collapsible
            key={index}
            className="border rounded-lg p-4 bg-white shadow-md hover:bg-gray-50"
          >
            <CollapsibleTrigger className="cursor-pointer text-gray-900 font-semibold ">
              Question {index + 1}: {item.question}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-2">
              {item.userAns ? (
                <>
                  <p className=" border rounded-lg p-2 bg-blue-100">
                    <span className="font-bold">Your Answer:</span>{" "}
                    {item.userAns}
                  </p>
                  <p className=" bg-orange-100 border rounded-lg p-2">
                    <span className="font-bold">Feedback:</span>{" "}
                    {item.feedback}
                  </p>
                  <p className=" bg-red-100 border rounded-lg p-2">
                    <span className="font-semibold">Rating:</span>{" "}
                    {item.rating}/10
                  </p>
                </>
              ) : (
                
                <p className="text-red-500 font-medium bg-yellow-200 border rounded-lg p-2">
                  ⚠️ You haven’t attempted this one.
                </p>
                
              )}
              <p className=" bg-green-100 border rounded-lg p-2">
                <span className="font-bold">Correct Answer:</span>{" "}
                {item.correctAns}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      <Button onClick={() => router.push(`/dashboard`)} className="mt-6 bg-blue-500 cursor-pointer hover:bg-blue-600">Go Home</Button>
    </div>
  );
}

export default Feedback;
