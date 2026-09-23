import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import ImageUploadPreview from "../../components/admin/ImageUploadPreview";
import { updateAdminData } from "../../services/adminApi";

const AboutPageAdmin = ({ about, token, onSaved }) => {
  const [form, setForm] = useState({
    eyebrow: about?.eyebrow || "About Us",
    title: about?.title || "Building Futures,",
    titleHighlight: about?.titleHighlight || "Creating Leaders",
    description1: about?.description1 || "",
    description2: about?.description2 || "",
    image: about?.image || "/images/about.png",
    promiseTitle: about?.promiseTitle || "Our Promise",
    promiseText: about?.promiseText || "Learning With Purpose",
    highlightsStr:
      about?.highlights?.join("\n") ||
      "Student-focused learning\nStrong academic foundation\nCharacter & value education\nSports & co-curricular activities",
    mission: {
      title: about?.mission?.title || "Our Mission",
      description: about?.mission?.description || "",
    },
    vision: {
      title: about?.vision?.title || "Our Vision",
      description: about?.vision?.description || "",
    },
    values: {
      title: about?.values?.title || "Our Values",
      description: about?.values?.description || "",
    },
    approachTitle: about?.approachTitle || "Learning Beyond",
    approachHighlight: about?.approachHighlight || "The Classroom",
    approachDescription: about?.approachDescription || "",
    pillar1Title: about?.approachPillars?.[0]?.title || "Learn",
    pillar1Text:
      about?.approachPillars?.[0]?.text ||
      "Build strong concepts and develop a genuine love for learning.",
    pillar2Title: about?.approachPillars?.[1]?.title || "Lead",
    pillar2Text:
      about?.approachPillars?.[1]?.text ||
      "Develop confidence, communication and leadership qualities.",
    pillar3Title: about?.approachPillars?.[2]?.title || "Succeed",
    pillar3Text:
      about?.approachPillars?.[2]?.text ||
      "Prepare students with skills and values for a changing world.",
    ctaTitle: about?.ctaTitle || "Give Your Child a Stronger Future",
    ctaDescription: about?.ctaDescription || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (about) {
      setForm({
        eyebrow: about.eyebrow || "About Us",
        title: about.title || "Building Futures,",
        titleHighlight: about.titleHighlight || "Creating Leaders",
        description1: about.description1 || "",
        description2: about.description2 || "",
        image: about.image || "/images/about.png",
        promiseTitle: about.promiseTitle || "Our Promise",
        promiseText: about.promiseText || "Learning With Purpose",
        highlightsStr: about.highlights?.join("\n") || "",
        mission: {
          title: about.mission?.title || "Our Mission",
          description: about.mission?.description || "",
        },
        vision: {
          title: about.vision?.title || "Our Vision",
          description: about.vision?.description || "",
        },
        values: {
          title: about.values?.title || "Our Values",
          description: about.values?.description || "",
        },
        approachTitle: about.approachTitle || "Learning Beyond",
        approachHighlight: about.approachHighlight || "The Classroom",
        approachDescription: about.approachDescription || "",
        pillar1Title: about.approachPillars?.[0]?.title || "Learn",
        pillar1Text: about.approachPillars?.[0]?.text || "",
        pillar2Title: about.approachPillars?.[1]?.title || "Lead",
        pillar2Text: about.approachPillars?.[1]?.text || "",
        pillar3Title: about.approachPillars?.[2]?.title || "Succeed",
        pillar3Text: about.approachPillars?.[2]?.text || "",
        ctaTitle: about.ctaTitle || "Give Your Child a Stronger Future",
        ctaDescription: about.ctaDescription || "",
      });
    }
  }, [about]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        eyebrow: form.eyebrow,
        title: form.title,
        titleHighlight: form.titleHighlight,
        description1: form.description1,
        description2: form.description2,
        image: form.image,
        promiseTitle: form.promiseTitle,
        promiseText: form.promiseText,
        highlights: form.highlightsStr
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        mission: form.mission,
        vision: form.vision,
        values: form.values,
        approachTitle: form.approachTitle,
        approachHighlight: form.approachHighlight,
        approachDescription: form.approachDescription,
        approachPillars: [
          { title: form.pillar1Title, text: form.pillar1Text },
          { title: form.pillar2Title, text: form.pillar2Text },
          { title: form.pillar3Title, text: form.pillar3Text },
        ],
        ctaTitle: form.ctaTitle,
        ctaDescription: form.ctaDescription,
      };

      const res = await updateAdminData("about", "PUT", payload, token);
      if (res.success) onSaved(res.about);
    } catch (err) {
      alert(err.message || "Failed to update about page");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-slate-900">
        Manage Complete About Us Page
      </h3>
      <p className="mt-0.5 text-xs text-slate-500">
        Update main story, highlights checklist, mission, vision, core values, educational approach pillars, and bottom CTA banner.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-4xl">
        {/* Section 1: Hero & Story */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
            1. Hero Banner & Who We Are Section
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={form.eyebrow || ""}
                onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Main Title
              </label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Title Highlight (Yellow)
              </label>
              <input
                type="text"
                value={form.titleHighlight || ""}
                onChange={(e) =>
                  setForm({ ...form, titleHighlight: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>

          <ImageUploadPreview
            label="About Campus Image"
            value={form.image || ""}
            onChange={(val) => setForm({ ...form, image: val })}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Description Paragraph 1
            </label>
            <textarea
              rows="3"
              value={form.description1 || ""}
              onChange={(e) =>
                setForm({ ...form, description1: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Description Paragraph 2
            </label>
            <textarea
              rows="3"
              value={form.description2 || ""}
              onChange={(e) =>
                setForm({ ...form, description2: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Badge Title
              </label>
              <input
                type="text"
                value={form.promiseTitle || ""}
                onChange={(e) =>
                  setForm({ ...form, promiseTitle: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Badge Text
              </label>
              <input
                type="text"
                value={form.promiseText || ""}
                onChange={(e) =>
                  setForm({ ...form, promiseText: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Key Highlights Checklist (One per line)
            </label>
            <textarea
              rows="4"
              value={form.highlightsStr}
              onChange={(e) => setForm({ ...form, highlightsStr: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono bg-white"
              placeholder="Student-focused learning&#10;Strong academic foundation..."
            />
          </div>
        </div>

        {/* Section 2: Mission, Vision & Values */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
            2. Mission, Vision & Core Values
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Our Mission Description
              </label>
              <textarea
                rows="2"
                value={form.mission?.description || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mission: { ...form.mission, description: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Our Vision Description
              </label>
              <textarea
                rows="2"
                value={form.vision?.description || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    vision: { ...form.vision, description: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Our Values Description
              </label>
              <textarea
                rows="2"
                value={form.values?.description || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    values: { ...form.values, description: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Educational Approach Pillars */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
            3. Educational Approach Pillars
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Approach Heading
              </label>
              <input
                type="text"
                value={form.approachTitle}
                onChange={(e) =>
                  setForm({ ...form, approachTitle: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Approach Highlight (Yellow)
              </label>
              <input
                type="text"
                value={form.approachHighlight}
                onChange={(e) =>
                  setForm({ ...form, approachHighlight: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Approach Description
            </label>
            <textarea
              rows="3"
              value={form.approachDescription}
              onChange={(e) =>
                setForm({ ...form, approachDescription: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 1 Title
                </label>
                <input
                  type="text"
                  value={form.pillar1Title}
                  onChange={(e) =>
                    setForm({ ...form, pillar1Title: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 1 Text
                </label>
                <input
                  type="text"
                  value={form.pillar1Text}
                  onChange={(e) =>
                    setForm({ ...form, pillar1Text: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 2 Title
                </label>
                <input
                  type="text"
                  value={form.pillar2Title}
                  onChange={(e) =>
                    setForm({ ...form, pillar2Title: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 2 Text
                </label>
                <input
                  type="text"
                  value={form.pillar2Text}
                  onChange={(e) =>
                    setForm({ ...form, pillar2Text: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 3 Title
                </label>
                <input
                  type="text"
                  value={form.pillar3Title}
                  onChange={(e) =>
                    setForm({ ...form, pillar3Title: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Pillar 3 Text
                </label>
                <input
                  type="text"
                  value={form.pillar3Text}
                  onChange={(e) =>
                    setForm({ ...form, pillar3Text: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: CTA Banner */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
            4. Bottom Call-To-Action Banner
          </h4>
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              CTA Banner Title
            </label>
            <input
              type="text"
              value={form.ctaTitle}
              onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              CTA Banner Description
            </label>
            <textarea
              rows="2"
              value={form.ctaDescription}
              onChange={(e) =>
                setForm({ ...form, ctaDescription: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-slate-800 shadow-md"
        >
          <Save size={15} />
          {saving ? "Saving About Us Page..." : "Save Complete About Us Page"}
        </button>
      </form>
    </div>
  );
};

export default AboutPageAdmin;
