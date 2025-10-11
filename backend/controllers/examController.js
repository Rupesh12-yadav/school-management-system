// backend/controllers/examController.js
import Exam from "../models/Exam.js";

// Create/Post Exam
export const createExam = async (req, res) => {
  try {
    const { subjectName, examDate, examDay, totalMarks, marks } = req.body;
    const teacherId = req.user._id; // Teacher ID from protect middleware

    const newExam = await Exam.create({
      teacher: teacherId,
      subjectName,
      examDate,
      examDay,
      totalMarks,
      marks: marks || []
    });

    res.status(201).json({
      success: true,
      message: "Exam posted successfully"  ,
      exam: newExam
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Exams (for a teacher)
export const getAllExams = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const exams = await Exam.find({ teacher: teacherId }).populate("marks.student", "name email");
    res.status(200).json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Exam by ID
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("marks.student", "name email");
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });
    res.status(200).json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Exam
export const updateExam = async (req, res) => {
  try {
    const { subjectName, examDate, examDay, totalMarks, marks } = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { subjectName, examDate, examDay, totalMarks, marks },
      { new: true }
    );

    if (!updatedExam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.status(200).json({ success: true, message: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });

    res.status(200).json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
