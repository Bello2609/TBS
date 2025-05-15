import express from "express";
import { getNotifications } from "../controllers/notificationController";

const router = express.Router();

router.get("/getNotification", getNotifications);


export default router;