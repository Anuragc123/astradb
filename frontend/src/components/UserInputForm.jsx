import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserInputForm() {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const parsedData = JSON.parse(inputData.trim());
      console.log(parsedData);
      console.log(typeof parsedData);

      if (Array.isArray(parsedData) && parsedData.every(isValidDataPoint)) {
        navigate("/analysis", { state: { userData: parsedData } });
      } else {
        setError("Invalid data format. Please check your input.");
      }
    } catch (err) {
      console.error("Error during JSON parsing:", err);
      setError("Invalid JSON. Please check your input.");
    }
  };

  const isValidDataPoint = (data) => {
    return (
      data.hasOwnProperty("postType") &&
      data.hasOwnProperty("likes") &&
      data.hasOwnProperty("shares") &&
      data.hasOwnProperty("comments")
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Enter Your Data</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-48 p-2 border rounded"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder={`[
  { "postType": "carousel", "likes": 134, "shares": 42, "comments": 12 },
  { "postType": "reel", "likes": 500, "shares": 200, "comments": 150 },
  { "postType": "static", "likes": 88, "shares": 20, "comments": 5 }
]`}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Analyze Data
        </button>
      </form>
    </div>
  );
}

export default UserInputForm;
