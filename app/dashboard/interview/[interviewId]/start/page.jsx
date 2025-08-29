
// "use client";
// import React, { useState, useEffect } from "react";
// import QuestionSection from "./_components/QuestionSection";
// import RecordAnswerSection from "./_components/RecordAnswerSection";
// import { useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";



// function StartInterview({ params }) {
//   const [interviewId, setInterviewId] = useState(null);
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const { user } = useUser();

//   // ✅ unwrap params (since it's a Promise)
//   useEffect(() => {
//     async function unwrapParams() {
//       const p = await params;
//       setInterviewId(p.interviewId);
//     }
//     unwrapParams();
//   }, [params]);

//   useEffect(() => {
//     if (!interviewId) return;
//     console.log("Starting interview for ID:", interviewId);
//     fetchInterview(interviewId);
//   }, [interviewId]);

//   const fetchInterview = async (id) => {
//     try {
//       const res = await fetch(`/api/generate-interview-questions?id=${id}`);
//       const data = await res.json();
//       console.log("Fetched interview data:", data);

//       let jsonMockResp = [];
//       if (data?.interview?.jsonMockResp) {
//         try {
//           jsonMockResp =
//             typeof data.interview.jsonMockResp === "string"
//               ? JSON.parse(data.interview.jsonMockResp)
//               : data.interview.jsonMockResp;
//         } catch (e) {
//           console.error("❌ Failed to parse mock interview questions:", e);
//         }
//       }
//       console.log("Parsed mock interview questions:", jsonMockResp);
//       setMockInterviewQuestions(jsonMockResp || []);
//       setInterviewData(data.interview || null);
//     } catch (err) {
//       console.error("❌ Error fetching interview:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center p-6">Loading questions...</p>;
//   }

//   if (!interviewData || mockInterviewQuestions.length === 0) {
//     return (
//       <p className="text-center p-6 text-red-500">
//         No questions found for this interview.
//       </p>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Questions */}
//         <QuestionSection
//           mockInterviewQuestions={mockInterviewQuestions}
//           activeQuestionIndex={activeQuestionIndex}
//         />

//         {/* Video/Audio Recording */}
//         <RecordAnswerSection
//           mockInterviewQuestions={mockInterviewQuestions}
//           activeQuestionIndex={activeQuestionIndex}
//           interviewId={interviewId}
//           userId={user.id}
//           userEmail={user.emailAddresses[0].emailAddress}
//         />
//       </div>
//       <div className="flex justify-end items-center gap-4 mt-10">
//         {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} className="bg-blue-600 cursor-pointer hover:bg-blue-700">Previous Question</Button>}
//         {activeQuestionIndex < mockInterviewQuestions.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} className="bg-blue-600 cursor-pointer hover:bg-blue-700">Next Question</Button>}
//         {/* {activeQuestionIndex === mockInterviewQuestions.length - 1 && 
//         <Link href={`/dashboard/interview/${interviewId}/feedback`}>
//           <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700">End Interview</Button>
//         </Link>} */}
//         {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
//           <Link href={`/dashboard/interview/${interviewId}/feedback`}>
//             <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700">End Interview</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StartInterview;

// "use client";
// import React, { useState, useEffect } from "react";
// import QuestionSection from "./_components/QuestionSection";
// import RecordAnswerSection from "./_components/RecordAnswerSection";
// import { useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, Loader2, Crown, Clock, Trophy } from "lucide-react";

// function StartInterview({ params }) {
//   const [interviewId, setInterviewId] = useState(null);
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const { user } = useUser();

//   // ✅ unwrap params (since it's a Promise)
//   useEffect(() => {
//     async function unwrapParams() {
//       const p = await params;
//       setInterviewId(p.interviewId);
//     }
//     unwrapParams();
//   }, [params]);

//   useEffect(() => {
//     if (!interviewId) return;
//     console.log("Starting interview for ID:", interviewId);
//     fetchInterview(interviewId);
//   }, [interviewId]);

//   const fetchInterview = async (id) => {
//     try {
//       const res = await fetch(`/api/generate-interview-questions?id=${id}`);
//       const data = await res.json();
//       console.log("Fetched interview data:", data);

//       let jsonMockResp = [];
//       if (data?.interview?.jsonMockResp) {
//         try {
//           jsonMockResp =
//             typeof data.interview.jsonMockResp === "string"
//               ? JSON.parse(data.interview.jsonMockResp)
//               : data.interview.jsonMockResp;
//         } catch (e) {
//           console.error("❌ Failed to parse mock interview questions:", e);
//         }
//       }
//       console.log("Parsed mock interview questions:", jsonMockResp);
//       setMockInterviewQuestions(jsonMockResp || []);
//       setInterviewData(data.interview || null);
//     } catch (err) {
//       console.error("❌ Error fetching interview:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
//           <Loader2 className="animate-spin text-indigo-600 w-10 h-10 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparing Your Interview</h2>
//           <p className="text-gray-500">Loading questions...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!interviewData || mockInterviewQuestions.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-2xl">❌</span>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">No Questions Found</h2>
//           <p className="text-gray-500 mb-6">We couldn't find any questions for this interview.</p>
//           <Link href="/dashboard">
//             <Button className="bg-indigo-600 hover:bg-indigo-700">Return to Dashboard</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                 <Trophy className="text-indigo-600 w-6 h-6" />
//                 {interviewData.jobPosition} Interview
//               </h1>
//               <p className="text-gray-600 mt-1 flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {mockInterviewQuestions.length} questions
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
//                 Question {activeQuestionIndex + 1} of {mockInterviewQuestions.length}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Questions */}
//           <div className="order-2 lg:order-1">
//             <QuestionSection
//               mockInterviewQuestions={mockInterviewQuestions}
//               activeQuestionIndex={activeQuestionIndex}
//             />
//           </div>

