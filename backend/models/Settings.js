const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: "The Kaizen School Bhana",
    },
    motto: {
      type: String,
      default: "Read • Lead • Succeed",
    },
    phone1: {
      type: String,
      default: "9468023823",
    },
    phone2: {
      type: String,
      default: "9467818529",
    },
    email: {
      type: String,
      default: "kaizenschoolbhana@gmail.com",
    },
    address: {
      type: String,
      default: "Badopal Road, Bhana, Haryana - 125123",
    },
    topbarAnnounce: {
      type: String,
      default: "Admissions Open for Academic Session 2025-26",
    },
    mapUrl: {
      type: String,
      default:
        "https://www.google.com/maps/search/?api=1&query=The+Kaizen+School+Bhana",
    },
    timing: {
      type: String,
      default: "Monday - Saturday: 8:00 AM - 2:00 PM",
    },
    contactHeroEyebrow: {
      type: String,
      default: "Contact Us",
    },
    contactHeroTitle: {
      type: String,
      default: "Let's Start a",
    },
    contactHeroTitleHighlight: {
      type: String,
      default: "Conversation",
    },
    contactHeroDescription: {
      type: String,
      default:
        "Have questions about admissions, academics, facilities or school life? Our team is always happy to help parents and students with the information they need.",
    },
    contactFormHeading: {
      type: String,
      default: "How Can We Help?",
    },
    contactFormSubheading: {
      type: String,
      default:
        "Share a few details with us and our admission team will assist you with the right information.",
    },
    facebookUrl: {
      type: String,
      default: "https://facebook.com",
    },
    instagramUrl: {
      type: String,
      default: "https://instagram.com/the_kaizen_school_bhana",
    },
    youtubeUrl: {
      type: String,
      default: "https://youtube.com",
    },
    twitterUrl: {
      type: String,
      default: "",
    },
    linkedinUrl: {
      type: String,
      default: "",
    },
    whatsappUrl: {
      type: String,
      default: "https://wa.me/919468023823",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
