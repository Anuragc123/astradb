import React from "react";
import { Link } from "react-router-dom";
import UserInputForm from "./UserInputForm";

function Welcome() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to Social Media Analysis
        </h1>
        <p className="text-center mb-8">
          Analyze your social media post performance or view a sample analysis.
        </p>
        <div className="flex justify-center mb-8">
          <Link
            to="/analysis"
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            View Sample Analysis
          </Link>
        </div>
        <div className="flex justify-center">
          <UserInputForm />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
