import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  Phone,
  School,
  Send,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicAdmissions } from "../services/publicApi";

const iconMap = {
  Phone,
  FileText,
  UserCheck,
  BadgeCheck,
};

const defaultSteps = [
  {
    number: "01",
    title: "Enquiry",
    description:
      "Connect with our school team to understand the admission process, classes and available information.",
    iconName: "Phone",
  },
  {
    number: "02",
    title: "Application",
    description:
      "Complete the admission application with the required student and parent details.",
    iconName: "FileText",
  },
  {
    number: "03",
    title: "Interaction",
    description:
      "Students and parents may be invited for an interaction or assessment depending on the class.",
    iconName: "UserCheck",
  },
  {
    number: "04",
    title: "Confirmation",
    description:
      "Complete the required formalities and confirm your child's admission with the school.",
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

const Admissions = () => {
  const [admissionsData, setAdmissionsData] = useState({
    heroTitle: "Admissions Open 2025-26",
    heroSubtitle: "Simple Steps To Join The Kaizen School Family",
    steps: defaultSteps,
    documents: defaultDocuments,
    guidelines: defaultGuidelines,
  });

  useEffect(() => {
    getPublicAdmissions().then((data) => {
      if (data) {
        setAdmissionsData({
          heroTitle: data.heroTitle || "Admissions Open 2025-26",
          heroSubtitle:
            data.heroSubtitle || "Simple Steps To Join The Kaizen School Family",
          steps: data.steps && data.steps.length > 0 ? data.steps : defaultSteps,
          documents:
            data.documents && data.documents.length > 0
              ? data.documents
              : defaultDocuments,
          guidelines:
            data.guidelines && data.guidelines.length > 0
              ? data.guidelines
              : defaultGuidelines,
        });
      }
    });
  }, []);

  const benefits = [
    {
      title: "Quality Education",
      description:
        "Strong academic foundations with a focus on understanding and continuous growth.",
      icon: BookOpen,
    },
    {
      title: "Safe Environment",
      description:
        "A caring and secure environment where students can learn with confidence.",
      icon: ShieldCheck,
    },
    {
      title: "Holistic Development",
      description:
        "Academics, sports, creativity and life skills come together for complete development.",
      icon: GraduationCap,
    },
    {
      title: "Caring Faculty",
      description:
        "Dedicated educators who support students throughout their learning journey.",
      icon: HeartHandshake,
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[430px] w-[430px] rounded-full border-[70px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[430px] w-[430px] rounded-full border-[70px] border-[#f5b400]/10" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[340px] items-center py-10 sm:py-14 lg:min-h-[380px] lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-3xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Admissions
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {admissionsData.heroTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                {admissionsData.heroSubtitle}
              </p>

              <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/60">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b400]">Admissions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WELCOME / BENEFITS
      ====================================================== */}
      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55]">
                  Welcome To Kaizen
                </span>
                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#082b55] sm:text-4xl">
                A Place Where
                <span className="block text-[#f2ad00]">Learning Comes Alive</span>
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Choosing a school is an important decision for every family.
                At The Kaizen School Bhana, we aim to provide an environment
                where students feel supported, challenged and inspired to
                become their best selves.
              </p>

              <Link
                to="/contact"
                className="group mt-7 inline-flex items-center gap-2 rounded-md bg-[#082b55] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5b400] hover:text-[#082b55]"
              >
                Talk To Our Team
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Benefits */}
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="group rounded-2xl border border-slate-100 bg-[#fafbfc] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_35px_rgba(8,43,85,0.08)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4d0] text-[#d99d00] transition-all duration-300 group-hover:bg-[#082b55] group-hover:text-[#f5b400]">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-4 text-base font-black text-[#082b55]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADMISSION PROCESS (DYNAMIC FROM BACKEND)
      ====================================================== */}
      <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                Admission Process
              </span>
              <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl lg:text-[42px]">
              Simple Steps To Join Us
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Our admission process is designed to make the journey simple,
              clear and comfortable for parents and students.
            </p>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-[45px] hidden h-px bg-[#f5b400]/30 lg:block" />

            {admissionsData.steps.map((step, index) => {
              const Icon = iconMap[step.iconName] || Phone;

              return (
                <motion.div
                  key={step.title || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative z-10 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(8,43,85,0.09)]"
                >
                  <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-[#082b55] text-[#f5b400] shadow-lg">
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-widest text-[#d99d00]">
                    Step {step.number || `0${index + 1}`}
                  </span>

                  <h3 className="mt-2 text-lg font-black text-[#082b55]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 font-medium">
                    {step.description}
                  </p>

                  <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-[#f5b400] transition-all duration-300 group-hover:w-16" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCUMENTS + GUIDELINES (DYNAMIC FROM BACKEND)
      ====================================================== */}
      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-slate-100 bg-[#fafbfc] p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#082b55] text-[#f5b400]">
                  <ClipboardCheck size={23} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">
                    Before Applying
                  </p>
                  <h2 className="mt-1 text-xl font-black text-[#082b55] sm:text-2xl">
                    Documents Required
                  </h2>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {admissionsData.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg bg-white p-3 shadow-sm"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#f5b400]"
                    />
                    <span className="text-sm font-medium leading-5 text-slate-700 sm:text-base">
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-[#082b55] p-6 text-white sm:p-8"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border-[35px] border-white/5" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5b400] text-[#082b55]">
                  <FileText size={23} />
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#f5b400]">
                  Important Information
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Admission Guidelines
                </h2>

                <div className="mt-6 space-y-4">
                  {admissionsData.guidelines.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-[#f5b400]">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-white/75 sm:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#082b55] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[45px] border-[#f5b400]/10" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                    Admissions Open 2026
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  Ready To Take The
                  <span className="text-[#f5b400]"> Next Step?</span>
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                  Get in touch with The Kaizen School Bhana and learn more
                  about admissions for your child.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#f5b400] px-6 py-3.5 text-sm font-extrabold text-[#082b55] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Enquire Now
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="tel:9468023823"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admissions;