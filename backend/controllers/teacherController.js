import Teacher from "../models/Teacher.js";

// Create Teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, mobile, location, experience, subjects ,} = req.body;

    // Check duplicates
    const existingTeacher = await Teacher.findOne({ $or: [{ email }, { mobile }] });
    if (existingTeacher) return res.status(400).json({ error: "Email or Mobile already exists" });

    const newTeacher = await Teacher.create({ name, email, password, mobile, location, experience, subjects });

    res.status(201).json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single Teacher
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Teacher
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
