import express from "express";
// import db from "../db.js";
import main from "../langflow.js";
import cors from "cors";

async function analyseData(data) {
  // console.log("Data in analyseData=",data)
  const analysis = {
    carousel: {
      likes: 0,
      shares: 0,
      comments: [],
      count: 0,
    },
    reel: {
      likes: 0,
      shares: 0,
      comments: [],
      count: 0,
    },
    static: {
      likes: 0,
      shares: 0,
      comments: [],
      count: 0,
    },
  };

  data.forEach((post) => {
    if (!analysis[post.postType]) {
      analysis[post.postType] = {
        likes: 0,
        shares: 0,
        comments: [],
        count: 0,
      };
    }
    analysis[post.postType].likes += post.likes;
    analysis[post.postType].shares += post.shares;
    analysis[post.postType].comments.push(...post.comments);
    analysis[post.postType].count++;
  });

  let results = Object.keys(analysis).map((type) => ({
    postType: type,
    avgLikes:
      analysis[type].count === 0
        ? 0
        : (analysis[type].likes / analysis[type].count).toFixed(2),
    avgShares:
      analysis[type].count === 0
        ? 0
        : (analysis[type].shares / analysis[type].count).toFixed(2),
    // avgComments: (analysis[type].comments / analysis[type].count).toFixed(2),
    allComments: analysis[type].comments,
  }));

  console.log("Results:", results);

  const inputValue = JSON.stringify(results);

  const flowResponse = await main(inputValue);

  const flowTrimmed = flowResponse.trim().substring(7, flowResponse.length - 4);
  // console.log("flowReponseTrimmed: \n", flowTrimmed);

  const output = JSON.parse(flowTrimmed);

  // console.log(insights);
  console.log("Output:", output);

  const insights = output.insights;
  const positive_rate = output.positive_rate;

  // console.log(results);

  results[0].allComments = positive_rate[0];
  results[1].allComments = positive_rate[1];
  results[2].allComments = positive_rate[2];

  // console.log("Done");

  return { results, insights };
}

const router = express.Router();
router.use(cors());
// const langflowClient = new LangflowClient(
//   "https://api.langflow.astra.datastax.com",
//   process.env.APPLICATION_TOKEN
// );

router.post("/analysis", async (req, res) => {
  const data = req.body;
  // console.log("Data in post route",data);
  try {
    // const postsCollection = db.collection("posts");
    // const data = await postsCollection.find({}).toArray();
    // console.log("data\n", data);
    const { results, insights } = await analyseData(data.data);
    res.json({ data: results, insights });
  } catch (error) {
    console.error("Error in analyse route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/analysis", async (req, res) => {
  try {
    // const postsCollection = db.collection("posts");
    // const data = await postsCollection.find({}).toArray();

    // console.log("Data in get route",data)
    // console.log(typeof data)

    // const { results, insights } = await analyseData(data);

    // console.log("Langflow response: ",insights2);
    const flowResponse = await main("null");

    console.log("flowReponse: \n", flowResponse);

    const output = JSON.parse(
      flowResponse.trim().substring(7, flowResponse.length - 4)
    );

    // console.log(insights);
    // console.log(results);

    const insights = output.insights;
    const positive_rate = output.positive_rate;
    const results = output.results;

    // console.log(results);

    results[0].allComments = positive_rate[0];
    results[1].allComments = positive_rate[1];
    results[2].allComments = positive_rate[2];

    res.json({ data: results, insights });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
