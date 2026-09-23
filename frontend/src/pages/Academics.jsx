import { useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  GraduationCap,
  Library,
  Lightbulb,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicAcademics } from "../services/publicApi";

const iconMap = {
  Baby,
  BookOpen,
  Library,
  GraduationCap,
  Trophy,
};

const defaultAcademicStages = [
  {
    number: "01",
    title: "Pre-Primary",
    iconName: "Baby",
    description:
      "The early years focus on curiosity, creativity and joyful discovery. Children learn through stories, activities, play and meaningful experiences.",
    points: [
      "Play-based learning",
      "Language development",
      "Creative activities",
      "Social & emotional growth",
    ],
  },
  {
    number: "02",
    title: "Primary School",
    iconName: "BookOpen",
    description:
      "Students develop strong foundations in core subjects while learning to communicate, collaborate and think independently.",
    points: [
      "Strong academic foundations",
      "Concept-based learning",
      "Communication skills",
      "Confidence building",
    ],
  },
  {
    number: "03",
    title: "Middle School",
    iconName: "Library",
    description:
      "Learning becomes more exploratory and analytical, encouraging students to question, investigate and understand concepts deeply.",
    points: [
      "Critical thinking",
      "Practical understanding",
      "Research & exploration",
      "Collaborative learning",
    ],
  },
  {
    number: "04",
    title: "Secondary School",
    iconName: "GraduationCap",
    description:
      "Students receive focused academic guidance while developing discipline, problem-solving abilities and preparation for future goals.",
    points: [
      "Focused academics",
      "Exam preparation",
      "Problem solving",
      "Career awareness",
    ],
  },
  {
    number: "05",
    title: "Senior Secondary",
    iconName: "Trophy",
    description:
      "Senior students are guided towards academic excellence, responsible decision-making and preparation for higher education and careers.",
    points: [
      "Advanced subject learning",
      "Goal-oriented preparation",
      "Leadership development",
      "Higher education guidance",
    ],
  },
];

