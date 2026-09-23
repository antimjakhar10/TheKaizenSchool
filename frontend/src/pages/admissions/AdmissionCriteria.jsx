import { useState, useEffect } from "react";
import {
  CheckCircle2,
  FileText,
  ClipboardList,
  GraduationCap,
  ArrowRight,
  Phone,
  MapPin,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getPublicAdmissions } from "../../services/publicApi";

const AdmissionCriteria = () => {
  const [admissionsData, setAdmissionsData] = useState(null);

  useEffect(() => {
    getPublicAdmissions().then((data) => {
      if (data) setAdmissionsData(data);
    });
  }, []);

  const eligibility = admissionsData?.criteriaEligibility?.length
    ? admissionsData.criteriaEligibility
    : [
        {
          className: "Pre-Primary",
          details: "Admission is based on the child's age, readiness and interaction during the admission process.",
        },
        {
          className: "Primary School",
          details: "The child should meet the required age criteria and demonstrate age-appropriate academic readiness.",
        },
        {
          className: "Middle School",
          details: "Admission depends on previous academic performance, interaction and availability of seats.",
        },
        {
          className: "Secondary & Senior Secondary",
          details: "Admission is subject to academic eligibility, previous school records, interaction/assessment and seat availability.",
        },
      ];

  const processSteps = admissionsData?.steps?.length
    ? admissionsData.steps
    : [
        { number: "01", title: "Submit Enquiry", description: "Begin your admission journey by submitting an enquiry online or visiting the campus." },
        { number: "02", title: "School Visit", description: "Visit campus, explore facilities, and understand the learning environment." },
        { number: "03", title: "Application Form", description: "Complete and submit the admission application with student details." },
        { number: "04", title: "Interaction", description: "Student & parents interact with our academic coordinator." },
        { number: "05", title: "Document Verification", description: "Verification of birth certificate, previous report cards & photo IDs." },
        { number: "06", title: "Confirmation", description: "Admission is confirmed upon completion of formalities." },
      ];

  const documents = admissionsData?.documents?.length
    ? admissionsData.documents
    : [
        "Birth Certificate",
        "Recent Passport Size Photographs",
        "Previous School / Academic Records",
        "Transfer Certificate, wherever applicable",
        "Aadhaar / Identity Proof",
        "Address Proof",
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
                  Guidelines & Eligibility
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Admission Criteria
                <span className="block text-[#f5b400]">& Process</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Everything you need to know about eligibility rules, required documents, and step-by-step admission procedures.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">Admission Criteria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & PROCESS */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-10">

          {/* ELIGIBILITY GRID */}
          <div>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#f5b400]">Class Guidelines</p>
              <h2 className="text-2xl font-black text-[#082b55] mt-1">Eligibility Criteria By Stage</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {eligibility.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#082b55] text-xs font-black text-[#f5b400]">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#082b55]">{item.className}</h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-5">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROCESS STEPS */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#f5b400]">Step By Step</p>
              <h2 className="text-2xl font-black text-[#082b55] mt-1">6 Simple Admission Steps</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-4">
                  <span className="text-xl font-black text-[#f5b400] shrink-0">{step.number || `0${idx + 1}`}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#082b55]">{step.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS CHECKLIST */}
          <div className="pt-6 border-t border-slate-200 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black text-[#082b55]">Required Documents Checklist</h3>
              <p className="mt-1 text-xs text-slate-500">Please keep copies ready at the time of admission verification.</p>
              <div className="mt-4 space-y-2.5">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#f5b400] shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#082b55] p-6 text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#f5b400]">Ready to Apply?</span>
                <h3 className="mt-2 text-2xl font-black">Begin Admission Process</h3>
                <p className="mt-2 text-xs text-white/75 leading-5">
                  Submit your application form online or visit the school for direct assistance.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/admissions/apply"
                  className="rounded-xl bg-[#f5b400] px-6 py-3 text-xs font-extrabold text-[#082b55] transition hover:bg-white"
                >
                  Apply Online Now
                </Link>
                <Link
                  to="/admissions/schedule-visit"
                  className="rounded-xl border border-white/30 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Schedule Campus Visit
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default AdmissionCriteria;