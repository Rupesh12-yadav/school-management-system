import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} from "../controllers/examController.js";

const router = express.Router();

// 🔐 Teacher protected routes
router.use(protect);
router.use(authorizeRoles("Teacher"));

// Exam Routes
router.post("/exam/add", createExam);
router.get("/exam/all", getAllExams);
router.get("/exam/:id", getExamById);
router.put("/exam/update/:id", updateExam);
router.delete("/exam/delete/:id", deleteExam);

export default router;
