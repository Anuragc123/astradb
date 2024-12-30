import express from "express";
import path from "path";
// import { fileURLToPath } from "url";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// console.log(import.meta.url);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.render("index", { title: "Social Media Analysis" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
