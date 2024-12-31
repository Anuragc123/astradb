// Welcome.jsx
import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Social Media Analysis
        </h1>
        <Link
          to="/analysis"
          className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          View Post Analysis
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
