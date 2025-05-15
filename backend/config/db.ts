// backend/config/db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) {
    const errMsg = "MONGO_URI is not defined in the .env file";
    console.error(errMsg);
    throw new Error(errMsg);
  }

  try {
    // ✅ Connect directly using MONGO_URI which already includes DB name
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    let errorMessage = "MongoDB connection failed";
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    } else {
      errorMessage += `: ${String(error)}`;
    }
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export default connectDB;
