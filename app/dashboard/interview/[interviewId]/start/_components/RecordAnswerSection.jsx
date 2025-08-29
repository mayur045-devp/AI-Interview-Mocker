// import { Button } from '@/components/ui/button'
// import { ChatSession } from '@google/generative-ai';
// import { Mic, Webcam } from 'lucide-react'
// import moment from 'moment';
// import React, { useState, useEffect } from 'react'
// import useSpeechToText from 'react-hook-speech-to-text';
// import { toast } from 'sonner';

// function RecordAnswerSection({ mockInterviewQuestions, activeQuestionIndex , interviewId, userId, userEmail }) {
//   const [userAnswer, setUserAnswer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const {
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });

//   useEffect(() => {
//     results.map((result) => {
//       setUserAnswer(prev => prev + result?.transcript);
//     });
//   }, [results]);

//   const questions = mockInterviewQuestions || []; 
//   const SaveUserAnswer=async()=>{
//     if(isRecording){
//       setLoading(true);
//       stopSpeechToText();
//       if(userAnswer?.length < 5){
//         setLoading(false);
//         toast('Cannot save answer, maybe your answer is too short, please provide a more detailed response.');
//         return;
//       }

//       // const feedbackPrompt = "\n Question : "+questions[activeQuestionIndex]?.question + "\n User's Answer : " + userAnswer + "\n Depends on the question and the user's answer for given interview question,please give us rating for the answer and provide feedback on the user's answer, in just 3-5 lines to improve it in JSON format with rating(1-10) field and feedback field.";
//       const feedbackPrompt = `Question: ${questions[activeQuestionIndex]?.question} , User's Answer: ${userAnswer} Depends on the question and the user's answer, please give a rating (1-10) and 3-5 lines of feedback and area of improvement in JSON format like:
//         {
//             "rating": 7,
//             "feedback": "Your answer is good but could be more detailed..."
//         }`;

//       // console.log("Feedback Prompt:", feedbackPrompt);


//       // New Way to Generate Feedbaack
//       const result = await fetch("/api/generate-feedback", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: feedbackPrompt }),
//       });

//       const data = await result.json();
//       // console.log("🔍 Raw Feedback Response:", data);

//       // Access rating + feedback
//       if (data.feedback) {
       
//         const feedbackResp = (data.feedback.feedback).replace("```json", "").replace("```", "");
//         console.log("📝 Feedback:", feedbackResp);

//         const JsonFeedbackResp = JSON.parse(feedbackResp);
//         // console.log("📊 Parsed Feedback JSON:", JsonFeedbackResp);
      
//         // Save answer into DB
//         const resp = await fetch("/api/save-user-answer", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId,
//             interviewId,
//             userEmail,
//             question: questions[activeQuestionIndex]?.question,
//             userAns: userAnswer,
//             correctAns: questions[activeQuestionIndex]?.answer || "",
//             feedback: JsonFeedbackResp.feedback,
//             rating: JsonFeedbackResp.rating,
//             createdAt: moment().format("DD-MM-YYYY"),
//           }),
//         });
//         console.log("📌 Saving answer payload:", {
//           userId,
//           question: questions[activeQuestionIndex]?.question,
//           userAns : userAnswer,
//           correctAns: questions[activeQuestionIndex]?.answer || "",
//           feedback: JsonFeedbackResp.feedback,
//           rating: JsonFeedbackResp.rating,
//           userEmail,
//           createdAt: moment().format("DD-MM-YYYY"),
//           });

//         if (resp) {
//           toast("User answer saved successfully!");
//           setUserAnswer("");
//           setResults([]);
//         }
//       } else {
//         console.error("❌ Could not parse feedback JSON:", data.feedback);
//       }
//       setUserAnswer("");
//       setResults([]);
//       setLoading(false);


//     }else{
//       startSpeechToText();
//     }
//   }


//   return (
//     <div className='flex justify-center items-center flex-col'>
//         <div className='flex justify-center items-center flex-col  p-5 rounded-lg '>
//             {/* <Webcam className="w-full h-auto" /> */}
//             <Webcam    style={{ width: '100%', height:300,
//                 zIndex:10,
//                 // border: '2px solid red'
//             }} />
//         </div>

//         <Button disabled={loading} variant='outline' className={'  text-gray-600 hover:bg-primary-dark'} onClick={SaveUserAnswer}>
//             {isRecording ? <h2 className='flex gap-2 text-red-500'><Mic /> Stop Recording...</h2> : ' Record Answer'} 
//         </Button>

