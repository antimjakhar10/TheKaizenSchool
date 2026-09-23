const Facility = require("../models/Facility");
const FacilityPage = require("../models/FacilityPage");

const defaultPageInfo = {
  heroEyebrow: "Our Facilities",
  heroTitle: "Modern Infrastructure",
  heroTitleHighlight: "For Better Learning",
  heroDescription:
    "Explore our well-equipped classrooms, science and computer labs, library, sports grounds, and safe transportation facilities.",
  overviewEyebrow: "Our Campus",
  overviewTitle: "Spaces That Support",
  overviewTitleHighlight: "Every Kind of Learning",
  overviewDescription:
    "A good school environment plays an important role in a student's development. Our facilities are designed to support classroom learning while also giving students opportunities to experiment, create, play and explore.",
  overviewImage: "/images/about.png",
  overviewBadgeText: "Learn With Confidence",
  campusFeatures: [
    "Modern learning spaces",
    "Practical learning facilities",
    "Dedicated sports opportunities",
    "Reading & resource areas",
    "Technology-enabled education",
    "Student-friendly environment",
  ],
};

// GET FACILITIES (Public)
const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true }).sort({ order: 1 });
    let pageInfo = await FacilityPage.findOne();
    if (!pageInfo) {
      pageInfo = await FacilityPage.create(defaultPageInfo);
    }
    res.status(200).json({ success: true, facilities, pageInfo });
  } catch (error) {
    console.error("Get Facilities Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch facilities" });
  }
};

// GET FACILITIES (Admin)
const getAdminFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ order: 1 });
    let pageInfo = await FacilityPage.findOne();
    if (!pageInfo) {
      pageInfo = await FacilityPage.create(defaultPageInfo);
    }
    res.status(200).json({ success: true, facilities, pageInfo });
  } catch (error) {
    console.error("Get Admin Facilities Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch facilities" });
  }
};

// UPDATE FACILITY PAGE SETTINGS (Admin)
const updateFacilityPage = async (req, res) => {
  try {
    let pageInfo = await FacilityPage.findOne();
    if (!pageInfo) {
      pageInfo = new FacilityPage(req.body);
    } else {
      Object.assign(pageInfo, req.body);
    }
    await pageInfo.save();
    res.status(200).json({ success: true, message: "Facility page details updated successfully", pageInfo });
  } catch (error) {
    console.error("Update Facility Page Error:", error);
    res.status(500).json({ success: false, message: "Failed to update facility page details" });
  }
};

// CREATE FACILITY (Admin)
const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, message: "Facility created successfully", facility });
  } catch (error) {
    console.error("Create Facility Error:", error);
    res.status(500).json({ success: false, message: "Failed to create facility" });
  }
};

// UPDATE FACILITY (Admin)
const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!facility) {
      return res.status(404).json({ success: false, message: "Facility not found" });
    }
    res.status(200).json({ success: true, message: "Facility updated successfully", facility });
  } catch (error) {
    console.error("Update Facility Error:", error);
    res.status(500).json({ success: false, message: "Failed to update facility" });
  }
};

// DELETE FACILITY (Admin)
const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).json({ success: false, message: "Facility not found" });
    }
    res.status(200).json({ success: true, message: "Facility deleted successfully" });
  } catch (error) {
    console.error("Delete Facility Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete facility" });
  }
};

module.exports = {
  getFacilities,
  getAdminFacilities,
  updateFacilityPage,
  createFacility,
  updateFacility,
  deleteFacility,
};
