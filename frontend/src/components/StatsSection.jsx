import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Presentation,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { getPublicHero, getPublicSettings } from "../services/publicApi";

const iconMap = {
  GraduationCap,
  Users,
  Presentation,
  Trophy,
};

const defaultStats = [
  {
    value: "207+",
    label: "Students",
    iconName: "GraduationCap",
  },
  {
    value: "785+",
    label: "Parents' Trust",
    iconName: "Users",
  },
  {
    value: "8+",
    label: "Expert Teachers",
    iconName: "Presentation",
  },
  {
    value: "Read • Lead • Succeed",
    secondValue: "",
    label: "Our Motto",
    iconName: "Trophy",
  },
];

const StatsSection = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    Promise.all([getPublicHero(), getPublicSettings()]).then(
      ([heroData, settingsData]) => {
        if (heroData && heroData.stats && heroData.stats.length > 0) {
          setStats(heroData.stats);
        } else if (settingsData && settingsData.motto) {
          setStats((prev) =>
            prev.map((s) =>
              s.label === "Our Motto"
                ? { ...s, value: settingsData.motto, secondValue: "" }
                : s
            )
          );
        }
      }
    );
  }, []);

  const getBorderClass = (index, total) => {
    const isTopRowMobile = index < 2;
    const isLeftColumnMobile = index % 2 === 0;
    const isNotLastDesktop = index < total - 1;

    return [
      isTopRowMobile ? "border-b border-white/10 lg:border-b-0" : "",
      isLeftColumnMobile ? "border-r border-white/10" : "border-r-0",
      isNotLastDesktop ? "lg:border-r lg:border-white/10" : "lg:border-r-0",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const renderStatValue = (stat) => {
    const value = (stat.value || "").trim();
    const secondValue = (stat.secondValue || "").trim();

    // Deduplicate secondValue if value already contains it (case-insensitive)
    let fullValue = value;
    if (
      secondValue &&
      !value.toLowerCase().includes(secondValue.toLowerCase())
    ) {
      if (value.includes("•")) {
        fullValue = `${value} • ${secondValue}`;
      } else {
        fullValue = `${value} ${secondValue}`;
      }
    }

    // Check if stat is motto or text-heavy
    const isTextStat =
      stat.label?.toLowerCase().includes("motto") ||
      (/[a-zA-Z]/.test(value) && value.length > 5);

    if (isTextStat) {
      // Split bullet points or linebreaks cleanly
      let parts = fullValue
        .split(/[•\n]+/)
        .map((p) => p.trim())
        .filter(Boolean);

      // If no bullets were found, split words if 2-4 words long
      if (parts.length === 1) {
        const words = fullValue.split(/\s+/).filter(Boolean);
        if (words.length >= 2 && words.length <= 4) {
          parts = words;
        }
      }

      if (parts.length > 1) {
        return (
          <div className="flex flex-col text-xs xs:text-sm sm:text-base font-extrabold text-amber-400 leading-snug">
            {parts.map((part, i) => (
              <span key={i} className="whitespace-nowrap">
                {part}
              </span>
            ))}
          </div>
        );
      }

      return (
        <div className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-amber-400 leading-tight break-words">
          {fullValue}
        </div>
      );
    }

    return (
      <div className="text-xl xs:text-2xl sm:text-3xl font-black leading-tight text-white tracking-tight">
        {value}
        {secondValue &&
          !value.toLowerCase().includes(secondValue.toLowerCase()) && (
            <span className="block text-amber-400">{secondValue}</span>
          )}
      </div>
    );
  };

  return (
    <section className="px-3 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-2xl bg-[#082b55] shadow-[0_15px_40px_rgba(8,43,85,0.16)]">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full border-[35px] border-[#f5b400]/5" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.iconName] || Trophy;

              return (
                <motion.div
                  key={stat.label || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className={`group flex items-center gap-2.5 xs:gap-3.5 sm:gap-4 px-3 py-5 xs:px-4 xs:py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 ${getBorderClass(
                    index,
                    stats.length
                  )}`}
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 min-w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#f5b400]/30 bg-[#f5b400]/10 text-[#f5b400] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#f5b400] group-hover:text-[#082b55]">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    {renderStatValue(stat)}

                    <p className="mt-1 text-[10px] xs:text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;