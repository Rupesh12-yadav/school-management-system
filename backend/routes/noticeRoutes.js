import express from "express";
import {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} from "../controllers/noticeController.js"; // ✅ अलग Notice controller इस्तेमाल करो
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔐 सभी Notice routes सिर्फ Admin access कर पाएगा
router.use(protect);
router.use(authorizeRoles("Admin"));

// Notice Routes with /notice prefix
router.post("/notice/add", createNotice);          // Create Notice
router.get("/notice/all", getAllNotices);          // Get All Notices
router.get("/notice/:id", getNoticeById);          // Get Single Notice
router.put("/notice/update/:id", updateNotice);    // Update Notice
router.delete("/notice/delete/:id", deleteNotice); // Delete Notice

export default router;
