import { useState, useEffect } from "react";
import { Save, Sparkles, BookOpen, GraduationCap, Trophy, Baby, Library } from "lucide-react";
import ImageUploadPreview from "../../components/admin/ImageUploadPreview";
import { updateAdminData } from "../../services/adminApi";

const defaultStages = [
  {
    slug: "pre-primary",
    number: "01",
    title: "Pre-Primary",
    subtitle: "Early Years Education",
    highlightedText: "Learning",
    description: "Building curiosity and creativity through joyful, play-based learning.",
    heroDescription: "A gentle and joyful introduction to learning where young children explore, play, build confidence and develop essential early life skills.",
    overviewTitle: "A Joyful Start to Learning",
    overviewDescription1: "Our Pre-Primary program is designed to give children a warm, safe and stimulating environment where learning happens naturally through play, discovery and social interaction.",
    overviewDescription2: "We focus on building strong foundational skills in communication, language, motor coordination and emotional development while nurturing curiosity and enthusiasm.",
    image: "/images/hero-school.png",
    badgeTitle: "Early Childhood",
    badgeText: "Joyful Learning",
    iconName: "Baby",
    order: 1,
  },
  {
    slug: "primary",
    number: "02",
    title: "Primary",
    subtitle: "Foundational Education",
    highlightedText: "Foundations",
    description: "Strong foundations in basics with a focus on concepts and confidence.",
    heroDescription: "Building fundamental academic concepts, language proficiency, logical thinking and positive learning habits in a supportive environment.",
    overviewTitle: "Building Strong Concepts & Confidence",
    overviewDescription1: "Primary education at The Kaizen School focuses on creating a strong foundation in core subjects while helping students develop reading comprehension, mathematical thinking and creative problem-solving.",
    overviewDescription2: "Teachers use interactive teaching methods, visual aids and practical activities to make learning meaningful, encouraging students to ask questions and express their ideas clearly.",
    image: "/images/about.png",
    badgeTitle: "Class 1st to 5th",
    badgeText: "Concept Building",
    iconName: "BookOpen",
    order: 2,
  },
  {
    slug: "middle-school",
    number: "03",
    title: "Middle School",
    subtitle: "Intermediate Education",
    highlightedText: "Exploration",
    description: "Encouraging critical thinking, exploration and practical understanding.",
    heroDescription: "Developing analytical skills, subject depth, independent inquiry and team collaboration as students transition into higher academic levels.",
    overviewTitle: "Encouraging Curiosity & Inquiry",
    overviewDescription1: "Middle School is a vital stage where students begin to explore subjects in greater depth, develop critical thinking skills and apply their knowledge to practical real-world situations.",
    overviewDescription2: "We encourage independent study habits, project work, co-curricular participation and teamwork to build well-rounded, confident learners.",
    image: "/images/hero-school.png",
    badgeTitle: "Class 6th to 8th",
    badgeText: "Critical Thinking",
    iconName: "Library",
    order: 3,
  },
  {
    slug: "secondary",
    number: "04",
    title: "Secondary",
    subtitle: "High School Education",
    highlightedText: "Excellence",
    description: "Preparing students for challenges with strong academic guidance.",
    heroDescription: "Rigorous academic preparation, conceptual clarity, exam strategies and personal mentoring for board examinations and competitive goals.",
    overviewTitle: "Academic Discipline & Guidance",
    overviewDescription1: "Secondary education prepares students for board examinations with focused subject mastery, structured revision, regular practice tests and individual academic support.",
    overviewDescription2: "Along with academic rigor, we focus on time management, discipline, analytical reasoning and career awareness.",
    image: "/images/about.png",
    badgeTitle: "Class 9th & 10th",
    badgeText: "Board Preparation",
    iconName: "GraduationCap",
    order: 4,
  },
  {
    slug: "senior-secondary",
    number: "05",
    title: "Senior Secondary",
    subtitle: "Senior School Education",
    highlightedText: "Specialization",
    description: "Guiding students towards their goals and a successful future.",
    heroDescription: "Specialized stream guidance in Science, Commerce and Arts with expert instruction, practical labs and career mentoring.",
    overviewTitle: "Stream Specialization & Career Readiness",
    overviewDescription1: "Senior Secondary education offers specialized study streams designed to help students excel in board examinations, national entrance exams and higher education admissions.",
    overviewDescription2: "With experienced mentors, modern lab facilities and targeted guidance, we empower students to achieve their career dreams.",
    image: "/images/hero-school.png",
    badgeTitle: "Class 11th & 12th",
    badgeText: "Career Mentorship",
    iconName: "Trophy",
    order: 5,
  },
];

