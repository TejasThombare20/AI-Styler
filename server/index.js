import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
import OpenAI from "openai";


import DalleRoutes from "./routes/dalle.routes.js";


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.post("/api", async (req, res) => {
//   try {
//     console.log("Hello");
//     const { prompt } = req.body;
//     const response = await openai.createImage({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const image = response.data.data[0].b64_json;

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use("/api",DalleRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});

app.listen(5000, () => console.log("server listening on port 5000"));
