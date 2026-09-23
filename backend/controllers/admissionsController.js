const Admissions = require("../models/Admissions");

const defaultSteps = [
  {
    number: "01",
    title: "Enquiry",
    description: "Connect with our school team to understand the admission process.",
    iconName: "Phone",
  },
  {
    number: "02",
    title: "Application",
    description: "Complete the admission application with required student details.",
    iconName: "FileText",
  },
  {
    number: "03",
    title: "Interaction",
    description: "Students and parents may be invited for an interaction.",
    iconName: "UserCheck",
  },
  {
    number: "04",
    title: "Confirmation",
    description: "Complete formalities and confirm your child's admission.",
    iconName: "BadgeCheck",
  },
];

const defaultDocuments = [
  "Completed admission application",
  "Student's recent photographs",
  "Birth certificate",
  "Previous school records, where applicable",
  "Transfer certificate, where applicable",
  "Parent / guardian identification document",
];

const defaultGuidelines = [
  "Parents are encouraged to contact the school for current admission availability.",
  "Admission requirements may vary depending on the class and academic session.",
  "Please keep original documents available for verification when required.",
  "For the latest admission details, please connect directly with the school.",
];

const defaultFaqs = [
  {
    category: "Admission",
    question: "How can I apply for admission?",
    answer: "You can begin the admission process by submitting an admission enquiry or by using the Apply for Admission option on our website. Our admissions team can guide you through the next steps.",
  },
  {
    category: "Admission",
    question: "Which classes are open for admission?",
    answer: "Admissions are offered for different classes depending on seat availability and the academic session. Please contact the school to confirm availability for the class you are interested in.",
  },
  {
    category: "Admission",
    question: "Can I visit the school before applying?",
    answer: "Yes. Parents are welcome to schedule a school visit to explore the campus, understand the learning environment and interact with the school team before making an admission decision.",
  },
  {
    category: "Eligibility",
    question: "What are the admission eligibility requirements?",
    answer: "Eligibility may vary according to the class. It can include age requirements, previous academic records, student interaction or an age-appropriate assessment.",
  },
  {
    category: "Documents",
    question: "Which documents are required for admission?",
    answer: "Parents may be required to provide documents such as the child's birth certificate, photographs, previous school records, identity proof, address proof and other documents applicable to the admission.",
  },
  {
    category: "Fees",
    question: "How can I know about the fee structure?",
    answer: "For the latest fee information applicable to the academic session and class, please contact the admissions team directly.",
  },
  {
    category: "Fees",
    question: "Are there any scholarships available?",
    answer: "The school may offer scholarship opportunities subject to the applicable criteria and availability. Please refer to the Merit Scholarship section or contact the school for current details.",
  },
];

const defaultCriteriaEligibility = [
  {
    className: "Pre-Primary",
    details: "Admission is based on the child's age, readiness and interaction during the admission process.",
  },
  {
    className: "Primary School",
    details: "The child should meet the required age criteria and demonstrate age-appropriate academic readiness.",
  },
  {
    className: "Middle School",
    details: "Admission depends on previous academic performance, interaction and availability of seats.",
  },
  {
    className: "Secondary & Senior Secondary",
    details: "Admission is subject to academic eligibility, previous school records, interaction/assessment and seat availability.",
  },
];

const defaultScholarshipProcess = [
  {
    number: "01",
    title: "Apply",
    description: "Submit the admission application and indicate your interest in scholarship consideration.",
  },
  {
    number: "02",
    title: "Assessment",
    description: "The student may be evaluated through academic records, interaction or other applicable criteria.",
  },
  {
    number: "03",
    title: "Review",
    description: "The school reviews the submitted information and supporting documents.",
  },
  {
    number: "04",
    title: "Decision",
    description: "Eligible students are informed about the scholarship decision and applicable benefits.",
  },
];

const defaultScholarshipBenefits = [
  "Recognition of academic and overall achievement",
  "Encouragement to continue pursuing excellence",
  "Scholarship benefits as per applicable school policy",
  "Opportunity to be recognised for exceptional talent",
  "A supportive environment for continued growth",
];

const defaultScholarshipDocuments = [
  "Previous academic records",
  "Achievement certificates, if applicable",
  "Competition / participation certificates",
  "Sports or extracurricular achievement records",
  "Other supporting documents requested by the school",
];

const defaultScholarshipFaqs = [
  {
    question: "Who can apply for a merit scholarship?",
    answer: "Students who demonstrate academic excellence, outstanding talent or notable achievements may be considered for scholarship opportunities, subject to applicable criteria.",
  },
  {
    question: "Is the scholarship available for every class?",
    answer: "Scholarship availability and eligibility may vary depending on the academic session, class and applicable school policy. Please contact the school for current information.",
  },
  {
    question: "Does applying guarantee a scholarship?",
    answer: "No. Scholarship consideration is subject to the applicable eligibility criteria, assessment, documentation, availability and the school's final decision.",
  },
];

const getAdmissions = async (req, res) => {
  try {
    let admissions = await Admissions.findOne();
    if (!admissions) {
      admissions = await Admissions.create({
        heroTitle: "Admissions Open 2025-26",
        heroSubtitle: "Simple Steps To Join The Kaizen School Family",
        steps: defaultSteps,
        documents: defaultDocuments,
        guidelines: defaultGuidelines,
        faqs: defaultFaqs,
        criteriaEligibility: defaultCriteriaEligibility,
        scholarshipProcess: defaultScholarshipProcess,
        scholarshipBenefits: defaultScholarshipBenefits,
        scholarshipDocuments: defaultScholarshipDocuments,
        scholarshipFaqs: defaultScholarshipFaqs,
      });
    } else {
      // Backfill missing fields if any
      let modified = false;
      if (!admissions.faqs || admissions.faqs.length === 0) {
        admissions.faqs = defaultFaqs;
        modified = true;
      }
      if (!admissions.criteriaEligibility || admissions.criteriaEligibility.length === 0) {
        admissions.criteriaEligibility = defaultCriteriaEligibility;
        modified = true;
      }
      if (!admissions.scholarshipProcess || admissions.scholarshipProcess.length === 0) {
        admissions.scholarshipProcess = defaultScholarshipProcess;
        modified = true;
      }
      if (!admissions.scholarshipBenefits || admissions.scholarshipBenefits.length === 0) {
        admissions.scholarshipBenefits = defaultScholarshipBenefits;
        modified = true;
      }
      if (!admissions.scholarshipDocuments || admissions.scholarshipDocuments.length === 0) {
        admissions.scholarshipDocuments = defaultScholarshipDocuments;
        modified = true;
      }
      if (!admissions.scholarshipFaqs || admissions.scholarshipFaqs.length === 0) {
        admissions.scholarshipFaqs = defaultScholarshipFaqs;
        modified = true;
      }
      if (modified) {
        await admissions.save();
      }
    }
    return res.json({ success: true, admissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateAdmissions = async (req, res) => {
  try {
    let admissions = await Admissions.findOne();
    if (!admissions) {
      admissions = new Admissions(req.body);
    } else {
      Object.assign(admissions, req.body);
    }
    await admissions.save();
    return res.json({ success: true, admissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdmissions,
  updateAdmissions,
};
