import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { getPublicAdmissions, submitPublicEnquiry } from "../../services/publicApi";

const ScheduleVisit = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "",
    classInterested: "Primary",
    visitDate: "",
    visitTime: "Morning (9:00 AM - 12:00 PM)",
    visitors: "2",
    message: "",
  });

  const [admissionsData, setAdmissionsData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getPublicAdmissions().then((data) => {
      if (data) setAdmissionsData(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        parentName: formData.parentName,
        studentName: formData.studentName || "N/A",
        phone: formData.phone,
        email: formData.email || "",
        classGrade: formData.classInterested,
        interest: "Schedule Visit",
        visitDate: `${formData.visitDate} (${formData.visitTime})`,
        contactMethod: "Phone Call",
        message: `[Schedule Visit] Preferred Date: ${formData.visitDate}, Time: ${formData.visitTime}, Visitors: ${formData.visitors}. ${formData.message || ''}`,
      };

      await submitPublicEnquiry(payload);
      setSubmitted(true);
      setFormData({
        parentName: "",
        phone: "",
        email: "",
        studentName: "",
        classInterested: "Primary",
        visitDate: "",
        visitTime: "Morning (9:00 AM - 12:00 PM)",
        visitors: "2",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to schedule visit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const visitBenefits = [
    {
      number: "01",
      title: "Explore Our Campus",
      description: "Take a closer look at our classrooms, laboratories, library, and sports arena.",
    },
    {
      number: "02",
      title: "Meet Our Educators",
      description: "Connect with our admissions team and teachers to ask your questions.",
    },
    {
      number: "03",
      title: "Understand Our Approach",
      description: "Learn about our academic philosophy, value education and student care.",
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
                  Campus Visit
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Schedule A
                <span className="block text-[#f5b400]">School Visit</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Experience our campus culture, modern facilities, and vibrant learning atmosphere in person.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">Schedule A Visit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">

            {/* LEFT CONTENT */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55]">Visit Experience</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[#082b55] sm:text-3xl">
                We Look Forward To <span className="text-[#f5b400]">Welcoming You</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-6">
                A guided school tour is the best way to understand our values, teaching methodology, and environment.
              </p>

              <div className="mt-6 space-y-4">
                {visitBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#082b55] text-xs font-black text-[#f5b400]">
                      {b.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#082b55]">{b.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-5">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#082b55] p-5 text-white sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5b400]">Visiting Hours</p>
                <h3 className="mt-1 text-lg font-black">Monday to Saturday</h3>
                <p className="mt-2 text-xs text-white/70">8:00 AM – 2:00 PM (Prior Appointment Preferred)</p>
                <div className="mt-4 text-xs font-semibold">
                  <a href="tel:9468023823" className="flex items-center gap-2 hover:text-[#f5b400]">
                    <Phone size={15} className="text-[#f5b400]" /> Call Helpline: 9468023823
                  </a>
                </div>
              </div>
            </div>

            {/* VISIT FORM */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">Appointment Form</p>
                  <h2 className="text-xl font-black text-[#082b55]">Book Your Campus Tour</h2>
                </div>
                <CalendarDays size={24} className="text-[#f5b400]" />
              </div>

              {submitted && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                  <div>
                    <p className="font-bold">Visit Scheduled Successfully!</p>
                    <p className="mt-0.5 text-green-700">Your appointment has been registered in Admin Enquiries. We will confirm your visit shortly.</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Parent Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="10-digit phone number"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Student Name</label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Child's name"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Class Interested</label>
                    <select
                      name="classInterested"
                      value={formData.classInterested}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Pre-Primary">Pre-Primary</option>
                      <option value="Primary">Primary (Class 1-5)</option>
                      <option value="Middle School">Middle School (Class 6-8)</option>
                      <option value="Secondary">Secondary (Class 9-10)</option>
                      <option value="Senior Secondary">Senior Secondary (Class 11-12)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Preferred Visit Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Preferred Time Slot</label>
                    <select
                      name="visitTime"
                      value={formData.visitTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Morning (9:00 AM - 11:00 AM)">Morning (9:00 AM - 11:00 AM)</option>
                      <option value="Mid-day (11:00 AM - 1:00 PM)">Mid-day (11:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 2:30 PM)">Afternoon (1:00 PM - 2:30 PM)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Special Requests / Questions</label>
                    <textarea
                      rows="2"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific facility or area you want to inspect..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#082b55] py-3 text-xs font-extrabold text-white transition hover:bg-[#f5b400] hover:text-[#082b55] sm:w-auto sm:px-8"
                  >
                    <Send size={15} />
                    {loading ? "Scheduling Visit..." : "Confirm & Book Visit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScheduleVisit;