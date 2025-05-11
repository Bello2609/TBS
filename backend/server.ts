// backend/server.ts

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import senderRoutes from "./routes/senderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // ✅ Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));

    // ✅ API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/inventory", inventoryRoutes);
    app.use("/api/invoices", invoiceRoutes);
    app.use("/api/customers", customerRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/senders", senderRoutes);

    // ✅ 404 Handler for unknown routes
    app.use((req, res) => {
      res.status(404).json({ message: "API route not found" });
    });

    // ✅ Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
