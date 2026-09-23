import { useState, useEffect } from "react";
import {
  Award,
  CheckCircle2,
  GraduationCap,
  Trophy,
  Star,
  FileText,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAdmissions } from "../../services/publicApi";

const MeritScholarship = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [admissionsData, setAdmissionsData] = useState(null);

  useEffect(() => {
    getPublicAdmissions().then((data) => {
      if (data) setAdmissionsData(data);
    });
  }, []);

  const eligibility = [
    {
      title: "Academic Excellence",
      description: "Students demonstrating strong academic performance and consistent learning outcomes.",
      icon: GraduationCap,
    },
    {
      title: "Outstanding Talent",
      description: "Students showing exceptional talent in sports, arts, leadership or co-curricular achievements.",
      icon: Trophy,
    },
    {
      title: "All-Round Achievement",
      description: "Balanced performance across academics, discipline, co-curriculars, and character.",
      icon: Star,
    },
  ];

  const process = admissionsData?.scholarshipProcess?.length
    ? admissionsData.scholarshipProcess
    : [
        { number: "01", title: "Apply", description: "Submit admission application & express scholarship interest." },
        { number: "02", title: "Assessment", description: "Evaluation based on academic records & interaction." },
        { number: "03", title: "Review", description: "School committee reviews documents & credentials." },
        { number: "04", title: "Decision", description: "Eligible candidates are informed about scholarship benefits." },
      ];

  const benefits = admissionsData?.scholarshipBenefits?.length
    ? admissionsData.scholarshipBenefits
    : [
        "Recognition of academic and overall achievement",
        "Encouragement to continue pursuing excellence",
        "Scholarship benefits as per applicable school policy",
        "Opportunity to be recognised for exceptional talent",
        "A supportive environment for continued growth",
      ];

  const documents = admissionsData?.scholarshipDocuments?.length
    ? admissionsData.scholarshipDocuments
    : [
        "Previous academic mark sheets & report cards",
        "Co-curricular / sports certificates, if applicable",
        "State or national level achievement certificates",
        "Other supporting documents requested by the school",
      ];

  const faqs = admissionsData?.scholarshipFaqs?.length
    ? admissionsData.scholarshipFaqs
    : [
        {
          question: "Who can apply for a merit scholarship?",
          answer: "Students demonstrating academic excellence, outstanding talent, or notable achievements may be considered, subject to criteria.",
        },
        {
          question: "Is scholarship available for every class?",
          answer: "Availability varies by academic session and class policy. Please contact the school admissions desk for current guidelines.",
        },
        {
          question: "Does applying guarantee a scholarship?",
          answer: "No. Consideration depends on eligibility criteria, documentation review, seat availability, and management decision.",
        },
      ];

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative py-10 sm:py-12 lg:py-14">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Student Excellence
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Merit <span className="text-[#f5b400]">Scholarship</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Recognising and rewarding academic talent, outstanding abilities, and all-round student achievements.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">Merit Scholarship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT WITH TIGHT PADDING */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-10">

          {/* ELIGIBILITY PILLARS */}
          <div>
            <div className="text-center max-w-xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#f5b400]">Scholarship Pillars</p>
              <h2 className="text-2xl font-black text-[#082b55] mt-1">Who Is Eligible?</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {eligibility.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#082b55] text-[#f5b400]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[#082b55]">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-5">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HOW IT WORKS PROCESS STEPS (COMPACT MARGINS) */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-center max-w-xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#f5b400]">How It Works</p>
              <h2 className="text-2xl font-black text-[#082b55] mt-1">Scholarship Evaluation Process</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm relative">
                  <span className="text-xs font-black text-[#f5b400]">{step.number || `0${idx + 1}`}</span>
                  <h3 className="mt-2 text-sm font-bold text-[#082b55]">{step.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-5">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BENEFITS & DOCUMENTS */}
          <div className="pt-6 border-t border-slate-200 grid gap-6 lg:grid-cols-2">
            {/* Benefits */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-[#082b55]">Key Scholarship Benefits</h3>
              <div className="mt-3 space-y-2">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#f5b400] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-[#082b55]">Supporting Documents</h3>
              <div className="mt-3 space-y-2">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <FileText size={16} className="text-[#082b55] shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SCHOLARSHIP FAQS */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-xl font-black text-[#082b55] mb-4 text-center">Scholarship Questions</h3>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-4 text-left font-bold text-xs text-[#082b55]"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180 text-[#f5b400]" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-600 leading-5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-[#082b55] p-6 text-white text-center">
            <h3 className="text-xl font-black">Ready To Express Interest?</h3>
            <p className="mt-1 text-xs text-white/70">Submit your admission application online and indicate scholarship interest.</p>
            <div className="mt-4 flex justify-center gap-3">
              <Link
                to="/admissions/apply"
                className="rounded-xl bg-[#f5b400] px-6 py-2.5 text-xs font-extrabold text-[#082b55] transition hover:bg-white"
              >
                Apply Online Now
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default MeritScholarship;