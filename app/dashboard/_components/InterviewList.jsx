

// "use client";

// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { Loader2, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function InterviewList() {
//   const { user } = useUser();
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           `/api/get-interview-list?userEmail=${user.primaryEmailAddress.emailAddress}`
//         );
//         const data = await res.json();
//         setInterviews(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("❌ Error fetching interview list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleDelete = async (id) => {
//     const confirmDelete = confirm("Are you sure you want to delete this interview?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/delete-interview?id=${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         // Update UI without page reload
//         setInterviews((prev) => prev.filter((interview) => interview.id !== id));
//       } else {
//         alert("Failed to delete interview");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="mt-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">
//         Previous Interviews
//       </h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-32">
//           <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
//         </div>
//       ) : interviews.length === 0 ? (
//         <p className="text-gray-500 italic">No interviews found yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {interviews.map((interview) => (
//             <div
//               key={interview.id}
//               className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex flex-col justify-between"
//             >
//               <div>
//                 <h3 className="text-lg font-bold text-blue-700">
//                   {interview.jobPosition}
//                 </h3>
//                 <p className="text-md text-gray-600 mt-1 font-semibold">
//                   {interview.jobExperience} Years of Experience
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Created at: {interview.createdAt}
//                 </p>
//               </div>

//               {/* <div className="mt-4 flex flex-col sm:flex-row gap-3">
//                 <Link href={`/dashboard/interview/${interview.mockId}/feedback`} className="w-full">
//                   <Button variant="outline" className="w-full">
//                     Feedback
//                   </Button>
//                 </Link>
//                 <Link href={`/dashboard/interview/${interview.mockId}`} className="w-full">
//                   <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
//                     Start Interview
//                   </Button>
//                 </Link>
//                 <Button
//                   variant="destructive"
//                   className="w-full flex items-center justify-center gap-2"
//                   onClick={() => handleDelete(interview.id)}
//                 >
//                   <Trash2 className="w-4 h-4" /> Delete
//                 </Button>
//               </div> */}
//              <div className="mt-4 flex flex-col sm:flex-row gap-3">
//   <div className="flex-1">
//     <Link href={`/dashboard/interview/${interview.mockId}/feedback`} className="block h-full">
//       <Button variant="outline" className="w-full h-full">
//         Feedback
//       </Button>
//     </Link>
//   </div>
//   <div className="flex-1">
//     <Link href={`/dashboard/interview/${interview.mockId}`} className="block h-full">
//       <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full h-full">
//         Start Interview
//       </Button>
//     </Link>
//   </div>
//   <div className="flex-1">
//     <Button
//       variant="destructive"
//       className="w-full h-full flex items-center justify-center gap-2"
//       onClick={() => handleDelete(interview.id)}
//     >
//       <Trash2 className="w-4 h-4" /> Delete
//     </Button>
//   </div>
// </div>


//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default InterviewList;
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Loader2, Trash2, Calendar, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

function InterviewList() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/get-interview-list?userEmail=${user.primaryEmailAddress.emailAddress}`
        );
        const data = await res.json();
        setInterviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching interview list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this interview?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/delete-interview?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInterviews((prev) => prev.filter((interview) => interview.id !== id));
      } else {
        alert("Failed to delete interview");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) return null;

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 md:mb-8">
        Previous Interviews
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <Loader2 className="animate-spin text-indigo-600 w-8 h-8 mx-auto mb-3" />
            <p className="text-gray-500">Loading interviews...</p>
          </div>
        </div>
      ) : interviews.length === 0 ? (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 text-center">
          <Award className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No interviews yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't completed any interviews yet. Start your first mock interview to see your history here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-white">
                <h3 className="text-lg font-bold truncate">
                  {interview.jobPosition}
                </h3>
                <div className="flex items-center mt-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">
                    {interview.jobExperience} Years Experience
                  </span>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-4 flex-grow">
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Created: {formatDate(interview.createdAt)}
                  </span>
                </div>
                
                {/* Status indicator (example) */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
              </div>
              
              {/* Card Footer with Buttons */}
              <div className="px-4 pb-4 pt-2 bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
                    <Button 
                      variant="outline" 
                      className="w-full text-xs sm:text-sm h-9"
                    >
                      Feedback
                    </Button>
                  </Link>
                  <Link href={`/dashboard/interview/${interview.mockId}`}>
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white w-full text-xs sm:text-sm h-9"
                    >
                      Review
                    </Button>
                  </Link>
                </div>
                <Button
                  variant="destructive"
                  className="w-full mt-2 h-9 flex items-center justify-center gap-1 text-xs sm:text-sm"
                  onClick={() => handleDelete(interview.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;