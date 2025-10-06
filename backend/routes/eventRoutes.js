import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔐 सभी Event routes सिर्फ Admin access कर पाएगा
router.use(protect);
router.use(authorizeRoles("Admin"));

// Event Routes with /event prefix
router.post("/event/add", createEvent);         // Create Event
router.get("/event/all", getAllEvents);         // Get All Events
router.get("/event/:id", getEventById);         // Get Single Event
router.put("/event/update/:id", updateEvent);   // Update Event
router.delete("/event/delete/:id", deleteEvent); // Delete Event

export default router;
