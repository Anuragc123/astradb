import React, { useState } from "react";
import axios from "axios";

const PostAnalysis = () => {
  const [postType, setPostType] = useState("");
  const [performanceData, setPerformanceData] = useState(null);
  const [insights, setInsights] = useState("");

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const getPerformanceData = async () => {
    try {
      const response = await axios.get(
        `/api/posts/performance?postType=${postType}`
      );
      setPerformanceData(response.data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const getInsights = async () => {
    try {
      const response = await axios.get(
        `/api/posts/insights?postType=${postType}`
      );
      setInsights(response.data.insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  return (
    <div>
      <h1>Post Analysis</h1>
      <label>
        Post Type:
        <select value={postType} onChange={handlePostTypeChange}>
          <option value="">Select Post Type</option>
          <option value="carousel">Carousel</option>
          <option value="reel">Reel</option>
          <option value="static">Static</option>
        </select>
      </label>
      <button onClick={getPerformanceData}>Get Performance Data</button>
      <button onClick={getInsights}>Get Insights</button>

      {performanceData && (
        <div>
          <h2>Performance Data</h2>
          <p>Likes: {performanceData.avgLikes}</p>
          <p>Shares: {performanceData.avgShares}</p>
          <p>Comments: {performanceData.avgComments}</p>
        </div>
      )}

      {insights && (
        <div>
          <h2>Insights</h2>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
};

export default PostAnalysis;
