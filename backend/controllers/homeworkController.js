import Homework from "../models/Homework.js";

// 📌 Create Homework
export const createHomework = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    const teacherId = req.user._id; // Teacher ID from protect middleware

    const homework = await Homework.create({
      title,
      description,
      assignedBy: teacherId, // automatically teacher assign karega
      assignedTo,
      dueDate
    });

    res.status(201).json({ success: true, message: "Homework created successfully", homework });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating homework", error: error.message });
  }
};

// 📌 Get All Homework
export const getAllHomework = async (req, res) => {
  try {
    const homeworkList = await Homework.find()
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name rollNumber")
      .sort({ dueDate: -1 });

    res.status(200).json({ success: true, count: homeworkList.length, homework: homeworkList });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching homework", error: error.message });
  }
};

// 📌 Get Homework by ID
export const getHomeworkById = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id)
      .populate("assignedBy", "name email")
      .populate("assignedTo", "name rollNumber");

    if (!homework) return res.status(404).json({ success: false, message: "Homework not found" });

    res.status(200).json({ success: true, homework });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid Homework ID", error: error.message });
  }
};

// 📌 Update Homework
export const updateHomework = async (req, res) => {
  try {
    // Optional: sirf teacher jo assignedBy hai wo update kar sake
    const homework = await Homework.findOneAndUpdate(
      { _id: req.params.id, assignedBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!homework) return res.status(404).json({ success: false, message: "Homework not found or not authorized" });

    res.status(200).json({ success: true, message: "Homework updated successfully", homework });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error updating homework", error: error.message });
  }
};

// 📌 Delete Homework
export const deleteHomework = async (req, res) => {
  try {
    // Optional: sirf teacher jo assignedBy hai wo delete kar sake
    const homework = await Homework.findOneAndDelete({ _id: req.params.id, assignedBy: req.user._id });

    if (!homework) return res.status(404).json({ success: false, message: "Homework not found or not authorized" });

    res.status(200).json({ success: true, message: "Homework deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error deleting homework", error: error.message });
  }
};
