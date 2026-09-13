import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with DB")
  } catch(err) {
    console.log("Failed To Connect With DB :" , err);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});




// app.post("/test", async (req, res) => {

//   try {

//    const options = {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.ASI_API_KEY}`
//         },

//         body: JSON.stringify({
//           model: "asi1",
//           messages: [
//             {
//               role: "assistant",
//               content: req.body.message
//             }
//           ]
//         })
//       };

//     const response = await fetch(
//       "https://inference.asicloud.cudos.org/v1/chat/completions", options
      
//     );

//     const data = await response.json();

//     // console.log("STATUS:", response.status);
//     //console.log(data.choices[0].message);

//     res.json(data.choices[0].message.content);

//   } catch (error) {

//     console.error(error);

//     res.status(500).json({
//       error: error.message
//     });

//   }
// });
