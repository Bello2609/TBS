// scripts/seedUsers.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Hash passwords and insert users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    // Generate hashed passwords
    const saltRounds = 10;
    const hashedAdmin = await bcrypt.hash("admin123", saltRounds);
    const hashedEmployee = await bcrypt.hash("employee123", saltRounds);
    const hashedCustomer = await bcrypt.hash("customer123", saltRounds);
    // Insert users with hashed passwords
    await User.insertMany([
      {
        name: "Admin User",
        username: "admin",
        email: "admin@example.com",
        password: hashedAdmin,
        role: "admin",
        phone: "+4712345678",
      },
      {
        name: "Employee User",
        username: "employee",
        email: "employee@example.com",
        password: hashedEmployee,
        role: "employee",
        phone: "+4711122233",
      },
      {
        name: "Customer User",
        username: "customer",
        email: "customer@example.com",
        password: hashedCustomer,
        role: "customer",
        phone: "+4799988877",
      },
    ]);

    console.log("✅ Users seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed users:", error);
    process.exit(1);
  }
};

// Start the process
connectDB().then(seedUsers);