//           {/* Video/Audio Recording */}
//           <div className="order-1 lg:order-2">
//             <RecordAnswerSection
//               mockInterviewQuestions={mockInterviewQuestions}
//               activeQuestionIndex={activeQuestionIndex}
//               interviewId={interviewId}
//               userId={user.id}
//               userEmail={user.emailAddresses[0].emailAddress}
//             />
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md">
//           <div className="text-sm text-gray-500">
//             You can navigate between questions during your interview
//           </div>
//           <div className="flex items-center gap-3">
//             {activeQuestionIndex > 0 && (
//               <Button 
//                 onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} 
//                 className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
//               >
//                 <ChevronLeft className="w-4 h-4" /> Previous
//               </Button>
//             )}
            
//             {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
//               <Button 
//                 onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} 
//                 className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
//               >
//                 Next <ChevronRight className="w-4 h-4" />
//               </Button>
//             )}
            
//             {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
//               <Link href={`/dashboard/interview/${interviewId}/feedback`}>
//                 <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
//                   Finish Interview <Crown className="w-4 h-4" />
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StartInterview;

"use client";
import React, { useState, useEffect, useRef } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, Crown, Clock, Trophy, Camera, CameraOff } from "lucide-react";

function StartInterview({ params }) {
  const [interviewId, setInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const streamRef = useRef(null);
  const { user } = useUser();

  // ✅ unwrap params (since it's a Promise)
  useEffect(() => {
    async function unwrapParams() {
      const p = await params;
      setInterviewId(p.interviewId);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!interviewId) return;
    console.log("Starting interview for ID:", interviewId);
    fetchInterview(interviewId);
  }, [interviewId]);

  const fetchInterview = async (id) => {
    try {
      const res = await fetch(`/api/generate-interview-questions?id=${id}`);
      const data = await res.json();
      console.log("Fetched interview data:", data);

      let jsonMockResp = [];
      if (data?.interview?.jsonMockResp) {
        try {
          jsonMockResp =
            typeof data.interview.jsonMockResp === "string"
              ? JSON.parse(data.interview.jsonMockResp)
              : data.interview.jsonMockResp;
        } catch (e) {
          console.error("❌ Failed to parse mock interview questions:", e);
        }
      }
      console.log("Parsed mock interview questions:", jsonMockResp);
      setMockInterviewQuestions(jsonMockResp || []);
      setInterviewData(data.interview || null);
    } catch (err) {
      console.error("❌ Error fetching interview:", err);
    } finally {
      setLoading(false);
    }
  };

  const enableCamera = async () => {
    setCameraLoading(true);
    setCameraError("");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      setCameraEnabled(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please check permissions.");
    } finally {
      setCameraLoading(false);
    }
  };

  const disableCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
    }
    
    setCameraEnabled(false);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <Loader2 className="animate-spin text-indigo-600 w-10 h-10 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparing Your Interview</h2>
          <p className="text-gray-500">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!interviewData || mockInterviewQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Questions Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find any questions for this interview.</p>
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Trophy className="text-indigo-600 w-6 h-6" />
                {interviewData.jobPosition} Interview
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {mockInterviewQuestions.length} questions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Question {activeQuestionIndex + 1} of {mockInterviewQuestions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Questions */}
          <div className="order-2 lg:order-1">
            <QuestionSection
              mockInterviewQuestions={mockInterviewQuestions}
              activeQuestionIndex={activeQuestionIndex}
              setActiveQuestionIndex={setActiveQuestionIndex}
            />
          </div>

          {/* Video/Audio Recording */}
          <div className="order-1 lg:order-2">
            <RecordAnswerSection
              mockInterviewQuestions={mockInterviewQuestions}
              activeQuestionIndex={activeQuestionIndex}
              interviewId={interviewId}
              userId={user.id}
              userEmail={user.emailAddresses[0].emailAddress}
              cameraEnabled={cameraEnabled}
              enableCamera={enableCamera}
              disableCamera={disableCamera}
              cameraLoading={cameraLoading}
              cameraError={cameraError}
              streamRef={streamRef}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md">
          <div className="text-sm text-gray-500">
            You can navigate between questions during your interview
          </div>
          <div className="flex items-center gap-3">
            {activeQuestionIndex > 0 && (
              <Button 
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} 
                className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
            )}
            
            {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
              <Button 
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} 
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            
            {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
              <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  Finish Interview <Crown className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;