const Testimonial = require("../models/Testimonial");

// GET TESTIMONIALS (Public)
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    console.error("Get Testimonials Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// GET TESTIMONIALS (Admin)
const getAdminTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    console.error("Get Admin Testimonials Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// CREATE TESTIMONIAL (Admin)
const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, message: "Testimonial created successfully", testimonial });
  } catch (error) {
    console.error("Create Testimonial Error:", error);
    res.status(500).json({ success: false, message: "Failed to create testimonial" });
  }
};

// UPDATE TESTIMONIAL (Admin)
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Testimonial updated successfully", testimonial });
  } catch (error) {
    console.error("Update Testimonial Error:", error);
    res.status(500).json({ success: false, message: "Failed to update testimonial" });
  }
};

// DELETE TESTIMONIAL (Admin)
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Delete Testimonial Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete testimonial" });
  }
};

module.exports = {
  getTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
