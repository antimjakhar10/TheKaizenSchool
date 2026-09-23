import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Eye,
  GraduationCap,
  Heart,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicAbout } from "../services/publicApi";

const defaultAbout = {
  eyebrow: "About Us",
  title: "Building Futures,",
  titleHighlight: "Creating Leaders",
  description1:
    "The Kaizen School Bhana is committed to creating a nurturing and stimulating environment where students can grow academically, socially and emotionally.",
  description2:
    "We believe that education is not limited to classrooms and textbooks. It is about developing curiosity, confidence, discipline, creativity and the ability to make thoughtful decisions.",
  image: "/images/about.png",
  promiseTitle: "Our Promise",
  promiseText: "Learning With Purpose",
  highlights: [
    "Student-focused learning",
    "Strong academic foundation",
    "Character & value education",
    "Sports & co-curricular activities",
  ],
  mission: {
    title: "Our Mission",
    description:
      "To empower every student with knowledge, confidence and character so they can discover their potential and contribute meaningfully to society.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To create an inspiring centre of excellence where education develops curious minds, responsible citizens and future leaders.",
  },
  values: {
    title: "Our Values",
    description:
      "Integrity, respect, responsibility, compassion and excellence form the foundation of everything we do.",
  },
  approachTitle: "Learning Beyond",
  approachHighlight: "The Classroom",
  approachDescription:
    "Our educational approach focuses on developing the complete personality of a child. We combine academic learning with experiences that encourage creativity, teamwork, leadership and independent thinking.",
  approachPillars: [
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
  ],
  ctaTitle: "Give Your Child a Stronger Future",
  ctaDescription:
    "Become a part of The Kaizen School Bhana family and let your child's journey towards learning, leadership and success begin.",
};

