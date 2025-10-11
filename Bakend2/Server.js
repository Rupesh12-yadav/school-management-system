// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./Modelss/Aman.js"; // Correct path & .js extension

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(async () => {
    console.log("MongoDB connected ✅");

    // ✅ Test user add (agar pehle se nahi hai)
    const exists = await User.findOne({ email: "student@example.com" });
    if (!exists) {
      const testUser = new User({
        email: "student@example.com",
        password: "1234",
        role: "student"
      });
      await testUser.save();
      console.log("Test user added ✅");
    }
  })
  .catch(err => console.log("MongoDB connection error:", err));

// ================= CRUD ROUTES =================

// ✅ CREATE (POST)
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE (PUT)
app.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE (DELETE)
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Server start
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
