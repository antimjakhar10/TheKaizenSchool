const mongoose = require("mongoose");

const facilityPageSchema = new mongoose.Schema(
  {
    heroEyebrow: {
      type: String,
      default: "Our Facilities",
    },
    heroTitle: {
      type: String,
      default: "Modern Infrastructure",
    },
    heroTitleHighlight: {
      type: String,
      default: "For Better Learning",
    },
    heroDescription: {
      type: String,
      default:
        "Explore our well-equipped classrooms, science and computer labs, library, sports grounds, and safe transportation facilities.",
    },
    overviewEyebrow: {
      type: String,
      default: "Our Campus",
    },
    overviewTitle: {
      type: String,
      default: "Spaces That Support",
    },
    overviewTitleHighlight: {
      type: String,
      default: "Every Kind of Learning",
    },
    overviewDescription: {
      type: String,
      default:
        "A good school environment plays an important role in a student's development. Our facilities are designed to support classroom learning while also giving students opportunities to experiment, create, play and explore.",
    },
    overviewImage: {
      type: String,
      default: "/images/about.png",
    },
    overviewBadgeText: {
      type: String,
      default: "Learn With Confidence",
    },
    campusFeatures: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FacilityPage", facilityPageSchema);