const About = () => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    getPublicAbout().then((data) => {
      if (data) {
        setAbout({
          ...defaultAbout,
          ...data,
          highlights:
            data.highlights && data.highlights.length > 0
              ? data.highlights
              : defaultAbout.highlights,
          approachPillars:
            data.approachPillars && data.approachPillars.length > 0
              ? data.approachPillars
              : defaultAbout.approachPillars,
        });
      }
    });
  }, []);

  const valuesList = [
    {
      title: about.mission?.title || "Our Mission",
      icon: Target,
      description:
        about.mission?.description || defaultAbout.mission.description,
    },
    {
      title: about.vision?.title || "Our Vision",
      icon: Eye,
      description:
        about.vision?.description || defaultAbout.vision.description,
    },
    {
      title: about.values?.title || "Our Values",
      icon: Award,
      description:
        about.values?.description || defaultAbout.values.description,
    },
  ];

  const strengths = [
    {
      title: "Quality Education",
      description:
        "A balanced academic approach focused on strong concepts, curiosity and continuous improvement.",
      icon: BookOpen,
    },
    {
      title: "Experienced Faculty",
      description:
        "Dedicated educators who understand students and encourage them to learn with confidence.",
      icon: Users,
    },
    {
      title: "Holistic Development",
      description:
        "Equal importance to academics, sports, creativity, communication and life skills.",
      icon: GraduationCap,
    },
    {
      title: "Safe Environment",
      description:
        "A caring and secure campus where students can learn, explore and express themselves freely.",
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full border-[70px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full border-[70px] border-[#f5b400]/10" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative grid min-h-[360px] items-center gap-10 py-12 sm:min-h-[380px] sm:py-16 lg:grid-cols-[1fr_0.8fr] lg:py-20">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  {about.eyebrow || "About The Kaizen School"}
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {about.title || "Building Futures,"}
                <span className="block text-[#f5b400]">
                  {about.titleHighlight || "Creating Leaders"}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                {about.description1 ||
                  "Discover a learning environment where every child is encouraged to think, explore, learn and grow with confidence."}
              </p>

              {/* Breadcrumb */}
              <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/60">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b400]">About Us</span>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative ml-auto max-w-[520px]">
                <div className="absolute -left-5 top-1/2 h-[85%] w-12 -translate-y-1/2 rounded-l-full border-[5px] border-r-0 border-[#f5b400]" />

                <div className="overflow-hidden rounded-[35%_0_0_35%] border border-white/10 shadow-2xl">
                  <img
                    src={about.image || "/images/about.png"}
                    alt="The Kaizen School Bhana campus"
                    className="h-[310px] w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT SCHOOL (WHO WE ARE)
      ====================================================== */}
      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-2xl bg-[#fff4d0]" />

              <div className="relative overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_20px_55px_rgba(8,43,85,0.12)]">
                <img
                  src={about.image || "/images/hero-school.png"}
                  alt="Students at The Kaizen School"
                  className="h-[330px] w-full rounded-xl object-cover sm:h-[430px] lg:h-[480px]"
                />
              </div>

              {/* Motto Card */}
              <div className="absolute -bottom-6 right-4 rounded-xl bg-[#082b55] px-5 py-4 text-white shadow-xl sm:right-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5b400]">
                  {about.promiseTitle || "Our Motto"}
                </p>

                <p className="mt-1 text-sm font-black sm:text-base">
                  {about.promiseText || "Read • Lead • Succeed"}
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                  {about.eyebrow || "Who We Are"}
                </span>

                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
                {about.title || "A School Where"}
                <span className="block text-[#f2ad00]">
                  {about.titleHighlight || "Every Child Matters"}
                </span>
              </h2>

              {about.description1 && (
                <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                  {about.description1}
                </p>
              )}

              {about.description2 && (
                <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                  {about.description2}
                </p>
              )}

              {/* Highlights */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-[#082b55] sm:text-base"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#f5b400]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION / VALUES
      ====================================================== */}
      <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                What Guides Us
              </span>

              <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl">
              Our Mission, Vision & Values
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              The principles that shape our approach to education and guide our
              commitment towards every student.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {valuesList.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_10px_35px_rgba(8,43,85,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(8,43,85,0.11)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff4d0] text-[#d99d00] transition-all duration-300 group-hover:bg-[#082b55] group-hover:text-[#f5b400]">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#082b55]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-slate-600 font-medium">
                    {item.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATIONAL APPROACH
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
                  Our Approach
                </span>

                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#082b55] sm:text-4xl">
                {about.approachTitle || "Learning Beyond"}
                <span className="block text-[#f2ad00]">
                  {about.approachHighlight || "The Classroom"}
                </span>
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {about.approachDescription ||
                  "Our educational approach focuses on developing the complete personality of a child. We combine academic learning with experiences that encourage creativity, teamwork, leadership and independent thinking."}
              </p>

              <div className="mt-7 space-y-4">
                {about.approachPillars.map((item, index) => (
                  <div key={item.title || index} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#082b55] text-sm font-black text-[#f5b400]">
                      0{index + 1}
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[#082b55]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Strengths */}
            <div className="grid gap-4 sm:grid-cols-2">
              {strengths.map((item, index) => {
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
                    className="rounded-xl border border-slate-100 bg-[#fafbfc] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff4d0] text-[#d99d00]">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-[#082b55]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
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
          CTA
      ====================================================== */}
      <section className="px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#082b55] px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[40px] border-[#f5b400]/10" />

            <Heart size={30} className="relative mx-auto text-[#f5b400]" />

            <h2 className="relative mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              {about.ctaTitle || "Give Your Child a Stronger Future"}
            </h2>

            <p className="relative mx-auto mt-3 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              {about.ctaDescription ||
                "Become a part of The Kaizen School Bhana family and let your child's journey towards learning, leadership and success begin."}
            </p>

            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/admissions"
                className="group inline-flex items-center gap-2 rounded-md bg-[#f5b400] px-6 py-3 text-sm font-extrabold text-[#082b55] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Apply For Admission
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10"
              >
                Contact School
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
