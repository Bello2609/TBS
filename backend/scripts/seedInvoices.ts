import mongoose from "mongoose";
import dotenv from "dotenv";
import Invoice from "../models/invoice.model";
import Customer from "../models/customer.model";
import Inventory from "../models/inventory.model";

dotenv.config();

const seedInvoices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    const customers = await Customer.find();
    const inventory = await Inventory.find();

    if (customers.length === 0 || inventory.length === 0) {
      throw new Error("❌ You must seed customers and inventory first.");
    }

    const invoices = [
      {
        customerId: customers[0]._id,
        invoiceNumber: "INV-1001", // ✅ required
        date: new Date("2024-05-10"), // ✅ required
        dueDate: new Date("2024-05-15"),
        status: "Paid",

        items: [
          {
            description: inventory[0].goods,
            quantity: inventory[0].quantity,
            unitPrice: 20,
            total: inventory[0].quantity * 20,
          },
        ],

        tax: 0.25 * inventory[0].quantity * 20, // ✅ required
        grandTotal: inventory[0].quantity * 20 * 1.25, // ✅ required

        inventoryItems: [], // يمكنك ملؤها لاحقًا إذا أردت

        bankInfo: {
          accountNumber: "1234.56.78900", // ✅ required
          kidNumber: "000123456789", // ✅ required
        },
      },
      {
        customerId: customers[1]._id,
        invoiceNumber: "INV-1002",
        date: new Date("2024-05-12"),
        dueDate: new Date("2024-05-18"),
        status: "Pending",

        items: [
          {
            description: inventory[1].goods,
            quantity: inventory[1].quantity,
            unitPrice: 25,
            total: inventory[1].quantity * 25,
          },
        ],

        tax: 0.25 * inventory[1].quantity * 25,
        grandTotal: inventory[1].quantity * 25 * 1.25,

        inventoryItems: [],

        bankInfo: {
          accountNumber: "9876.54.32100",
          kidNumber: "000987654321",
        },
      },
    ];

    await Invoice.deleteMany({});
    console.log("🧹 Existing invoices removed");

    const inserted = await Invoice.insertMany(invoices);
    console.log(`✅ Inserted ${inserted.length} invoices`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding invoices:", error);
    process.exit(1);
  }
};

seedInvoices();
