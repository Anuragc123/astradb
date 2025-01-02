import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchAnalytics = async (userData = null) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (userData) {
        response = await axios.post("http://localhost:3000/posts/analysis", {
          data: userData,
        });
      } else {
        response = await axios.get("http://localhost:3000/posts/analysis");
      }
      setAnalyticsData(response.data.data);
      setInsights(response.data.insights);
    } catch (err) {
      setError("Failed to fetch analytics data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = location.state?.userData;
    if (userData) {
      fetchAnalytics(userData);
    } else {
      fetchAnalytics();
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Social Media Analytics
            </h1>

            {loading && (
              <p className="text-center">Loading analytics data...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {analyticsData && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Post Type</th>
                      <th className="px-4 py-2">Avg Likes</th>
                      <th className="px-4 py-2">Avg Shares</th>
                      <th className="px-4 py-2">Positive Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="border px-4 py-2 text-center">
                          {row.postType}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {row.avgLikes}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {row.avgShares}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {row.allComments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {insights && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Insights:</h2>
                <ul className="list-disc pl-4">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-gray-700">
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
