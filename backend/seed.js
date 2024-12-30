const db = require("./db");

// Collection Name
const collectionName = "posts";

async function seedData() {
  const postsCollection = db.collection(collectionName);

  const mockPosts = [
    { postType: "carousel", likes: 134, shares: 42, comments: 12 },
    { postType: "reel", likes: 500, shares: 200, comments: 150 },
    { postType: "static", likes: 88, shares: 20, comments: 5 },
    { postType: "reel", likes: 380, shares: 120, comments: 95 },
    { postType: "carousel", likes: 212, shares: 30, comments: 10 },
    { postType: "static", likes: 60, shares: 15, comments: 3 },
    { postType: "carousel", likes: 189, shares: 60, comments: 35 },
    { postType: "reel", likes: 450, shares: 175, comments: 130 },
    { postType: "static", likes: 110, shares: 25, comments: 8 },
    { postType: "carousel", likes: 175, shares: 40, comments: 20 },
    { postType: "reel", likes: 420, shares: 150, comments: 120 },
    { postType: "static", likes: 95, shares: 18, comments: 7 },
    { postType: "reel", likes: 510, shares: 190, comments: 145 },
    { postType: "carousel", likes: 250, shares: 75, comments: 50 },
    { postType: "static", likes: 70, shares: 10, comments: 4 },
    { postType: "carousel", likes: 130, shares: 35, comments: 15 },
    { postType: "reel", likes: 380, shares: 130, comments: 110 },
    { postType: "static", likes: 120, shares: 28, comments: 12 },
    { postType: "carousel", likes: 180, shares: 60, comments: 25 },
    { postType: "reel", likes: 560, shares: 210, comments: 160 },
    { postType: "static", likes: 85, shares: 22, comments: 6 },
    { postType: "reel", likes: 530, shares: 185, comments: 140 },
    { postType: "carousel", likes: 250, shares: 50, comments: 30 },
    { postType: "static", likes: 95, shares: 16, comments: 7 },
  ];

  try {
    await postsCollection.insertMany(mockPosts);
    console.log("Seeded mock data successfully");
  } catch (err) {
    console.error("Failed to seed data:", err.message);
  } finally {
    process.exit();
  }
}

seedData();
