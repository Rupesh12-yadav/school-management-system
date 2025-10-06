import express from "express";
import {
    postExamResult,
    getAllExamResults,
    getExamResultById,
    updateExamResult,
    deleteExamResult
} from "../controllers/ResultController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔒 Protect all routes + only Teacher can access
router.use(protect);
router.use(authorizeRoles("Teacher"));

// 1️⃣ Post a new exam result
router.post("/resultadd", postExamResult);

// 2️⃣ Get all exam results for logged-in teacher
router.get("/resultget", getAllExamResults);

// 3️⃣ Get single exam result by ID
router.get("/result/:id", getExamResultById);

// 4️⃣ Update exam result by ID
router.put("/result/:id", updateExamResult);

// 5️⃣ Delete exam result by ID
router.delete("/result/:id", deleteExamResult);

export default router;
