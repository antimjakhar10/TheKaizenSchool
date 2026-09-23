const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  badge: {
    type: String,
    trim: true,
    default: "Welcome To",
  },
  title: {
    type: String,
    trim: true,
    required: true,
    default: "The Kaizen School",
  },
  highlightedText: {
    type: String,
    trim: true,
    default: "Bhana",
  },
  description: {
    type: String,
    trim: true,
    default:
      "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
  },
  image: {
    type: String,
    default: "/images/hero-school.png",
  },
  primaryButtonText: {
    type: String,
    trim: true,
    default: "Enquire Now",
  },
  primaryButtonLink: {
    type: String,
    trim: true,
    default: "/contact",
  },
  secondaryButtonText: {
    type: String,
    trim: true,
    default: "Watch Video",
  },
  secondaryButtonLink: {
    type: String,
    trim: true,
    default: "",
  },
});

const heroSchema = new mongoose.Schema(
  {
    slides: [slideSchema],

    badge: {
      type: String,
      trim: true,
      default: "Welcome To",
    },

    title: {
      type: String,
      trim: true,
      required: true,
      default: "The Kaizen School",
    },

    highlightedText: {
      type: String,
      trim: true,
      default: "Bhana",
    },

    description: {
      type: String,
      trim: true,
      default:
        "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
    },

    image: {
      type: String,
      default: "/images/hero-school.png",
    },

    primaryButtonText: {
      type: String,
      trim: true,
      default: "Enquire Now",
    },

    primaryButtonLink: {
      type: String,
      trim: true,
      default: "/contact",
    },

    secondaryButtonText: {
      type: String,
      trim: true,
      default: "Watch Video",
    },

    secondaryButtonLink: {
      type: String,
      trim: true,
      default: "",
    },

    features: [
      {
        title: String,
        description: String,
        iconName: String,
      },
    ],

    stats: [
      {
        value: String,
        secondValue: String,
        label: String,
        iconName: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hero", heroSchema);