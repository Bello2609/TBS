// scripts/seedInventory.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Inventory from "../models/inventory.model";
import Customer from "../models/customer.model";
import Sender from "../models/sender.model";

dotenv.config();

const seedInventory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    const customers = await Customer.find();
    const senders = await Sender.find();

    if (customers.length === 0 || senders.length === 0) {
      throw new Error("❌ You must seed customers and senders first.");
    }

    const inventoryItems = [
      {
        customerId: customers[0]._id,
        senderId: senders[0]._id,
        goods: "Frozen Salmon",
        type: "Fish",
        quantity: 100,
        weight: 1500,
        arrivalDate: new Date("2024-05-01"),
        departureDate: new Date("2024-05-05"),
      },
      {
        customerId: customers[1]._id,
        senderId: senders[1]?._id || senders[0]._id,
        goods: "Shrimp",
        type: "Seafood",
        quantity: 80,
        weight: 900,
        arrivalDate: new Date("2024-05-02"),
        departureDate: new Date("2024-05-06"),
      },
    ];

    await Inventory.deleteMany({});
    console.log("🧹 Existing inventory removed");

    const inserted = await Inventory.insertMany(inventoryItems);
    console.log(`✅ Inserted ${inserted.length} inventory items`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding inventory:", error);
    process.exit(1);
  }
};

seedInventory();
