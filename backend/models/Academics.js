const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    highlightedText: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    heroDescription: {
      type: String,
      trim: true,
    },
    overviewTitle: {
      type: String,
      trim: true,
    },
    overviewDescription1: {
      type: String,
      trim: true,
    },
    overviewDescription2: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "/images/hero-school.png",
    },
    badgeTitle: {
      type: String,
      trim: true,
    },
    badgeText: {
      type: String,
      trim: true,
    },
    features: [
      {
        title: String,
        description: String,
        iconName: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    approachPillars: [
      {
        number: String,
        title: String,
        description: String,
      },
    ],
    iconName: {
      type: String,
      default: "BookOpen",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Academic", academicSchema);
