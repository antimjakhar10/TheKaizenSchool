import { useState, useEffect } from "react";
import { Save, FileText, CheckSquare, Award, HelpCircle } from "lucide-react";
import { updateAdminData } from "../../services/adminApi";

const AdmissionsPageAdmin = ({ admissions, token, onSaved }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState({
    heroTitle: admissions?.heroTitle || "Admissions Open 2025-26",
    heroSubtitle: admissions?.heroSubtitle || "Simple Steps To Join The Kaizen School Family",
    documentsStr: admissions?.documents?.join("\n") || "",
    guidelinesStr: admissions?.guidelines?.join("\n") || "",
    scholarshipBenefitsStr: admissions?.scholarshipBenefits?.join("\n") || "",
    scholarshipDocumentsStr: admissions?.scholarshipDocuments?.join("\n") || "",
    criteriaEligibility: admissions?.criteriaEligibility || [],
    scholarshipProcess: admissions?.scholarshipProcess || [],
    faqs: admissions?.faqs || [],
    scholarshipFaqs: admissions?.scholarshipFaqs || [],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (admissions) {
      setForm({
        heroTitle: admissions.heroTitle || "Admissions Open 2025-26",
        heroSubtitle: admissions.heroSubtitle || "Simple Steps To Join The Kaizen School Family",
        documentsStr: admissions.documents?.join("\n") || "",
        guidelinesStr: admissions.guidelines?.join("\n") || "",
        scholarshipBenefitsStr: admissions.scholarshipBenefits?.join("\n") || "",
        scholarshipDocumentsStr: admissions.scholarshipDocuments?.join("\n") || "",
        criteriaEligibility: admissions.criteriaEligibility?.length ? admissions.criteriaEligibility : [
          { className: "Pre-Primary", details: "Admission based on age, readiness and interaction." },
          { className: "Primary School", details: "Child should meet age criteria and basic academic readiness." },
          { className: "Middle School", details: "Based on previous academic records and interaction." },
          { className: "Secondary & Senior Secondary", details: "Based on academic eligibility, records and seat availability." }
        ],
        scholarshipProcess: admissions.scholarshipProcess?.length ? admissions.scholarshipProcess : [
          { number: "01", title: "Apply", description: "Submit application and express scholarship interest." },
          { number: "02", title: "Assessment", description: "Evaluated through academic records and interaction." },
          { number: "03", title: "Review", description: "School reviews submitted documents and achievements." },
          { number: "04", title: "Decision", description: "Eligible students are informed about scholarship benefits." }
        ],
        faqs: admissions.faqs || [],
        scholarshipFaqs: admissions.scholarshipFaqs || [],
      });
    }
  }, [admissions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        documents: form.documentsStr.split("\n").map((s) => s.trim()).filter(Boolean),
        guidelines: form.guidelinesStr.split("\n").map((s) => s.trim()).filter(Boolean),
        scholarshipBenefits: form.scholarshipBenefitsStr.split("\n").map((s) => s.trim()).filter(Boolean),
        scholarshipDocuments: form.scholarshipDocumentsStr.split("\n").map((s) => s.trim()).filter(Boolean),
        criteriaEligibility: form.criteriaEligibility,
        scholarshipProcess: form.scholarshipProcess,
        faqs: form.faqs,
        scholarshipFaqs: form.scholarshipFaqs,
      };

      const res = await updateAdminData("admissions", "PUT", payload, token);
      if (res.success) {
        onSaved(res.admissions);
        alert("Admissions data saved successfully!");
      }
    } catch (err) {
      alert(err.message || "Failed to update admissions page");
    } finally {
      setSaving(false);
    }
  };

  // Helper functions for dynamic array editing
  const handleFaqChange = (index, field, value) => {
    const updated = [...form.faqs];
    updated[index][field] = value;
    setForm({ ...form, faqs: updated });
  };

  const addFaq = () => {
    setForm({
      ...form,
      faqs: [...form.faqs, { category: "General", question: "", answer: "" }],
    });
  };

  const removeFaq = (index) => {
    setForm({
      ...form,
      faqs: form.faqs.filter((_, i) => i !== index),
    });
  };

  const handleEligibilityChange = (index, field, value) => {
    const updated = [...form.criteriaEligibility];
    updated[index][field] = value;
    setForm({ ...form, criteriaEligibility: updated });
  };

  const handleScholarshipProcessChange = (index, field, value) => {
    const updated = [...form.scholarshipProcess];
    updated[index][field] = value;
    setForm({ ...form, scholarshipProcess: updated });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900">Manage Admissions Pages</h3>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            Edit content across all Admissions sub-pages (Criteria, FAQs, Merit Scholarship & Process).
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082b55] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save All Admissions Changes"}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "general"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <FileText size={15} />
          General Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("criteria")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "criteria"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <CheckSquare size={15} />
          Admission Criteria
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scholarship")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "scholarship"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Award size={15} />
          Merit Scholarship
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold transition ${
            activeTab === "faqs"
              ? "bg-[#082b55] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <HelpCircle size={15} />
          Admission FAQs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-4xl">
        {/* TAB 1: GENERAL OVERVIEW */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Page Main Title
                </label>
                <input
                  type="text"
                  value={form.heroTitle}
                  onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:border-[#f5b400] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Page Subtitle
                </label>
                <input
                  type="text"
                  value={form.heroSubtitle}
                  onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:border-[#f5b400] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Required Documents Checklist (One per line)
              </label>
              <textarea
                rows="5"
                value={form.documentsStr}
                onChange={(e) => setForm({ ...form, documentsStr: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono focus:border-[#f5b400] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Admission Guidelines (One per line)
              </label>
              <textarea
                rows="5"
                value={form.guidelinesStr}
                onChange={(e) => setForm({ ...form, guidelinesStr: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono focus:border-[#f5b400] outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: ADMISSION CRITERIA */}
        {activeTab === "criteria" && (
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-800">Class-wise Eligibility Criteria</h4>
            <div className="space-y-3">
              {form.criteriaEligibility.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2">
                    <label className="block text-[11px] font-bold text-slate-600">Class Name / Stage</label>
                    <input
                      type="text"
                      value={item.className}
                      onChange={(e) => handleEligibilityChange(idx, "className", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600">Eligibility Details</label>
                    <textarea
                      rows="2"
                      value={item.details}
                      onChange={(e) => handleEligibilityChange(idx, "details", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MERIT SCHOLARSHIP */}
        {activeTab === "scholarship" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-black text-slate-800 mb-3">Scholarship Evaluation Steps</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {form.scholarshipProcess.map((step, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#f5b400]">Step {step.number || idx + 1}</span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleScholarshipProcessChange(idx, "title", e.target.value)}
                        className="rounded border border-slate-300 px-2 py-1 text-xs font-bold bg-white"
                      />
                    </div>
                    <textarea
                      rows="2"
                      value={step.description}
                      onChange={(e) => handleScholarshipProcessChange(idx, "description", e.target.value)}
                      className="w-full rounded border border-slate-300 p-2 text-xs bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Scholarship Benefits (One per line)
                </label>
                <textarea
                  rows="5"
                  value={form.scholarshipBenefitsStr}
                  onChange={(e) => setForm({ ...form, scholarshipBenefitsStr: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono focus:border-[#f5b400] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Scholarship Documents (One per line)
                </label>
                <textarea
                  rows="5"
                  value={form.scholarshipDocumentsStr}
                  onChange={(e) => setForm({ ...form, scholarshipDocumentsStr: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono focus:border-[#f5b400] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADMISSION FAQS */}
        {activeTab === "faqs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-800">Frequently Asked Questions ({form.faqs.length})</h4>
              <button
                type="button"
                onClick={addFaq}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                + Add FAQ
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {form.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative">
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="absolute right-3 top-3 text-xs text-red-500 font-bold hover:underline"
                  >
                    Delete
                  </button>
                  <div className="mb-2 max-w-xs">
                    <label className="block text-[11px] font-bold text-slate-600">Category</label>
                    <input
                      type="text"
                      value={faq.category || "General"}
                      onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs font-bold bg-white"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[11px] font-bold text-slate-600">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600">Answer</label>
                    <textarea
                      rows="2"
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#082b55] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
          >
            <Save size={16} />
            {saving ? "Saving Changes..." : "Save Admissions Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionsPageAdmin;
