import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

function UserInputForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    try {
      let parsedData;

      if (fileExtension === "json") {
        const text = await file.text();
        parsedData = JSON.parse(text);
      } else if (fileExtension === "csv") {
        const text = await file.text();
        const result = await new Promise((resolve, reject) => {
          Papa.parse(text, {
            header: true,
            complete: resolve,
            error: reject,
            dynamicTyping: true,
          });
        });

        parsedData = result.data.filter(
          (row) =>
            row.postType &&
            typeof row.likes === "number" &&
            typeof row.shares === "number" &&
            typeof row.comments === "number"
        );
      } else {
        throw new Error("Unsupported file format. Please use JSON or CSV.");
      }

      if (Array.isArray(parsedData) && parsedData.every(isValidDataPoint)) {
        navigate("/analysis", { state: { userData: parsedData } });
      } else {
        setError("Invalid data format. Please check your file.");
      }
    } catch (err) {
      console.error("Error during file parsing:", err);
      setError("Error parsing file. Please check your file format.");
    }
  };


  const isValidDataPoint = (data) => {
    return (
      typeof data.postType === "string" &&
      typeof data.likes === "number" &&
      typeof data.shares === "number" &&
      typeof data.comments === "number"
    );
  };

  return (
    <div className="mt-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Upload Your Data
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="file-upload"
            className="block text-base font-medium text-gray-700 mb-3 text-center"
          >
            Choose a CSV or JSON file
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".csv,.json"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:ml-4 file:py-3 file:px-5
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-700
              hover:file:bg-green-200
              focus:ring focus:ring-green-300 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg
            hover:bg-green-600 transition duration-300 focus:ring focus:ring-green-300 focus:outline-none"
          >
            Analyze Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInputForm;
