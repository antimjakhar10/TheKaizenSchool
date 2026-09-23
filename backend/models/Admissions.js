const mongoose = require("mongoose");

const AdmissionsSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Admissions Open 2025-26",
    },
    heroSubtitle: {
      type: String,
      default: "Simple Steps To Join The Kaizen School Family",
    },
    steps: [
      {
        number: String,
        title: String,
        description: String,
        iconName: String,
      },
    ],
    documents: [
      {
        type: String,
      },
    ],
    guidelines: [
      {
        type: String,
      },
    ],
    faqs: [
      {
        category: String,
        question: String,
        answer: String,
      },
    ],
    criteriaEligibility: [
      {
        className: String,
        details: String,
      },
    ],
    scholarshipProcess: [
      {
        number: String,
        title: String,
        description: String,
      },
    ],
    scholarshipBenefits: [
      {
        type: String,
      },
    ],
    scholarshipDocuments: [
      {
        type: String,
      },
    ],
    scholarshipFaqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admissions", AdmissionsSchema);
