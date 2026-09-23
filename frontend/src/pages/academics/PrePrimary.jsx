import { useEffect, useState } from "react";
import {
  Baby,
  BookOpen,
  Palette,
  Music,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAcademics } from "../../services/publicApi";

const defaultStage = {
  slug: "pre-primary",
  number: "01",
  title: "Pre-Primary",
  subtitle: "Early Years Education",
  highlightedText: "Learning",
  description: "Building curiosity and creativity through joyful, play-based learning.",
  heroDescription:
    "A gentle and joyful introduction to learning where young children explore, play, build confidence and develop essential early life skills.",
  overviewTitle: "Where Curiosity Becomes Learning",
  overviewDescription1:
    "The early years are an important stage in a child's development. Our Pre-Primary learning environment focuses on helping children feel safe, confident and excited to discover the world around them.",
  overviewDescription2:
    "Through age-appropriate activities and guided experiences, children develop foundational skills while enjoying the process of learning.",
  image: "/images/hero-school.png",
  badgeTitle: "Early Childhood",
  badgeText: "Joyful Learning",
  skills: [
    "Communication and vocabulary development",
    "Early reading and writing readiness",
    "Number sense and basic mathematical thinking",
    "Fine and gross motor development",
    "Creative thinking and self-expression",
    "Social and emotional development",
    "Independence and classroom readiness",
    "Curiosity, observation and exploration",
  ],
  features: [
    {
      title: "Early Literacy",
      description:
        "Children are introduced to letters, sounds, vocabulary and early reading through engaging activities.",
      iconName: "BookOpen",
    },
    {
      title: "Creative Expression",
      description:
        "Art, colouring, craft and creative activities help children express ideas and develop imagination.",
      iconName: "Palette",
    },
    {
      title: "Music & Movement",
      description:
        "Songs, rhythm, movement and playful activities encourage confidence, coordination and joyful learning.",
      iconName: "Music",
    },
    {
      title: "Social Development",
      description:
        "Children learn sharing, communication, cooperation and respectful interaction in a supportive environment.",
      iconName: "Users",
    },
  ],
  approachPillars: [
    {
      number: "01",
      title: "Explore",
      description:
        "Children discover new concepts through observation, play and hands-on experiences.",
    },
    {
      number: "02",
      title: "Engage",
      description:
        "Interactive activities encourage children to participate, ask questions and express themselves.",
    },
    {
      number: "03",
      title: "Learn",
      description:
        "Age-appropriate learning experiences build strong foundations across different developmental areas.",
    },
    {
      number: "04",
      title: "Grow",
      description:
        "Children gradually develop confidence, independence and readiness for their next stage of learning.",
    },
  ],
};

const iconMap = {
  BookOpen,
  Palette,
  Music,
  Users,
  Baby,
};

const PrePrimary = () => {
  const [stage, setStage] = useState(defaultStage);

  useEffect(() => {
    getPublicAcademics().then((data) => {
      if (data && data.length > 0) {
        const found = data.find(
          (item) =>
            item.slug === "pre-primary" ||
            item.number === "01" ||
            item.title?.toLowerCase().includes("pre-primary")
        );
        if (found) {
          setStage({
            ...defaultStage,
            ...found,
            skills:
              found.skills && found.skills.length > 0
                ? found.skills
                : defaultStage.skills,
            features:
              found.features && found.features.length > 0
                ? found.features
                : defaultStage.features,
            approachPillars:
              found.approachPillars && found.approachPillars.length > 0
                ? found.approachPillars
                : defaultStage.approachPillars,
          });
        }
      }
    });
  }, []);

  return (
    <div className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#f5b400]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-medium text-white/70">
              <Link to="/" className="transition hover:text-[#f5b400]">
                Home
              </Link>
              <span>/</span>
              <Link to="/academics" className="transition hover:text-[#f5b400]">
                Academics
              </Link>
              <span>/</span>
              <span className="text-[#f5b400]">{stage.title}</span>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#f5b400]">
              {stage.subtitle || "Early Years Education"}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {stage.title}
              <span className="block text-[#f5b400]">
                {stage.highlightedText || "Learning"}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              {stage.heroDescription || stage.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f5b400] px-7 py-3.5 font-bold text-[#082b55] transition hover:bg-[#e5a800]"
              >
                Apply For Admission
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Visit Our School
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW / INTRO SECTION WITH ORIGINAL CURVED BADGE CONTAINER */}
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                {stage.subtitle || "The Foundation Years"}
              </p>

              <h2 className="text-3xl font-bold leading-tight text-[#082b55] sm:text-4xl">
                {stage.overviewTitle || "Where Curiosity Becomes Learning"}
              </h2>

              {stage.overviewDescription1 && (
                <p className="mt-5 leading-8 text-slate-600">
                  {stage.overviewDescription1}
                </p>
              )}

              {stage.overviewDescription2 && (
                <p className="mt-4 leading-8 text-slate-600">
                  {stage.overviewDescription2}
                </p>
              )}

              {/* Checkmarks */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {stage.skills.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={19} className="shrink-0 text-[#f5b400]" />
                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card with Original Curved Wave Badge Styling */}
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-[#082b55] bg-[#082b55] shadow-2xl">
                <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden rounded-t-[2rem]">
                  <img
                    src={stage.image || "/images/hero-school.png"}
                    alt={stage.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Curved Yellow Accent Wave */}
                  <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-16 bg-[#082b55] rounded-t-[50%]" />
                </div>

                <div className="p-6 text-center text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400]">
                    {stage.badgeTitle || "CLASS PRE-PRIMARY"}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">
                    {stage.badgeText || "Joyful Learning"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING AREAS CARD GRID */}
      <section className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f5b400]">
              LEARNING AREAS
            </p>
            <h2 className="text-3xl font-bold text-[#082b55] sm:text-4xl">
              Learning Beyond The Classroom
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Interactive learning areas carefully structured for early childhood development.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stage.features.map((area, idx) => {
              const Icon = iconMap[area.iconName] || BookOpen;
              return (
                <div
                  key={area.title || idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#082b55] text-[#f5b400]">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#082b55]">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARNING APPROACH PILLARS */}
      <section className="bg-white px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f5b400]">
              Our Approach
            </p>
            <h2 className="text-3xl font-bold text-[#082b55] sm:text-4xl">
              A Step-By-Step Journey
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stage.approachPillars.map((pillar, idx) => (
              <div
                key={pillar.title || idx}
                className="relative rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:border-[#f5b400] hover:bg-white hover:shadow-lg"
              >
                <span className="text-2xl font-black text-[#f5b400]">
                  {pillar.number || `0${idx + 1}`}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[#082b55]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#082b55] p-10 text-center text-white shadow-xl lg:p-14">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Give Your Child A Stronger Future
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              Admissions open for Pre-Primary sessions. Connect with us to explore classroom facilities.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/admissions"
                className="rounded-xl bg-[#f5b400] px-7 py-3.5 font-bold text-[#082b55] transition hover:bg-white"
              >
                Apply Online
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-white/30 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrePrimary;