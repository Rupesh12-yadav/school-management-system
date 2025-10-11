import express from "express";
import { addStudentAttendance, getStudentAttendance } from "../controllers/AttenStudentContller.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

// Add attendance → Teacher aur Admin dono
router.post("/student", authorizeRoles("Admin","Teacher"), addStudentAttendance);

// View attendance → Admin aur Teacher dono
router.get("/student/:studentId", authorizeRoles("Admin", "Teacher"), getStudentAttendance);

export default router;
