import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Bus,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  FlaskConical,
  Library,
  Monitor,
  School,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicFacilities } from "../services/publicApi";

const iconMap = {
  Monitor,
  FlaskConical,
  Library,
  Dumbbell,
  Bus,
  Building2,
  BookOpen,
  School,
};

const defaultFacilities = [
  {
    title: "Smart Classrooms",
    description:
      "Modern classrooms designed to create an engaging, comfortable and interactive learning environment for students.",
    iconName: "Monitor",
    image: "/images/facilities/classroom.png",
  },
  {
    title: "Science Laboratory",
    description:
      "Well-equipped learning spaces where students can understand scientific concepts through practical exploration.",
    iconName: "FlaskConical",
    image: "/images/facilities/science-lab.png",
  },
  {
    title: "Computer Lab",
    description:
      "A dedicated technology learning environment that helps students develop digital skills and computer awareness.",
    iconName: "Monitor",
    image: "/images/facilities/computer-lab.png",
  },
  {
    title: "Library",
    description:
      "A welcoming reading space that encourages students to explore books, develop reading habits and discover new ideas.",
    iconName: "Library",
    image: "/images/facilities/library.png",
  },
  {
    title: "Sports Facilities",
    description:
      "Opportunities for physical activity, sports and teamwork that support healthy development and confidence.",
    iconName: "Dumbbell",
    image: "/images/facilities/sports.png",
  },
  {
    title: "School Transport",
    description:
      "School transportation support designed to make daily travel convenient and comfortable for students.",
    iconName: "Bus",
    image: "/images/facilities/transport.png",
  },
];

const defaultPageInfo = {
  heroEyebrow: "Our Facilities",
  heroTitle: "Modern Infrastructure",
  heroTitleHighlight: "For Better Learning",
  heroDescription:
    "Explore our well-equipped classrooms, science and computer labs, library, sports grounds, and safe transportation facilities.",
  overviewEyebrow: "Our Campus",
  overviewTitle: "Spaces That Support",
  overviewTitleHighlight: "Every Kind of Learning",
  overviewDescription:
    "A good school environment plays an important role in a student's development. Our facilities are designed to support classroom learning while also giving students opportunities to experiment, create, play and explore.",
  overviewImage: "/images/about.png",
  overviewBadgeText: "Learn With Confidence",
  campusFeatures: [
    "Modern learning spaces",
    "Practical learning facilities",
    "Dedicated sports opportunities",
    "Reading & resource areas",
    "Technology-enabled education",
    "Student-friendly environment",
  ],
};

const Facilities = () => {
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);

  useEffect(() => {
    getPublicFacilities().then((res) => {
      if (res) {
        if (res.facilities && res.facilities.length > 0) setFacilities(res.facilities);
        if (res.pageInfo) setPageInfo(res.pageInfo);
      }
    });
  }, []);

  const campusFeatures = pageInfo.campusFeatures?.length
    ? pageInfo.campusFeatures
    : defaultPageInfo.campusFeatures;

  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================
          PAGE HERO (DYNAMIC)
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
                  {pageInfo.heroEyebrow || "Our Facilities"}
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {pageInfo.heroTitle || "Modern Infrastructure"}
                <span className="block text-[#f5b400]">
                  {pageInfo.heroTitleHighlight || "For Better Learning"}
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                {pageInfo.heroDescription}
              </p>

              <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/60">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b400]">Facilities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAMPUS OVERVIEW (DYNAMIC)
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
                  src={pageInfo.overviewImage || "/images/about.png"}
                  alt="The Kaizen School campus"
                  className="h-[320px] w-full rounded-xl object-cover sm:h-[420px] lg:h-[470px]"
                />
              </div>

              <div className="absolute bottom-5 right-4 rounded-xl bg-[#082b55] px-5 py-4 text-white shadow-xl sm:right-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5b400]">
                  {pageInfo.overviewEyebrow || "Our Campus"}
                </p>

                <p className="mt-1 text-sm font-black sm:text-base">
                  {pageInfo.overviewBadgeText || "Learn With Confidence"}
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
                  {pageInfo.overviewEyebrow || "Our Campus"}
                </span>

                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
                {pageInfo.overviewTitle || "Spaces That Support"}
                <span className="block text-[#f2ad00]">
                  {pageInfo.overviewTitleHighlight || "Every Kind of Learning"}
                </span>
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                {pageInfo.overviewDescription}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {campusFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm font-semibold text-[#082b55] sm:text-base"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#f5b400]"
                    />

                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FACILITIES GRID (DYNAMIC FROM BACKEND)
      ====================================================== */}
      <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                Explore Our Facilities
              </span>

              <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl lg:text-[42px]">
              Everything Students Need To Grow
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Purposeful spaces and resources that make learning more
              engaging, practical and enjoyable.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => {
              const Icon = iconMap[facility.iconName] || Building2;

              return (
                <motion.article
                  key={facility._id || facility.title || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(8,43,85,0.11)]"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-[#eaf0f6]">
                    {facility.image && (
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#082b55]/70 via-transparent to-transparent opacity-70" />

                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#082b55] shadow-lg transition-all duration-300 group-hover:bg-[#f5b400]">
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-[#082b55]">
                      {facility.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 font-medium">
                      {facility.description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-sm font-extrabold text-[#082b55] transition-colors group-hover:text-[#d99d00]">
                      Explore Facility
                      <ChevronRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>

                  <div className="h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-4 pb-8 pt-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#082b55] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[45px] border-[#f5b400]/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                    Discover Kaizen
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  Come & Experience Our
                  <span className="text-[#f5b400]"> Learning Environment</span>
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                  Get in touch with our school team to learn more about our
                  campus, facilities and admission opportunities.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[#f5b400] px-6 py-3.5 text-sm font-extrabold text-[#082b55] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Contact School
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

export default Facilities;