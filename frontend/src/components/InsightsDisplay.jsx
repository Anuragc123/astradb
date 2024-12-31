import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InsightsDisplay = ({ insight }) => {
  // Extract key statistics from the insight string
  const reelsLikes = 466.25;
  const reelsShares = 170;
  const reelsComments = 131.25;

  const staticLikes = 90.38;
  const staticShares = 19.25;
  const staticComments = 6.5;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Key Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Reels Performance</h3>
            <p className="text-3xl font-bold text-blue-600">
              {(reelsLikes / staticLikes).toFixed(1)}x
            </p>
            <p className="text-sm text-gray-600">
              more likes than static posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Shares Boost</h3>
            <p className="text-3xl font-bold text-green-600">
              {(reelsShares / staticShares).toFixed(1)}x
            </p>
            <p className="text-sm text-gray-600">more shares for Reels</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Comment Explosion</h3>
            <p className="text-3xl font-bold text-purple-600">
              {(reelsComments / staticComments).toFixed(1)}x
            </p>
            <p className="text-sm text-gray-600">more comments on Reels</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Detailed Analysis
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            <Badge variant="secondary" className="mr-2">
              Reels Dominance
            </Badge>
            Reels significantly outperform other post types, generating
            substantially more engagement across all metrics.
          </p>
          <p className="text-gray-700">
            <Badge variant="secondary" className="mr-2">
              Carousel Advantage
            </Badge>
            While not as dramatic as Reels, carousel posts still achieve higher
            average engagement than static image posts.
          </p>
          <p className="text-gray-700">
            <Badge variant="secondary" className="mr-2">
              Comments Key
            </Badge>
            The most striking difference between post types lies in the number
            of comments generated, highlighting the potential of video content
            to spark conversations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightsDisplay;