//        {/* <Button className={'mt-5 cursor-pointer bg-blue-600 text-white hover:bg-primary'} onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
//     </div>
//   )
// }

// export default RecordAnswerSection

import { Button } from '@/components/ui/button'
import { Mic, Webcam, Camera, CameraOff } from 'lucide-react'
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';

function RecordAnswerSection({ 
  mockInterviewQuestions, 
  activeQuestionIndex, 
  interviewId, 
  userId, 
  userEmail, 
  cameraEnabled, 
  enableCamera, 
  disableCamera, 
  cameraLoading, 
  cameraError,
  streamRef
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraEnabled, streamRef]);

  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prev => prev + result?.transcript);
    });
  }, [results]);

  const questions = mockInterviewQuestions || []; 

  const SaveUserAnswer = async () => {
    if (!cameraEnabled) {
      toast.error("Please enable your camera first");
      return;
    }

    if(isRecording){
      setLoading(true);
      stopSpeechToText();
      if(userAnswer?.length < 5){
        setLoading(false);
        toast.error('Cannot save answer. Your response seems too short. Please provide a more detailed answer.');
        return;
      }

      const feedbackPrompt = `Question: ${questions[activeQuestionIndex]?.question} , User's Answer: ${userAnswer} Depends on the question and the user's answer, please give a rating (1-10) and 3-5 lines of feedback and area of improvement in JSON format like:
        {
            "rating": 7,
            "feedback": "Your answer is good but could be more detailed..."
        }`;

      // Generate feedback
      const result = await fetch("/api/generate-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      });

      const data = await result.json();

      // Access rating + feedback
      if (data.feedback) {
        const feedbackResp = (data.feedback.feedback).replace("```json", "").replace("```", "");
        const JsonFeedbackResp = JSON.parse(feedbackResp);
      
        // Save answer into DB
        const resp = await fetch("/api/save-user-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            interviewId,
            userEmail,
            question: questions[activeQuestionIndex]?.question,
            userAns: userAnswer,
            correctAns: questions[activeQuestionIndex]?.answer || "",
            feedback: JsonFeedbackResp.feedback,
            rating: JsonFeedbackResp.rating,
            createdAt: moment().format("DD-MM-YYYY"),
          }),
        });

        if (resp.ok) {
          toast.success("Answer saved successfully!");
          setUserAnswer("");
          setResults([]);
        } else {
          toast.error("Failed to save answer");
        }
      } else {
        console.error("❌ Could not parse feedback JSON:", data.feedback);
        toast.error("Failed to generate feedback");
      }
      setLoading(false);
    } else {
      if (!cameraEnabled) {
        toast.error("Please enable camera first");
        return;
      }
      startSpeechToText();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Record Your Answer
      </h2>
      
      {/* Camera Preview */}
      <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center relative">
        {cameraEnabled ? (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400 p-6">
            <CameraOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Camera not enabled</p>
          </div>
        )}
        
        {/* Camera status indicator */}
        <div className={`absolute top-3 right-3 h-3 w-3 rounded-full ${cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      
      {/* Camera Controls */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {!cameraEnabled ? (
          <Button
            onClick={enableCamera}
            disabled={cameraLoading}
            className="flex items-center gap-2"
          >
            {cameraLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Camera className="w-4 h-4" />
            )}
            {cameraLoading ? "Enabling..." : "Enable Camera"}
          </Button>
        ) : (
          <Button
            onClick={disableCamera}
            variant="outline"
            className="flex items-center gap-2"
          >
            <CameraOff className="w-4 h-4" />
            Disable Camera
          </Button>
        )}
        
        <Button
          onClick={SaveUserAnswer}
          disabled={loading || !cameraEnabled}
          className={`flex items-center gap-2 ${
            isRecording ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          <Mic className="w-4 h-4" />
          {isRecording ? "Stop Recording" : "Record Answer"}
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
        </Button>
      </div>
      
      {cameraError && (
        <p className="text-sm text-red-500 mb-4">{cameraError}</p>
      )}
      
      {/* Transcription Preview */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Answer:</h3>
        {userAnswer ? (
          <p className="text-gray-600 text-sm">{userAnswer}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">
            {isRecording ? "Speaking..." : "Your transcribed answer will appear here"}
          </p>
        )}
      </div>
    </div>
  );
}

export default RecordAnswerSection;