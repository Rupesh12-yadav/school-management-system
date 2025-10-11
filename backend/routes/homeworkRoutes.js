import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createHomework,
  getAllHomework,
  getHomeworkById,
  updateHomework,
  deleteHomework
} from "../controllers/homeworkController.js";

const router = express.Router();

// 🔐 Teacher protected routes
router.use(protect);
router.use(authorizeRoles("Teacher"));

// Homework Routes
router.post("/homework/add", createHomework);
router.get("/homework/all", getAllHomework);
router.get("/homework/:id", getHomeworkById);
router.put("/homework/update/:id", updateHomework);
router.delete("/homework/delete/:id", deleteHomework);

export default router;
