import LeaveRequest from "../models/LeaveRequest.js";

// Student: Create leave request
export const createLeaveRequest = async (req, res) => {
  try {
    const { reason, fromDate, toDate, teacher } = req.body;

    const leave = await LeaveRequest.create({
      requester: req.user._id,  // logged-in student
      reason,
      fromDate,
      toDate,
      teacher
    });

    res.status(201).json({ message: "Leave request created", leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Teacher: Approve or Reject leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;          // Leave request ID
    const { status } = req.body;        // Approved or Rejected

    const leave = await LeaveRequest.findById(id);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    // Only assigned teacher can update
    if (leave.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this request" });
    }

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave ${status.toLowerCase()}`, leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all leave requests for a teacher
export const getTeacherLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ teacher: req.user._id })
      .populate("requester", "name email rollNumber");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all leave requests for a student
export const getStudentLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ requester: req.user._id })
      .populate("teacher", "name email");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete leave (Student can cancel)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    if (leave.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this leave" });
    }

    await leave.deleteOne();
    res.json({ message: "Leave request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
