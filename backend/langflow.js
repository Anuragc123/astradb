import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
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

  async initiateSession(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }
}

async function fetchDataFromDataStax(client, flowIdOrName, langflowId, tweaks) {
  console.log("Fetching data from DataStax...");
  const response = await client.runFlow(
    flowIdOrName,
    langflowId,
    "Fetch data from DataStax", // Input value can be anything as DataStax config handles fetching.
    "chat", // Input type
    "chat", // Output type
    tweaks,
    false // No streaming for now
  );
  return response.outputs[0].outputs[0].outputs.message.text;
}

async function main(inputValue, useCustomData = false, stream = false) {
  const flowIdOrName = "22d5c0f9-0d13-4e47-9207-2f4a00ef1bb9";
  const langflowId = "3e8cebc1-edfc-423f-870d-fd1ca30a3dee";
  const applicationToken = process.env.APPLICATION_TOKEN;
  const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
  );

  const tweaks = {
    "GoogleGenerativeAIModel-Vah0o": {
      google_api_key: "GEMINI_API_KEY",
      max_output_tokens: 3072,
      model: "gemini-1.5-flash",
      temperature: 0.1,
    },
  };

  try {
    let dataToSendToGemini;

    if (useCustomData) {
      console.log("Using custom user-provided data...");
      dataToSendToGemini = inputValue; // Use the custom inputValue provided by the user.
    } else {
      console.log("Fetching data from DataStax...");
      dataToSendToGemini = await fetchDataFromDataStax(
        langflowClient,
        flowIdOrName,
        langflowId,
        tweaks
      );
    }

    // Send the data (custom or fetched) to Gemini
    console.log("Sending data to Gemini...");
    const response = await langflowClient.initiateSession(
      flowIdOrName,
      langflowId,
      dataToSendToGemini,
      "chat",
      "chat",
      stream,
      tweaks
    );

    console.log(
      "Response from Gemini:",
      response.outputs[0].outputs[0].results.message.text
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(
    'Please run the file with the message as an argument: node <YOUR_FILE_NAME>.js "user_message" [useCustomData=true/false]'
  );
}
main(
  args[0], // inputValue (custom data or dummy input for DataStax)
  args[1] === "true", // useCustomData (default false)
  args[2] === "true" // stream (default false)
);
