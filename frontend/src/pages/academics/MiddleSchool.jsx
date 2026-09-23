import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Library,
  Brain,
  Compass,
  Sparkles,
  FlaskConical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAcademics } from "../../services/publicApi";

const defaultStage = {
  slug: "middle-school",
  number: "03",
  title: "Middle School",
  subtitle: "Intermediate Education",
  highlightedText: "Exploration",
  description: "Encouraging critical thinking, exploration and practical understanding.",
  heroDescription:
    "Developing analytical skills, subject depth, independent inquiry and team collaboration as students transition into higher academic levels.",
  overviewTitle: "Encouraging Curiosity & Inquiry",
  overviewDescription1:
    "Middle School is a vital stage where students begin to explore subjects in greater depth, develop critical thinking skills and apply their knowledge to practical real-world situations.",
  overviewDescription2:
    "We encourage independent study habits, project work, co-curricular participation and teamwork to build well-rounded, confident learners.",
  image: "/images/hero-school.png",
  badgeTitle: "CLASS 6TH TO 8TH",
  badgeText: "Critical Thinking",
  skills: [
    "Analytical & critical thinking abilities",
    "Scientific inquiry & laboratory experiments",
    "Advanced mathematical concepts",
    "Language proficiency & debate skills",
    "Project work & presentation skills",
    "Social responsibility & teamwork",
  ],
  features: [
    {
      title: "Scientific Inquiry",
      description: "Hands-on experiments in Science labs to foster curiosity and practical understanding.",
      iconName: "FlaskConical",
    },
    {
      title: "Analytical Mathematics",
      description: "Step-by-step problem solving, algebra and geometry fundamentals.",
      iconName: "Brain",
    },
    {
      title: "Language & Expression",
      description: "Debates, essay writing and literature analysis for effective communication.",
      iconName: "BookOpen",
    },
    {
      title: "Social Studies & History",
      description: "Understanding civics, geography, history and global awareness.",
      iconName: "Compass",
    },
  ],
};

const iconMap = {
  BookOpen,
  Brain,
  Compass,
  FlaskConical,
  Library,
};

const MiddleSchool = () => {
  const [stage, setStage] = useState(defaultStage);

  useEffect(() => {
    getPublicAcademics().then((data) => {
      if (data && data.length > 0) {
        const found = data.find(
          (item) =>
            item.slug === "middle-school" ||
            item.number === "03" ||
            item.title?.toLowerCase().includes("middle")
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
              {stage.subtitle || "Intermediate Education"}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {stage.title}
              <span className="block text-[#f5b400]">
                {stage.highlightedText || "Exploration"}
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
                {stage.subtitle || "CLASS 6TH TO 8TH"}
              </p>

              <h2 className="text-3xl font-bold leading-tight text-[#082b55] sm:text-4xl">
                {stage.overviewTitle || "Encouraging Curiosity & Inquiry"}
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

            {/* Right Curved Image Container Card */}
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
                    {stage.badgeTitle || "CLASS 6TH TO 8TH"}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">
                    {stage.badgeText || "Critical Thinking"}
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
              ACADEMIC FOCUS
            </p>
            <h2 className="text-3xl font-bold text-[#082b55] sm:text-4xl">
              Middle School Learning Pillars
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Deepening subject understanding and building analytical capabilities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stage.features.map((area, idx) => {
              const Icon = iconMap[area.iconName] || Library;
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
              Prepare For Higher Academic Challenges
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
              Admissions open for Middle School classes. Connect with our school team to know more.
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

export default MiddleSchool;