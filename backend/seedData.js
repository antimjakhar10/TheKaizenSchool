const Hero = require("./models/Hero");
const About = require("./models/About");
const Academic = require("./models/Academics");
const Facility = require("./models/Facility");
const Gallery = require("./models/Gallery");
const Testimonial = require("./models/Testimonial");
const Event = require("./models/Event");
const Settings = require("./models/Settings");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

const seedInitialData = async () => {
  try {
    // 0. Seed Admin if empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = "admin@kaizenschool.com";
      const password = "Admin@12345";
      const hashedPassword = await bcrypt.hash(password, 12);
      await Admin.create({
        name: "Kaizen School Admin",
        email,
        password: hashedPassword,
        role: "superadmin",
        isActive: true,
      });
      console.log("-> Seeded Admin default account (admin@kaizenschool.com / Admin@12345)");
    }

    // 1. Seed Hero if empty or update if slides missing
    let existingHero = await Hero.findOne();
    const defaultSlides = [
      {
        badge: "Welcome To",
        title: "The Kaizen School",
        highlightedText: "Bhana",
        description:
          "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
        image: "/images/hero-school.png",
        primaryButtonText: "Enquire Now",
        primaryButtonLink: "/contact",
        secondaryButtonText: "Watch Video",
        secondaryButtonLink: "",
      },
      {
        badge: "Excellence in Education",
        title: "World Class",
        highlightedText: "Infrastructure & Faculty",
        description:
          "Equipped with modern laboratories, digital smart classrooms, sports arena and experienced educators.",
        image: "/images/about.png",
        primaryButtonText: "Explore Facilities",
        primaryButtonLink: "/facilities",
        secondaryButtonText: "Admissions 2025-26",
        secondaryButtonLink: "/admissions",
      },
      {
        badge: "Holistic Growth",
        title: "Empowering Students to",
        highlightedText: "Read • Lead • Succeed",
        description:
          "Discovering talent through co-curricular activities, leadership opportunities, and personal mentorship.",
        image: "/images/hero-school.png",
        primaryButtonText: "Apply Online",
        primaryButtonLink: "/admissions",
        secondaryButtonText: "Contact Us",
        secondaryButtonLink: "/contact",
      },
    ];

    if (!existingHero) {
      await Hero.create({
        slides: defaultSlides,
        badge: defaultSlides[0].badge,
        title: defaultSlides[0].title,
        highlightedText: defaultSlides[0].highlightedText,
        description: defaultSlides[0].description,
        image: defaultSlides[0].image,
        primaryButtonText: defaultSlides[0].primaryButtonText,
        primaryButtonLink: defaultSlides[0].primaryButtonLink,
        secondaryButtonText: defaultSlides[0].secondaryButtonText,
        secondaryButtonLink: defaultSlides[0].secondaryButtonLink,
        isActive: true,
      });
      console.log("-> Seeded Hero default data with 3 slides");
    } else if (!existingHero.slides || existingHero.slides.length === 0) {
      existingHero.slides = defaultSlides;
      await existingHero.save();
      console.log("-> Updated existing Hero with default slides");
    }

    // 2. Seed About if empty
    const aboutCount = await About.countDocuments();
    if (aboutCount === 0) {
      await About.create({
        eyebrow: "About Us",
        title: "Building Futures,",
        titleHighlight: "Creating Leaders",
        description1:
          "The Kaizen School Bhana is committed to providing a nurturing and stimulating environment where students grow academically, socially and emotionally.",
        description2:
          "Our approach goes beyond textbooks. We encourage curiosity, creativity, discipline and confidence so that every child is prepared to face the future with knowledge and character.",
        image: "/images/about.png",
        promiseTitle: "Our Promise",
        promiseText: "Learning With Purpose",
        mission: {
          title: "Our Mission",
          description:
            "To empower students to discover their potential and achieve excellence in every area of life.",
        },
        vision: {
          title: "Our Vision",
          description:
            "To create a centre of excellence where education inspires innovation, confidence and lifelong learning.",
        },
        values: {
          title: "Our Values",
          description:
            "Integrity, respect, responsibility and excellence guide everything we do.",
        },
      });
      console.log("-> Seeded About default data");
    }

    // 3. Seed Academics if empty or update missing fields
    const defaultAcademicStages = [
      {
        slug: "pre-primary",
        number: "01",
        title: "Pre-Primary",
        subtitle: "Early Years Education",
        highlightedText: "Learning",
        description: "Building curiosity and creativity through joyful, play-based learning.",
        heroDescription: "A gentle and joyful introduction to learning where young children explore, play, build confidence and develop essential early life skills.",
        overviewTitle: "A Joyful Start to Learning",
        overviewDescription1: "Our Pre-Primary program is designed to give children a warm, safe and stimulating environment where learning happens naturally through play, discovery and social interaction.",
        overviewDescription2: "We focus on building strong foundational skills in communication, language, motor coordination and emotional development while nurturing curiosity and enthusiasm.",
        image: "/images/hero-school.png",
        badgeTitle: "Early Childhood",
        badgeText: "Joyful Learning",
        iconName: "Baby",
        order: 1,
        isActive: true,
      },
      {
        slug: "primary",
        number: "02",
        title: "Primary",
        subtitle: "Foundational Education",
        highlightedText: "Foundations",
        description: "Strong foundations in basics with a focus on concepts and confidence.",
        heroDescription: "Building fundamental academic concepts, language proficiency, logical thinking and positive learning habits in a supportive environment.",
        overviewTitle: "Building Strong Concepts & Confidence",
        overviewDescription1: "Primary education at The Kaizen School focuses on creating a strong foundation in core subjects while helping students develop reading comprehension, mathematical thinking and creative problem-solving.",
        overviewDescription2: "Teachers use interactive teaching methods, visual aids and practical activities to make learning meaningful, encouraging students to ask questions and express their ideas clearly.",
        image: "/images/about.png",
        badgeTitle: "Class 1st to 5th",
        badgeText: "Concept Building",
        iconName: "BookOpen",
        order: 2,
        isActive: true,
      },
      {
        slug: "middle-school",
        number: "03",
        title: "Middle School",
        subtitle: "Intermediate Education",
        highlightedText: "Exploration",
        description: "Encouraging critical thinking, exploration and practical understanding.",
        heroDescription: "Developing analytical skills, subject depth, independent inquiry and team collaboration as students transition into higher academic levels.",
        overviewTitle: "Encouraging Curiosity & Inquiry",
        overviewDescription1: "Middle School is a vital stage where students begin to explore subjects in greater depth, develop critical thinking skills and apply their knowledge to practical real-world situations.",
        overviewDescription2: "We encourage independent study habits, project work, co-curricular participation and teamwork to build well-rounded, confident learners.",
        image: "/images/hero-school.png",
        badgeTitle: "Class 6th to 8th",
        badgeText: "Critical Thinking",
        iconName: "Library",
        order: 3,
        isActive: true,
      },
      {
        slug: "secondary",
        number: "04",
        title: "Secondary",
        subtitle: "High School Education",
        highlightedText: "Excellence",
        description: "Preparing students for challenges with strong academic guidance.",
        heroDescription: "Rigorous academic preparation, conceptual clarity, exam strategies and personal mentoring for board examinations and competitive goals.",
        overviewTitle: "Academic Discipline & Guidance",
        overviewDescription1: "Secondary education prepares students for board examinations with focused subject mastery, structured revision, regular practice tests and individual academic support.",
        overviewDescription2: "Along with academic rigor, we focus on time management, discipline, analytical reasoning and career awareness.",
        image: "/images/about.png",
        badgeTitle: "Class 9th & 10th",
        badgeText: "Board Preparation",
        iconName: "GraduationCap",
        order: 4,
        isActive: true,
      },
      {
        slug: "senior-secondary",
        number: "05",
        title: "Senior Secondary",
        subtitle: "Senior School Education",
        highlightedText: "Specialization",
        description: "Guiding students towards their goals and a successful future.",
        heroDescription: "Specialized stream guidance in Science, Commerce and Arts with expert instruction, practical labs and career mentoring.",
        overviewTitle: "Stream Specialization & Career Readiness",
        overviewDescription1: "Senior Secondary education offers specialized study streams designed to help students excel in board examinations, national entrance exams and higher education admissions.",
        overviewDescription2: "With experienced mentors, modern lab facilities and targeted guidance, we empower students to achieve their career dreams.",
        image: "/images/hero-school.png",
        badgeTitle: "Class 11th & 12th",
        badgeText: "Career Mentorship",
        iconName: "Trophy",
        order: 5,
        isActive: true,
      },
    ];

    const academicsCount = await Academic.countDocuments();
    if (academicsCount === 0) {
      await Academic.insertMany(defaultAcademicStages);
      console.log("-> Seeded Academics default data for 5 stages");
    }

    // 4. Seed Facilities if empty
    const facilityCount = await Facility.countDocuments();
    if (facilityCount === 0) {
      await Facility.insertMany([
        {
          title: "Smart Classrooms",
          image: "/images/facilities/classroom.png",
          iconName: "Monitor",
          description: "Interactive digital boards and comfortable seating for modern learning.",
          order: 1,
          isActive: true,
        },
        {
          title: "Science Lab",
          image: "/images/facilities/science-lab.png",
          iconName: "FlaskConical",
          description: "Well-equipped Physics, Chemistry and Biology laboratories.",
          order: 2,
          isActive: true,
        },
        {
          title: "Computer Lab",
          image: "/images/facilities/computer-lab.png",
          iconName: "Building2",
          description: "High-speed internet and updated computer systems.",
          order: 3,
          isActive: true,
        },
        {
          title: "Library",
          image: "/images/facilities/library.png",
          iconName: "Library",
          description: "Vast collection of books, encyclopedias, and educational journals.",
          order: 4,
          isActive: true,
        },
        {
          title: "Sports Facilities",
          image: "/images/facilities/sports.png",
          iconName: "Dumbbell",
          description: "Spacious playgrounds for football, cricket, volleyball, and indoor games.",
          order: 5,
          isActive: true,
        },
        {
          title: "Transport",
          image: "/images/facilities/transport.png",
          iconName: "Bus",
          description: "Safe and reliable bus transport covering surrounding areas.",
          order: 6,
          isActive: true,
        },
      ]);
      console.log("-> Seeded Facilities default data");
    }

    // 5. Seed Gallery if empty
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        {
          image: "/images/gallery/gallery-1.png",
          title: "School Campus",
          category: "Campus",
          description: "Beautiful modern school building and green playground.",
          isActive: true,
        },
        {
          image: "/images/gallery/gallery-2.png",
          title: "Annual Function",
          category: "Events",
          description: "Cultural dance and music performances by students.",
          isActive: true,
        },
        {
          image: "/images/gallery/gallery-3.png",
          title: "Students Activities",
          category: "Activities",
          description: "Hands-on group activities and creative workshops.",
          isActive: true,
        },
        {
          image: "/images/gallery/gallery-4.png",
          title: "Sports Day",
          category: "Sports",
          description: "Annual athletic meet and sports competitions.",
          isActive: true,
        },
        {
          image: "/images/gallery/gallery-5.png",
          title: "Learning Moments",
          category: "Education",
          description: "Interactive classroom learning and science experiments.",
          isActive: true,
        },
      ]);
      console.log("-> Seeded Gallery default data");
    }

    // 6. Seed Testimonials if empty
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        {
          name: "Mrs. Priya Sharma",
          role: "Parent",
          initials: "PS",
          text: "The Kaizen School has created a wonderful learning environment. The teachers are caring, supportive and genuinely focused on every child's growth.",
          rating: 5,
          isActive: true,
        },
        {
          name: "Mr. Amit Kumar",
          role: "Parent",
          initials: "AK",
          text: "We are very happy with the academic approach and activities at the school. Our child has become more confident and enthusiastic about learning.",
          rating: 5,
          isActive: true,
        },
        {
          name: "Kavya",
          role: "Student",
          initials: "K",
          text: "I love my school because our teachers always encourage us to participate, ask questions and discover something new every day.",
          rating: 5,
          isActive: true,
        },
      ]);
      console.log("-> Seeded Testimonials default data");
    }

    // 7. Seed Events if empty
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany([
        {
          title: "Annual Sports Meet 2025",
          date: "October 15, 2025",
          location: "School Sports Ground",
          description: "Inter-house sports competitions, races, and awards ceremony.",
          isUpcoming: true,
          isActive: true,
        },
        {
          title: "Science & Art Exhibition",
          date: "November 20, 2025",
          location: "School Auditorium",
          description: "Students showcasing creative projects, models, and artwork.",
          isUpcoming: true,
          isActive: true,
        },
      ]);
      console.log("-> Seeded Events default data");
    }

    // 8. Seed Settings if empty
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        schoolName: "The Kaizen School Bhana",
        motto: "Read • Lead • Succeed",
        phone1: "9468023823",
        phone2: "9467818529",
        email: "kaizenschoolbhana@gmail.com",
        address: "Badopal Road, Bhana, Haryana - 125123",
        topbarAnnounce: "Admissions Open for Academic Session 2025-26",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Kaizen+School+Bhana",
        timing: "Monday - Saturday: 8:00 AM - 2:00 PM",
      });
      console.log("-> Seeded Settings default data");
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
};

module.exports = seedInitialData;
