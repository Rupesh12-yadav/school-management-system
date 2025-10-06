import Event from "../models/Event.js";

// 📌 Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, date, description, createdBy, audience, isHoliday, location } = req.body;

    const event = await Event.create({
      title,
      date,
      description,
      createdBy,
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
