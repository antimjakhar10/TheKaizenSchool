const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    classGrade: {
      type: String,
      default: "Primary",
    },
    interest: {
      type: String,
      default: "New Admission",
    },
    visitDate: {
      type: String,
      default: "",
    },
    contactMethod: {
      type: String,
      default: "Phone Call",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
