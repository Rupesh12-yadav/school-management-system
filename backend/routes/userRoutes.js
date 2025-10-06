import express from "express";
import { loginTeacher, loginStudent } from "../controllers/authuserController.js";

const router = express.Router();

// Teacher login route
router.post("/teacher/login", loginTeacher);

// Student login route
router.post("/student/login", loginStudent);

export default router;
