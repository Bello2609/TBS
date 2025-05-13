// backend/server.ts

// ✅ Native + 3rd party modules
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// ✅ Config & Routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import senderRoutes from "./routes/senderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// ✅ Initialize environment
dotenv.config();

// ✅ Create app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // ✅ Middleware
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
    app.use("/api/notifications", notificationRoutes);

    // ✅ Catch-all fallback
    app.use("*", (_req, res) => {
      res.status(404).json({ message: "API route not found" });
    });

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    const err = error as Error;
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
