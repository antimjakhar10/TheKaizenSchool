const Enquiry = require("../models/Enquiry");

// CREATE ENQUIRY (Public)
const createEnquiry = async (req, res) => {
  try {
    const { parentName, studentName, phone, message } = req.body;
    if (!parentName || !studentName || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Parent Name, Student Name, Phone, and Message are required",
      });
    }

    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully. Our team will contact you shortly.",
      enquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);
    res.status(500).json({ success: false, message: "Failed to submit enquiry" });
  }
};

// GET ALL ENQUIRIES (Admin)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    console.error("Get Enquiries Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch enquiries" });
  }
};

// UPDATE ENQUIRY STATUS (Admin)
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, message: "Enquiry status updated", enquiry });
  } catch (error) {
    console.error("Update Enquiry Error:", error);
    res.status(500).json({ success: false, message: "Failed to update enquiry" });
  }
};

// DELETE ENQUIRY (Admin)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Delete Enquiry Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete enquiry" });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
