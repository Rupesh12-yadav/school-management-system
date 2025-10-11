import express from "express";
import { addTeacherAttendance, getTeacherAttendance } from "../controllers/AttendTeacherContller.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

// Add attendance → Teacher ya Admin
router.post("/teacher", authorizeRoles("Admin"),addTeacherAttendance);
// View attendance → Admin aur Teacher
router.get("/:teacherId", authorizeRoles("Admin"),getTeacherAttendance);

export default router;
