import express from "express";
import {
  createLeaveRequest,
  updateLeaveStatus,
  getTeacherLeaves,
  getStudentLeaves
} from "../controllers/leaveController.js";

import { protect } from "../middlewares/authMiddleware.js"; // JWT protect middleware
import { authorizeRoles } from "../middlewares/authMiddleware.js"; // Optional role check

const router = express.Router();
// Student creates leave request
router.post("/leaveadd", protect, authorizeRoles("Student"), createLeaveRequest);

// Teacher approves/rejects leave
router.put("/leave/:id", protect, authorizeRoles("Teacher"), updateLeaveStatus);

// Teacher: view all leave requests assigned to them
router.get("/leave/teacher", protect, authorizeRoles("Teacher"), getTeacherLeaves);

// Student: view their own leave requests
router.get("/leave/student", protect, authorizeRoles("Student"), getStudentLeaves);

export default router;
