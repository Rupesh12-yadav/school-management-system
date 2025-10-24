import Event from "../models/Event.js";
<<<<<<< HEAD
<<<<<<< HEAD
import Admin from "../models/Admin.js";

// 📌 Create Event (Admin Reference Based)
=======

// 📌 Create Event
>>>>>>> a1fd582
=======
import Admin from "../models/Admin.js";

// 📌 Create Event (Admin Reference Based)
>>>>>>> 7cd3b19 (All api working)
export const createEvent = async (req, res) => {
  try {
    const { title, date, description, createdBy, audience, isHoliday, location } = req.body;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7cd3b19 (All api working)
    // ✅ Check if the ID belongs to a valid Admin
    const admin = await Admin.findById(createdBy);

    if (!admin || admin.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Only valid admins can create events.",
      });
    }

    // ✅ Create the event
<<<<<<< HEAD
=======
>>>>>>> a1fd582
=======
>>>>>>> 7cd3b19 (All api working)
    const event = await Event.create({
      title,
      date,
      description,
<<<<<<< HEAD
<<<<<<< HEAD
      createdBy: admin._id, // store as reference
=======
      createdBy,
>>>>>>> a1fd582
=======
      createdBy: admin._id, // store as reference
>>>>>>> 7cd3b19 (All api working)
      audience,
      isHoliday,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
};

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> a1fd582
=======

>>>>>>> 7cd3b19 (All api working)
// 📌 Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Upcoming events first
    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
};

// 📌 Get Single Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Event ID",
      error: error.message,
    });
  }
};

// 📌 Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
};

// 📌 Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
};
