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
      // console.log("resp msg: ",responseMessage);
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

  async runFlow(
    flowIdOrName,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false,
    onUpdate,
    onClose,
    onError
  ) {
    try {
      const initResponse = await this.initiateSession(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        stream,
        tweaks
      );
      console.log("Init Response:", initResponse);
      // console.log("Init Response:", initResponse.outputs[0].inputs);
      if (
        stream &&
        initResponse &&
        initResponse.outputs &&
        initResponse.outputs[0].outputs[0].artifacts.stream_url
      ) {
        const streamUrl =
          initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error("Error running flow:", error);
      onError("Error initiating session");
    }
  }
}

async function main(
  inputValue,
  inputType = "chat",
  outputType = "chat",
  stream = false
) {
  const flowIdOrName = "22d5c0f9-0d13-4e47-9207-2f4a00ef1bb9";
  const langflowId = "3e8cebc1-edfc-423f-870d-fd1ca30a3dee";
  // const applicationToken = process.env.APPLICATION_TOKEN;
  const applicationToken = process.env.APPLICATION_TOKEN_AZURE;
  const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
  );

  // Modify inputValue if not "null"
  if (inputValue !== "null") {
    inputValue =
      "You are a social media analytics assistant. Give insights (minimum 5 points) about the input data. Also, analyze data based on comments and give positive rate of each type of post present in the given data (reel, carousel, and static image) according to comments, give 0 positive rate for type of post that is not present in given data. Example output format: { insights: ['', ''], positive_rate: [75, 95, 80]}.\n Below is the input data for analysis \n postType, likes, shares, comments\n" +
      inputValue;
  }

  try {
    // Dynamically configure tweaks without input_value conflict
    const tweaks = {
      "AstraDBToolComponent-EtOX2": {
        api_endpoint:
          "https://a6cf49ff-ddc0-414e-b3de-b3986228e2dd-westus3.apps.astra.datastax.com",
        collection_name: "posts",
        namespace: "default_keyspace",
        number_of_results: 100,
        projection_attributes: "*",
        static_filters: {},
        token: "ASTRA_DB_APPLICATION_TOKEN",
        tool_description: "Fetch data from Astra DB",
        tool_name: "Astra DB",
        tool_params: {},
        // Enable or disable DataStax fetching based on inputValue
        input_value: inputValue === "null" ? "" : inputValue, // Use user data or skip DB fetching
      },
      "CombineText-ebD7u": {
        text1: "",
        text2: "",
        delimiter: "",
      },
      "CustomComponent-557El": {
        chat_output: "",
        combined_text_output: "",
      },
    };

    // Run the flow, now passing input_value only in the request body
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue, // input_value is passed directly to runFlow
      inputType,
      outputType,
      tweaks, // No need to include input_value in tweaks for ChatInput-lKH3v
      stream,
      (data) => console.log("Received:", data.chunk), // onUpdate
      (message) => console.log("Stream Closed:", message), // onClose
      (error) => console.log("Stream Error:", error) // onError
    );

    if (!stream && response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs.message;

      // console.log("Final Output:", output.message.text);
      return output.message.text;
    }
  } catch (error) {
    console.error("Main Error", error.message);
    return error.message;
  }
}

// main(
//   "'postType, likes, shares, comments\nreel, 500, 200, [Positive, Amazing, Love it!, Too repetitive]\ncarousel, 300, 150, [Nice, Informative, Good Work, Could be better]\nstatic image, 300, 150, [Disgusting , Amazing, hate it!, Too repetitive]\nreel, 250, 99, [Disgusting, hate it!]'"
// );
// main("null");

export default main;
