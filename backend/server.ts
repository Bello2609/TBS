// backend/server.ts

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import route modules
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import senderRoutes from "./routes/senderRoutes.js";

// ✅ Connect to MongoDB and then start the server
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // ✅ Global middlewares
    app.use(cors()); // Enable CORS
    app.use(express.json()); // Parse JSON bodies
    app.use(morgan("dev")); // Log requests

    // ✅ Register API routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/inventory", inventoryRoutes);
    app.use("/api/invoices", invoiceRoutes);
    app.use("/api/customers", customerRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/senders", senderRoutes);

    // ✅ 404 Not Found handler
    app.use((req, res) => {
      res.status(404).json({ message: "API route not found" });
    });

    // ✅ Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
