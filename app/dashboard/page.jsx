

import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function DashboardPage() {
  return (
    <div className="p-6 lg:p-10   min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Create new mock interviews and review your past performance.
        </p>

        {/* Create Section */}
        <div className="my-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create and Start your AI Mock Interview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AddNewInterview />
          </div>
        </div>

        {/* Previous Interview Lists */}
        <InterviewList />
      </div>
    </div>
  );
}

export default DashboardPage;
