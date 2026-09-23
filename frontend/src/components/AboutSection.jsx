import { useEffect, useState } from "react";
import { Award, Eye, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicAbout } from "../services/publicApi";

const defaultAbout = {
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
};

const AboutSection = () => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    getPublicAbout().then((data) => {
      if (data) setAbout(data);
    });
  }, []);

  const highlights = [
    {
      title: about.mission?.title || "Our Mission",
      description: about.mission?.description || defaultAbout.mission.description,
      icon: Target,
    },
    {
      title: about.vision?.title || "Our Vision",
      description: about.vision?.description || defaultAbout.vision.description,
      icon: Eye,
    },
    {
      title: about.values?.title || "Our Values",
      description: about.values?.description || defaultAbout.values.description,
      icon: Award,
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">

          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Decorative background shape */}
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-2xl bg-[#fff5d6] sm:-bottom-6 sm:-left-6" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_20px_55px_rgba(8,43,85,0.12)]">
              <img
                src={about.image || "/images/about.png"}
                alt="The Kaizen School Bhana campus"
                className="h-[300px] w-full rounded-xl object-cover sm:h-[390px] lg:h-[440px] xl:h-[470px]"
              />
            </div>

            {/* Experience / Trust Badge */}
            <div className="absolute -bottom-5 right-4 rounded-xl bg-[#082b55] px-5 py-4 text-white shadow-xl sm:right-8 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#f5b400]">
                {about.promiseTitle || "Our Promise"}
              </p>

              <p className="mt-1 text-sm font-extrabold sm:text-base">
                {about.promiseText || "Learning With Purpose"}
              </p>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-base">
                {about.eyebrow || "About Us"}
              </span>

              <span className="h-[2px] w-12 bg-[#f5b400]" />
            </div>

            {/* Heading */}
            <h2 className="mt-3 text-3xl font-black leading-[1.12] text-[#082b55] sm:text-4xl lg:text-5xl">
              {about.title || "Building Futures,"}
              {about.titleHighlight && (
                <span className="block text-[#f2ad00]">
                  {about.titleHighlight || "Creating Leaders"}
                </span>
              )}
            </h2>

            {/* Paragraph 1 */}
            {about.description1 && (
              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {about.description1}
              </p>
            )}

            {/* Paragraph 2 */}
            {about.description2 && (
              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                {about.description2}
              </p>
            )}

            {/* Mission / Vision / Values */}
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#f5b400]/40 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4cf] text-[#d99d00] transition-all duration-300 group-hover:bg-[#082b55] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-3.5 text-base font-black text-[#082b55] sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold leading-6 text-slate-600 sm:text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Read More */}
            <div className="mt-7">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-md bg-[#082b55] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5b400] hover:text-[#082b55] hover:shadow-lg"
              >
                Read More

                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;