const AcademicsPageAdmin = ({ items = [], token, onRefresh, showNotification }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [stages, setStages] = useState(defaultStages);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      // Merge backend items with defaultStages structure
      const merged = defaultStages.map((def) => {
        const found = items.find(
          (it) =>
            (it.slug && it.slug === def.slug) ||
            it.title?.toLowerCase() === def.title.toLowerCase() ||
            it.number === def.number
        );
        if (found) {
          return {
            ...def,
            ...found,
            skillsStr: found.skills ? found.skills.join("\n") : "",
          };
        }
        return def;
      });
      setStages(merged);
    }
  }, [items]);

  const currentStage = stages[activeStageIndex] || stages[0];

  const handleFieldChange = (field, value) => {
    const copy = [...stages];
    copy[activeStageIndex] = {
      ...copy[activeStageIndex],
      [field]: value,
    };
    setStages(copy);
  };

  const handleSaveStage = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const stageToSave = stages[activeStageIndex];
      const payload = {
        slug: stageToSave.slug || stageToSave.title.toLowerCase().replace(/\s+/g, "-"),
        number: stageToSave.number,
        title: stageToSave.title,
        subtitle: stageToSave.subtitle,
        highlightedText: stageToSave.highlightedText,
        description: stageToSave.description,
        heroDescription: stageToSave.heroDescription,
        overviewTitle: stageToSave.overviewTitle,
        overviewDescription1: stageToSave.overviewDescription1,
        overviewDescription2: stageToSave.overviewDescription2,
        image: stageToSave.image,
        badgeTitle: stageToSave.badgeTitle,
        badgeText: stageToSave.badgeText,
        iconName: stageToSave.iconName,
        skills: stageToSave.skillsStr
          ? stageToSave.skillsStr.split("\n").map((s) => s.trim()).filter(Boolean)
          : stageToSave.skills || [],
        order: stageToSave.order || activeStageIndex + 1,
        isActive: true,
      };

      if (stageToSave._id) {
        await updateAdminData(`academics/${stageToSave._id}`, "PUT", payload, token);
      } else {
        await updateAdminData("academics", "POST", payload, token);
      }

      showNotification(`Academic Stage "${stageToSave.title}" saved successfully!`);
      onRefresh();
    } catch (err) {
      alert(err.message || "Failed to save academic stage");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-bold text-amber-700 border border-amber-500/20">
              <Sparkles size={12} />
              Academics Pages Manager
            </span>
            <h3 className="mt-2 text-xl font-black text-slate-900">
              Manage 5 Academic Dropdown Pages
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Select any of the 5 academic levels below to edit its complete live page content.
            </p>
          </div>
        </div>

        {/* Academic Stage Selector Tabs */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5 border-t border-slate-100 pt-5">
          {stages.map((stg, idx) => (
            <button
              key={stg.slug || idx}
              onClick={() => setActiveStageIndex(idx)}
              className={`flex flex-col items-center justify-center rounded-xl p-3.5 border transition text-center ${
                activeStageIndex === idx
                  ? "border-amber-500 bg-slate-950 text-white shadow-md"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
              }`}
            >
              <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full mb-1 ${
                activeStageIndex === idx ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-700"
              }`}>
                Stage {stg.number}
              </span>
              <span className="text-xs font-bold truncate max-w-full">
                {stg.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Stage Editor Form */}
      {currentStage && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h4 className="text-lg font-black text-slate-900">
                Editing Page: {currentStage.title} ({currentStage.number})
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                URL Route: /academics/{currentStage.slug || currentStage.title.toLowerCase()}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-extrabold">
              Active Dropdown Page
            </span>
          </div>

          <form onSubmit={handleSaveStage} className="space-y-6 max-w-4xl">
            {/* 1. HERO HEADER SECTION */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">
                1. Page Hero Banner Section
              </h5>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Stage Number
                  </label>
                  <input
                    type="text"
                    value={currentStage.number || ""}
                    onChange={(e) => handleFieldChange("number", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Stage Title
                  </label>
                  <input
                    type="text"
                    value={currentStage.title || ""}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Subtitle Label
                  </label>
                  <input
                    type="text"
                    value={currentStage.subtitle || ""}
                    onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Highlighted Title Text (Yellow)
                  </label>
                  <input
                    type="text"
                    value={currentStage.highlightedText || ""}
                    onChange={(e) => handleFieldChange("highlightedText", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Icon Name (Baby, BookOpen, Library, GraduationCap, Trophy)
                  </label>
                  <input
                    type="text"
                    value={currentStage.iconName || "BookOpen"}
                    onChange={(e) => handleFieldChange("iconName", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Hero Subtext Description
                </label>
                <textarea
                  rows="2"
                  value={currentStage.heroDescription || currentStage.description || ""}
                  onChange={(e) => handleFieldChange("heroDescription", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>
            </div>

            {/* 2. OVERVIEW & IMAGE SECTION */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">
                2. Overview & Classroom Photo
              </h5>
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Overview Section Heading
                </label>
                <input
                  type="text"
                  value={currentStage.overviewTitle || ""}
                  onChange={(e) => handleFieldChange("overviewTitle", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <ImageUploadPreview
                label={`${currentStage.title} Classroom Photo`}
                value={currentStage.image || ""}
                onChange={(val) => handleFieldChange("image", val)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Overview Paragraph 1
                </label>
                <textarea
                  rows="3"
                  value={currentStage.overviewDescription1 || ""}
                  onChange={(e) => handleFieldChange("overviewDescription1", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Overview Paragraph 2
                </label>
                <textarea
                  rows="3"
                  value={currentStage.overviewDescription2 || ""}
                  onChange={(e) => handleFieldChange("overviewDescription2", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Badge Title (e.g. Our Motto / Play & Discover)
                  </label>
                  <input
                    type="text"
                    value={currentStage.badgeTitle || ""}
                    onChange={(e) => handleFieldChange("badgeTitle", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Badge Text (e.g. Read • Lead • Succeed)
                  </label>
                  <input
                    type="text"
                    value={currentStage.badgeText || ""}
                    onChange={(e) => handleFieldChange("badgeText", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 3. KEY SKILLS / FOCUS AREAS CHECKLIST */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">
                3. Key Skills & Focus Areas Checklist (One per line)
              </h5>
              <div>
                <textarea
                  rows="5"
                  value={currentStage.skillsStr || (currentStage.skills ? currentStage.skills.join("\n") : "")}
                  onChange={(e) => handleFieldChange("skillsStr", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono bg-white"
                  placeholder="Communication and vocabulary development&#10;Early reading and writing readiness..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-slate-800 shadow-md"
            >
              <Save size={15} />
              {saving
                ? `Saving ${currentStage.title}...`
                : `Save ${currentStage.title} Page`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AcademicsPageAdmin;
