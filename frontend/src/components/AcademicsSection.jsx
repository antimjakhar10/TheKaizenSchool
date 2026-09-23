import { useEffect, useState } from "react";
import {
  Baby,
  BookOpen,
  Library,
  GraduationCap,
  Trophy,
  ArrowRight,
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

const defaultAcademicLevels = [
  {
    title: "Pre-Primary",
    description: "Building curiosity and creativity through joyful, play-based learning.",
    iconName: "Baby",
    number: "01",
  },
  {
    title: "Primary",
    description: "Strong foundations in basics with a focus on concepts and confidence.",
    iconName: "BookOpen",
    number: "02",
  },
  {
    title: "Middle School",
    description: "Encouraging critical thinking, exploration and practical understanding.",
    iconName: "Library",
    number: "03",
  },
  {
    title: "Secondary",
    description: "Preparing students for challenges with strong academic guidance.",
    iconName: "GraduationCap",
    number: "04",
  },
  {
    title: "Senior Secondary",
    description: "Guiding students towards their goals and a successful future.",
    iconName: "Trophy",
    number: "05",
  },
];

const AcademicsSection = () => {
  const [academicLevels, setAcademicLevels] = useState(defaultAcademicLevels);

  useEffect(() => {
    getPublicAcademics().then((data) => {
      if (data && data.length > 0) {
        setAcademicLevels(data);
      }
    });
  }, []);

  return (
    <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-base">
              Academic Excellence
            </span>

            <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
          </div>

          <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl lg:text-5xl">
            Learning For Every Stage
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Structured academic programs designed to foster curiosity, independent thinking and conceptual understanding at every age.
          </p>
        </motion.div>

        {/* ================= ACADEMIC CARDS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {academicLevels.map((level, index) => {
            const Icon = iconMap[level.iconName] || BookOpen;

            return (
              <motion.div
                key={level.title || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#f5b400]/40 hover:shadow-[0_18px_40px_rgba(8,43,85,0.10)]"
              >
                {/* Number */}
                <span className="absolute right-4 top-3 text-4xl font-black text-slate-100 transition-colors duration-300 group-hover:text-[#fff0c2]">
                  {level.number || `0${index + 1}`}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff5d8] text-[#d99d00] transition-all duration-300 group-hover:bg-[#082b55] group-hover:text-[#f5b400]">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="relative mt-5 text-lg font-black text-[#082b55]">
                  {level.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 font-medium">
                  {level.description}
                </p>

                {/* Bottom Link */}
                <Link
                  to="/academics"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#082b55] transition-colors duration-300 hover:text-[#e2a500]"
                >
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AcademicsSection;