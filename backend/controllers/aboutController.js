const About = require("../models/About");

const defaultHighlights = [
  "Student-focused learning",
  "Strong academic foundation",
  "Character & value education",
  "Sports & co-curricular activities",
];

const defaultApproachPillars = [
  {
    title: "Learn",
    text: "Build strong concepts and develop a genuine love for learning.",
  },
  {
    title: "Lead",
    text: "Develop confidence, communication and leadership qualities.",
  },
  {
    title: "Succeed",
    text: "Prepare students with skills and values for a changing world.",
  },
];

// GET ABOUT (Public & Admin)
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        highlights: defaultHighlights,
        approachPillars: defaultApproachPillars,
      });
    } else {
      let modified = false;
      if (!about.highlights || about.highlights.length === 0) {
        about.highlights = defaultHighlights;
        modified = true;
      }
      if (!about.approachPillars || about.approachPillars.length === 0) {
        about.approachPillars = defaultApproachPillars;
        modified = true;
      }
      if (modified) {
        await about.save();
      }
    }
    res.status(200).json({ success: true, about });
  } catch (error) {
    console.error("Get About Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch about data" });
  }
};

// UPDATE ABOUT (Admin)
const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({
      success: true,
      message: "About page updated successfully",
      about,
    });
  } catch (error) {
    console.error("Update About Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update about section" });
  }
};

module.exports = { getAbout, updateAbout };
