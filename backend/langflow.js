import fetch from "node-fetch";

class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }

  async runFlow(
    flowId,
    langflowId,
    inputValue,
    tweaks = {
      "Prompt-p67Su":
        "You are a social media analytics assistant. Give insights about the input data .Example outputs: Carousel posts have 20% higher engagement than static posts. Reels drive 2x more comments compared to other formats.",
    }
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: "chat",
      output_type: "chat",
      tweaks: tweaks,
    });
  }
}

export default LangflowClient;