const Academics = () => {
  const [academicStages, setAcademicStages] = useState(defaultAcademicStages);

  useEffect(() => {
    getPublicAcademics().then((data) => {
      if (data && data.length > 0) {
        setAcademicStages(data);
      }
    });
  }, []);

  const learningPoints = [
    {
      title: "Concept-Based Learning",
      description:
        "We focus on understanding concepts rather than simply memorising information.",
      icon: Brain,
    },
    {
      title: "Experienced Guidance",
      description:
        "Teachers provide individual attention and encourage students to learn with confidence.",
      icon: Users,
    },
    {
      title: "Beyond Academics",
      description:
        "Sports, arts, activities and life skills complement classroom learning.",
      icon: Trophy,
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
                  Our Academics
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Nurturing Every Stage
                <span className="block text-[#f5b400]">of Learning</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                A thoughtfully designed academic journey that helps students
                build strong foundations, develop independent thinking and
                prepare confidently for the future.
              </p>

              <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/60">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b400]">Academics</span>
              </div>
            </motion.div>

            {/* Decorative Academic Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <div className="relative mr-4 h-[300px] w-[360px] xl:mr-10 xl:w-[430px]">
                <div className="absolute right-0 top-0 h-full w-[88%] rounded-[45%_0_0_45%] bg-white/5" />

                <div className="absolute bottom-6 right-8 flex h-32 w-32 items-center justify-center rounded-full border border-[#f5b400]/30 bg-[#f5b400]/10">
                  <GraduationCap
                    size={65}
                    strokeWidth={1.2}
                    className="text-[#f5b400]"
                  />
                </div>

                <div className="absolute left-2 top-10 rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5b400]">
                    Learn
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    Think • Explore
                  </p>
                </div>

                <div className="absolute bottom-5 left-10 rounded-xl bg-white px-5 py-4 shadow-xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Our Motto
                  </p>
                  <p className="mt-1 text-sm font-black text-[#082b55]">
                    Read • Lead • Succeed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACADEMIC PHILOSOPHY
      ====================================================== */}
      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
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
                  src="/images/about.png"
                  alt="Academic learning at The Kaizen School"
                  className="h-[320px] w-full rounded-xl object-cover sm:h-[410px] lg:h-[450px]"
                />
              </div>

              <div className="absolute bottom-5 right-4 flex items-center gap-3 rounded-xl bg-[#082b55] px-5 py-4 text-white shadow-xl sm:right-8">
                <GraduationCap size={25} className="text-[#f5b400]" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">
                    Education
                  </p>
                  <p className="text-sm font-extrabold sm:text-base">
                    Learn With Purpose
                  </p>
                </div>
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
                  Our Philosophy
                </span>
                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
                Education That
                <span className="block text-[#f2ad00]">Inspires Growth</span>
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                At The Kaizen School Bhana, we believe that every child has
                unique strengths, interests and potential. Our academic
                environment is designed to help students discover those
                strengths while developing a strong foundation of knowledge.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                Learning is encouraged through discussion, exploration,
                practical experiences and meaningful classroom activities.
                Students are guided to understand what they learn and apply it
                confidently in real-life situations.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Strong academic foundations",
                  "Individual attention",
                  "Practical learning experiences",
                  "Continuous student development",
                ].map((item) => (
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
          ACADEMIC STAGES (DYNAMIC FROM BACKEND)
      ====================================================== */}
      <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                Academic Journey
              </span>
              <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl lg:text-[42px]">
              Learning For Every Age
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Our structured academic journey grows with every child, from
              early learning to senior secondary education.
            </p>
          </div>

          {/* Stage Cards */}
          <div className="space-y-5">
            {academicStages.map((stage, index) => {
              const Icon = iconMap[stage.iconName] || BookOpen;

              return (
                <motion.div
                  key={stage._id || stage.title || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(8,43,85,0.09)]"
                >
                  <div className="grid lg:grid-cols-[110px_1fr_1.2fr]">
                    {/* Number */}
                    <div className="flex items-center justify-center bg-[#082b55] px-5 py-6 lg:py-8">
                      <span className="text-3xl font-black text-[#f5b400]">
                        {stage.number || `0${index + 1}`}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-4 px-6 py-6 sm:px-8 lg:py-8">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fff4d0] text-[#d99d00] transition-all duration-300 group-hover:bg-[#082b55] group-hover:text-[#f5b400]">
                        <Icon size={27} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">
                          Academic Stage
                        </p>
                        <h3 className="mt-1 text-xl font-black text-[#082b55] sm:text-2xl">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description + Points */}
                    <div className="border-t border-slate-100 px-6 py-6 sm:px-8 lg:border-l lg:border-t-0 lg:py-8">
                      <p className="text-base leading-7 text-slate-600 font-medium">
                        {stage.description}
                      </p>

                      {stage.points && stage.points.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {stage.points.map((point) => (
                            <span
                              key={point}
                              className="flex items-center gap-1.5 text-xs font-bold text-[#082b55] sm:text-sm"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b400]" />
                              {point}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          LEARNING APPROACH
      ====================================================== */}
      <section className="bg-white py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                How We Learn
              </span>
              <span className="h-[2px] w-12 bg-[#f5b400]" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl">
              A Complete Learning Experience
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learningPoints.map((item, index) => {
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
                  className="group rounded-2xl border border-slate-100 bg-[#fafbfc] p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_18px_40px_rgba(8,43,85,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082b55] text-[#f5b400] transition-all duration-300 group-hover:bg-[#f5b400] group-hover:text-[#082b55]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#082b55]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#082b55] px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[45px] border-[#f5b400]/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                  Start The Journey
                </p>

                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  Help Your Child Learn,
                  <span className="text-[#f5b400]"> Grow & Succeed</span>
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                  Discover an academic environment designed to build
                  knowledge, confidence and character.
                </p>
              </div>

              <Link
                to="/admissions"
                className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[#f5b400] px-6 py-3.5 text-sm font-extrabold text-[#082b55] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Admissions
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Academics;