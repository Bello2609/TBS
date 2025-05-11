// backend/config/db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB connection URI from environment
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in the .env file");
    process.exit(1);
  }

  try {
    // Connect to MongoDB using URI and optional DB name
    const conn = await mongoose.connect(MONGO_URI, {
      dbName: process.env.DB_NAME, // Database name defined in .env
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
