import express from "express";
import { registerAdmin, loginAdmin, adminOnly } from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected route
router.get("/admin-only", protect, authorizeRoles("Admin"), adminOnly);

export default router;
