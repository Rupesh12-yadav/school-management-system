// seedUsers.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./Modelss/Aman.js"; // User schema import

// 1️⃣ MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err));

// 2️⃣ Seed data
const seedUsers = async () => {
  try {
    // Students
    const students = [
      { email: "student1@example.com", password: "1234", role: "student" },
      { email: "student2@example.com", password: "1234", role: "student" },
      { email: "student3@example.com", password: "1234", role: "student" },
      { email: "student4@example.com", password: "1234", role: "student" },
      { email: "student5@example.com", password: "1234", role: "student" }
    ];

    // Teachers
    const teachers = [
      { email: "teacher1@example.com", password: "1234", role: "teacher" },
      { email: "teacher2@example.com", password: "1234", role: "teacher" },
      { email: "teacher3@example.com", password: "1234", role: "teacher" },
      { email: "teacher4@example.com", password: "1234", role: "teacher" },
      { email: "teacher5@example.com", password: "1234", role: "teacher" }
    ];

    // Admin
    const admin = [
      { email: "admin@example.com", password: "1234", role: "admin" }
    ];

    const allUsers = [...students, ...teachers, ...admin];

    for (let userData of allUsers) {
      const exists = await User.findOne({ email: userData.email });
      if (!exists) {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({
          email: userData.email,
          password: hashedPassword,
          role: userData.role
        });
        await user.save();
        console.log(`User ${user.email} added ✅`);
      } else {
        console.log(`User ${userData.email} already exists ⚠️`);
      }
    }

    console.log("All users seeded successfully!");
    mongoose.connection.close(); // Close DB connection after seeding
  } catch (err) {
    console.log("Error seeding users:", err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedUsers();
