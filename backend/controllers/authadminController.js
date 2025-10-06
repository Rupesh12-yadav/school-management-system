import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Check duplicates
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ error: "Email already exists" });

    const admin = await Admin.create({ name, email, password, mobile });
  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json({ message: "Admin registered successfully",token, admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // JWT Token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({ message: "Login successful", token, admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Admin Profile
export const getProfileAdmin = async (req, res) => {
  try {
    // Token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch admin by ID from token
    const admin = await Admin.findById(decoded.id).select("-password"); // exclude password
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
