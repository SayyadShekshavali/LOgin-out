import express from "express";
import mongoose from "mongoose";

import cookieparse from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/authroutes.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000; // Assign the PORT value
const app = express(); // Create an Express application

//!MIddlewear
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieparse);
app.get("/", (error, req, res, next) => {
  res.send("Yorking borther");
});
app.use("api./auth", authRouter);
//! Routes

//!
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://syedshaikshavali330:K8ZA2dqMhTTB5ZJI@loginandout.zihqk.mongodb.net/?retryWrites=true&w=majority&appName=Loginandout"
    );
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
    process.exit(1); // Exit the app if MongoDB connection fails
  }
};

// Call the database connection
connectDB();
app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
