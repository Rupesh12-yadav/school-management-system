import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All student management routes (admin-only)
router.use(protect);                 // Login required
router.use(authorizeRoles("Admin")); // Only Admin can manage students

// Meaningful URLs
router.post("/student/add", createStudent);           // Create student
router.get("/student/all", getAllStudents);           // Get all students
router.get("/student/:id", getStudentById);           // Get single student
router.put("/student/update/:id", updateStudent);     // Update student
router.delete("/student/delete/:id", deleteStudent);  // Delete student

export default router;
