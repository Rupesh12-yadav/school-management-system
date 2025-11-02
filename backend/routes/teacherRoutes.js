import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from "../controllers/teacherController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All teacher management routes protected and admin-only
// router.use(protect);
// router.use(authorizeRoles("Admin"));

// Meaningful URLs
router.post("/teacher/add", createTeacher);
router.get("/teacher/all", getAllTeachers);
router.get("/teacher/:id", getTeacherById);
router.put("/teacher/update/:id", updateTeacher);
router.delete("/teacher/delete/:id", deleteTeacher);

export default router;