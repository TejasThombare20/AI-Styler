import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E backend " });
// });

router.route("/").post(async (req, res) => {
  try {
    console.log("Hello");
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });


    console.log("HEllo 2");
    const image = response.data.data[0].b64_json;

    // console.log(buffer)

    // const image = Buffer.from(buffer ,"base64" )

    // const image = response.data.data.map((img) => img.url);
    // console.log("responseData", response.data.data);
    console.log("image", image);
    // res.status(200).json({ photo: image });
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("error", error);
  }
});

export default router;
