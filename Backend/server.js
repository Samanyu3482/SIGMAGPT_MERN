// import 'dotenv/config';
// import { OpenAI } from "openai"

// const client = new OpenAI({
//   apiKey: process.env.ASI_API_KEY,
//   baseURL: "https://inference.asicloud.cudos.org/v1"
// })

// const response = await client.chat.completions.create({
//   model: "asi1-mini",
//   messages: [
//     { role: "user", content: "diff bw SQL and NoSQL" }
//   ]
// })

// console.log(response.choices[0].message.content)


import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post("/test", async (req, res) => {

  try {

   const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.ASI_API_KEY}`
        },

        body: JSON.stringify({
          model: "asi1",
          messages: [
            {
              role: "assistant",
              content: req.body.message
            }
          ]
        })
      };

    const response = await fetch(
      "https://inference.asicloud.cudos.org/v1/chat/completions", options
      
    );

    const data = await response.json();

    // console.log("STATUS:", response.status);
    //console.log(data.choices[0].message);

    res.json(data.choices[0].message.content);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});