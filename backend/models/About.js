const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      default: "About Us",
      trim: true,
    },
    title: {
      type: String,
      default: "Building Futures,",
      trim: true,
    },
    titleHighlight: {
      type: String,
      default: "Creating Leaders",
      trim: true,
    },
    description1: {
      type: String,
      default:
        "The Kaizen School Bhana is committed to creating a nurturing and stimulating environment where students can grow academically, socially and emotionally.",
      trim: true,
    },
    description2: {
      type: String,
      default:
        "We believe that education is not limited to classrooms and textbooks. It is about developing curiosity, confidence, discipline, creativity and the ability to make thoughtful decisions.",
      trim: true,
    },
    image: {
      type: String,
      default: "/images/about.png",
    },
    promiseTitle: {
      type: String,
      default: "Our Promise",
    },
    promiseText: {
      type: String,
      default: "Learning With Purpose",
    },
    highlights: [
      {
        type: String,
      },
    ],
    mission: {
      title: { type: String, default: "Our Mission" },
      description: {
        type: String,
        default:
          "To empower every student with knowledge, confidence and character so they can discover their potential and contribute meaningfully to society.",
      },
    },
    vision: {
      title: { type: String, default: "Our Vision" },
      description: {
        type: String,
        default:
          "To create an inspiring centre of excellence where education develops curious minds, responsible citizens and future leaders.",
      },
    },
    values: {
      title: { type: String, default: "Our Values" },
      description: {
        type: String,
        default:
          "Integrity, respect, responsibility, compassion and excellence form the foundation of everything we do.",
      },
    },
    approachTitle: {
      type: String,
      default: "Learning Beyond",
    },
    approachHighlight: {
      type: String,
      default: "The Classroom",
    },
    approachDescription: {
      type: String,
      default:
        "Our educational approach focuses on developing the complete personality of a child. We combine academic learning with experiences that encourage creativity, teamwork, leadership and independent thinking.",
    },
    approachPillars: [
      {
        title: String,
        text: String,
      },
    ],
    ctaTitle: {
      type: String,
      default: "Give Your Child a Stronger Future",
    },
    ctaDescription: {
      type: String,
      default:
        "Become a part of The Kaizen School Bhana family and let your child's journey towards learning, leadership and success begin.",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("About", aboutSchema);
