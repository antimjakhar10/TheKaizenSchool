import { useState, useEffect, useMemo } from "react";
import { ChevronDown, HelpCircle, Search, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAdmissions } from "../../services/publicApi";

const AdmissionFAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [admissionsData, setAdmissionsData] = useState(null);

  useEffect(() => {
    getPublicAdmissions().then((data) => {
      if (data) setAdmissionsData(data);
    });
  }, []);

  const rawFaqs = admissionsData?.faqs?.length
    ? admissionsData.faqs
    : [
        {
          category: "Admission",
          question: "How can I apply for admission?",
          answer: "You can begin the admission process by submitting an admission enquiry or by using the Apply for Admission option on our website.",
        },
        {
          category: "Admission",
          question: "Which classes are open for admission?",
          answer: "Admissions are offered for Pre-Primary to Class 12th depending on seat availability for the academic session.",
        },
        {
          category: "Admission",
          question: "Can I visit the school before applying?",
          answer: "Yes. Parents are welcome to schedule a school visit to explore the campus and interact with the school team.",
        },
        {
          category: "Eligibility",
          question: "What are the admission eligibility requirements?",
          answer: "Eligibility varies by class, including age criteria, previous academic records, and interaction.",
        },
        {
          category: "Documents",
          question: "Which documents are required for admission?",
          answer: "Documents include birth certificate, passport size photos, previous school report card, TC, and parent ID proof.",
        },
        {
          category: "Fees",
          question: "How can I know about the fee structure?",
          answer: "For the latest fee structure applicable to the academic session, please contact the school admissions desk.",
        },
        {
          category: "Scholarships",
          question: "Are there any scholarships available?",
          answer: "The school offers merit scholarship opportunities for outstanding academic and extracurricular talent.",
        },
      ];

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return rawFaqs;
    const q = search.toLowerCase();
    return rawFaqs.filter(
      (f) =>
        f.question?.toLowerCase().includes(q) ||
        f.answer?.toLowerCase().includes(q) ||
        f.category?.toLowerCase().includes(q)
    );
  }, [rawFaqs, search]);

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative py-10 sm:py-12 lg:py-14">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Help Center
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Admission <span className="text-[#f5b400]">FAQs</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Find answers to common questions about admission requirements, documents, fees, and visits.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">FAQs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          {/* SEARCH BAR */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. documents, fees, visit)..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-xs font-semibold text-[#082b55] shadow-sm outline-none focus:border-[#f5b400]"
            />
          </div>

          {/* ACCORDION LIST */}
          <div className="mt-8 space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 rounded-2xl bg-white border border-slate-200">
                <HelpCircle size={32} className="mx-auto text-slate-400" />
                <p className="mt-2 text-sm font-bold text-[#082b55]">No matching questions found</p>
                <p className="mt-1 text-xs text-slate-500">Try searching for a different keyword or contact our helpline.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-4 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className="rounded-md bg-[#f5b400]/10 px-2 py-0.5 text-[10px] font-bold text-[#a47700] uppercase">
                          {faq.category || "General"}
                        </span>
                        <h3 className="text-sm font-black text-[#082b55]">{faq.question}</h3>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#f5b400]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 bg-slate-50/50 p-4 text-xs leading-6 text-slate-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* NEED MORE HELP */}
          <div className="mt-10 rounded-2xl bg-[#082b55] p-6 text-white text-center sm:p-8">
            <h3 className="text-xl font-black">Still Have Questions?</h3>
            <p className="mt-2 text-xs text-white/70 max-w-xl mx-auto">
              Our admissions team is available to assist you with any custom query or guidance you need.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/admissions/enquiry"
                className="rounded-xl bg-[#f5b400] px-6 py-2.5 text-xs font-extrabold text-[#082b55] transition hover:bg-white"
              >
                Send Admission Enquiry
              </Link>
              <a
                href="tel:9468023823"
                className="rounded-xl border border-white/30 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Call Admissions Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdmissionFAQs;