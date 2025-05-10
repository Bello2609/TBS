// backend/scripts/seedUsers.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.js"; // تأكد من .js

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await User.deleteMany(); // احذر: سيحذف كل المستخدمين السابقين

  const hashedPassword = await bcrypt.hash("123456", 10);

  await User.insertMany([
    {
      username: "admin1",
      email: "admin1@example.com",
      name: "Admin One",
      password: hashedPassword,
      role: "admin",
    },
    {
      username: "employee1",
      email: "employee1@example.com",
      name: "Employee One",
      password: hashedPassword,
      role: "employee",
    },
    {
      username: "customer1",
      email: "customer1@example.com",
      name: "Customer One",
      password: hashedPassword,
      role: "customer",
    },
  ]);

  console.log("✅ Users seeded");
  process.exit();
};

seedUsers().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
