import express from "express";
import { registerAdmin, loginAdmin, adminOnly, studentOnly, teacherOnly } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected route
router.get("/admin-only", protect, authorizeRoles("Admin"), adminOnly);
router.get("/student-only",protect,authorizeRoles("Student"),studentOnly)
router.get("/teacher-only",protect,authorizeRoles("Teahcer"),teacherOnly)
export default router;
