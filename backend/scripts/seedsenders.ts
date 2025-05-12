// scripts/seedSenders.ts
// Seed sample senders into the database using ESM-compatible ts-node
// node --loader ts-node/esm scripts/seedSenders.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Sender from "../models/sender.model.js"; // ✅ Must include .js when using ESM

dotenv.config();

// Sample senders
const senders = [
  { name: "Sender One" },
  { name: "Sender Two" },
  { name: "Sender Three" },
];

const seedSenders = async () => {
  try {
    // Connect using Mongo URI
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    // Delete existing senders
    await Sender.deleteMany({});
    console.log("🧹 Existing senders removed");

    // Insert new senders
    const inserted = await Sender.insertMany(senders);
    console.log(`✅ Inserted ${inserted.length} senders`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed senders:", error);
    process.exit(1);
  }
};

seedSenders();
