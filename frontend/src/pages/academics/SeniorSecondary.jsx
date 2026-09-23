import { useEffect, useState } from "react";
import {
  Trophy,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAcademics } from "../../services/publicApi";

const defaultStage = {
  slug: "senior-secondary",
  number: "05",
  title: "Senior Secondary",
  subtitle: "Senior School Education",
  highlightedText: "Specialization",
  description: "Guiding students towards their goals and a successful future.",
  heroDescription:
    "Specialized stream guidance in Science, Commerce and Arts with expert instruction, practical labs and career mentoring.",
  overviewTitle: "Stream Specialization & Career Readiness",
  overviewDescription1:
    "Senior Secondary education offers specialized study streams designed to help students excel in board examinations, national entrance exams and higher education admissions.",
  overviewDescription2:
    "With experienced mentors, modern lab facilities and targeted guidance, we empower students to achieve their career dreams.",
  image: "/images/hero-school.png",
  badgeTitle: "CLASS 11TH & 12TH",
  badgeText: "Career Mentorship",
  skills: [
    "Specialized stream preparation (Science / Commerce / Arts)",
    "Entrance examination coaching & career mentoring",
    "Practical lab work & research projects",
    "Higher education planning & university guidance",
    "Leadership, ethics & professional readiness",
    "Comprehensive board exam test series",
  ],
  features: [
    {
      title: "Science Stream (PCM / PCB)",
      description:
        "In-depth Physics, Chemistry, Math and Biology with competitive entrance test guidance.",
      iconName: "FlaskConical",
    },
    {
      title: "Commerce Stream",
      description:
        "Accountancy, Business Studies, Economics and Math tailored for professional careers.",
      iconName: "BarChart3",
    },
    {
      title: "Arts & Humanities",
      description:
        "Political Science, History, Sociology and Languages for administrative and academic paths.",
      iconName: "BookOpen",
    },
    {
      title: "Career Counseling",
      description:
        "One-on-one mentorship for university admissions, entrance exams, and career choices.",
      iconName: "Trophy",
    },
  ],
};

const iconMap = {
  FlaskConical,
  BarChart3,
  BookOpen,
  Trophy,
  GraduationCap,
};

const SeniorSecondary = () => {
  const [stage, setStage] = useState(defaultStage);

  useEffect(() => {
    getPublicAcademics().then((data) => {
      if (data && data.length > 0) {
        const found = data.find(
          (item) =>
            item.slug === "senior-secondary" ||
            item.number === "05" ||
            item.title?.toLowerCase().includes("senior")
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
              {stage.subtitle || "Senior School Education"}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {stage.title}
              <span className="block text-[#f5b400]">
                {stage.highlightedText || "Specialization"}
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
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                {stage.subtitle || "CLASS 11TH & 12TH"}
              </p>

              <h2 className="text-3xl font-bold leading-tight text-[#082b55] sm:text-4xl">
                {stage.overviewTitle || "Stream Specialization & Career Readiness"}
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

              {/* Checkmarks Grid */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {stage.skills.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={19} className="shrink-0 text-[#f5b400]" />
                    <span className="text-xs font-bold text-[#082b55] sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Curved Image Container Card (Matching Original Design) */}
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-[#082b55] bg-[#082b55] shadow-2xl">
                <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden rounded-t-[2rem]">
                  <img
                    src={stage.image || "/images/hero-school.png"}
                    alt={stage.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Curved Yellow Accent Line */}
                  <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-16 bg-[#082b55] rounded-t-[50%]" />
                </div>

                <div className="p-6 text-center text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400]">
                    {stage.badgeTitle || "CLASS 11TH & 12TH"}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">
                    {stage.badgeText || "Career Mentorship"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING AREAS / STREAMS GRID */}
      <section className="bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f5b400]">
              ACADEMIC STREAMS
            </p>
            <h2 className="text-3xl font-bold text-[#082b55] sm:text-4xl">
              Specialized Study Pathways
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Expert mentorship and modern facilities tailored for every academic stream.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stage.features.map((area, idx) => {
              const Icon = iconMap[area.iconName] || Trophy;
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

      {/* BOTTOM CTA */}
      <section className="px-6 pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#082b55] p-10 text-center text-white shadow-xl lg:p-14">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Shape Your Career & Higher Education Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              Admissions open for Senior Secondary streams. Connect with our counselors to select your stream.
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

export default SeniorSecondary;