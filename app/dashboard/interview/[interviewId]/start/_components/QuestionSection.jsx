// import { Lightbulb, Volume2 } from "lucide-react";
// import React from "react";

// function QuestionSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) {
//   const questions = mockInterviewQuestions || [];
//   const textToSpeech = (text) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//     }else{
//       alert("Text-to-speech is not supported in this browser.");
//     }
//   };

//   return (
//     <div className="p-4 border rounded-xl max-w-4xl mx-auto shadow-sm bg-white">
//       {questions.length > 0 ? (
//         <>
//           {/* Top question buttons - Grid with 4 per row on lg */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
//             {questions.map((q, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveQuestionIndex(index)}
//                 className={`px-3 py-2 rounded-full border text-sm transition-all duration-200 ${
//                   activeQuestionIndex === index
//                     ? "bg-blue-500 text-white border-blue-500"
//                     : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//               >
//                 Q. {index + 1}
//               </button>
//             ))}
//           </div>

//           {/* Show only active question */}
//           <div className="my-4">
//             <h2 className="text-gray-800 text-base md:text-lg leading-relaxed">
//               {questions[activeQuestionIndex]?.question}
//             </h2>
//             <Volume2 className="w-5 h-5 text-gray-500 mt-2 cursor-pointer" onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}/>
//           </div>

//           {/* Note Section */}
//           <div className="border rounded-lg p-4 bg-blue-50 mt-15">
//             <h2 className="flex gap-2 items-center text-blue-600 mb-1 text-sm md:text-base">
//               <Lightbulb className="w-4 h-4" />
//               <strong>Note:</strong>
//             </h2>
//             <p className="text-gray-700 text-sm md:text-base leading-relaxed">
//               Click on <strong>Record Answer</strong> when you want to answer the
//               question, Click on <strong> Next Question</strong> button only when you see <i>Answer Saved Successfully</i>. At the end of interview we will give you the feedback
//               along with the correct answer for each question and your answer to
//               compare it.
//             </p>
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default QuestionSection;


import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex }) {
  const questions = mockInterviewQuestions || [];
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }else{
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Interview Questions
        <span className="text-sm font-normal text-gray-500 ml-auto">
          {activeQuestionIndex + 1}/{questions.length}
        </span>
      </h2>
      
      {questions.length > 0 ? (
        <>
          {/* Question navigation */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Select a question:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {questions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setActiveQuestionIndex(index)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                    activeQuestionIndex === index
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active question */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Question:</h3>
              <button 
                onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
                className="p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                title="Listen to question"
              >
                <Volume2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {questions[activeQuestionIndex]?.question}
            </p>
          </div>

          {/* Note Section */}
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <h2 className="flex gap-2 items-center text-amber-700 mb-2 text-sm font-medium">
              <Lightbulb className="w-4 h-4" />
              Important Note
            </h2>
            <p className="text-amber-600 text-sm leading-relaxed">
              Click on <strong className="font-semibold">Record Answer</strong> when you want to answer the
              question. Click on <strong className="font-semibold">Next Question</strong> only when you see <i>Answer Saved Successfully</i>. 
              At the end of the interview, you'll receive detailed feedback comparing your answers with model responses.
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading questions...</p>
      )}
    </div>
  );
}

export default QuestionSection;