import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { getPublicAdmissions, submitPublicEnquiry } from "../../services/publicApi";

const ApplyAdmission = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "Class 1",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    previousSchool: "",
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
        studentName: formData.studentName,
        phone: formData.phone,
        email: formData.email || "",
        classGrade: formData.classApplying,
        interest: "Admission Application",
        message: `[Apply Admission] DOB: ${formData.dob}, Gender: ${formData.gender}, Prev School: ${formData.previousSchool || 'N/A'}, Address: ${formData.address || 'N/A'}. ${formData.message || ''}`,
      };

      await submitPublicEnquiry(payload);
      setSubmitted(true);
      setFormData({
        studentName: "",
        dob: "",
        gender: "",
        classApplying: "Class 1",
        parentName: "",
        phone: "",
        email: "",
        address: "",
        previousSchool: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      title: "Quality Education",
      description: "A balanced learning environment focused on academic excellence and overall development.",
    },
    {
      title: "Holistic Development",
      description: "Academics, sports, creativity and life skills come together for complete student growth.",
    },
    {
      title: "Safe Environment",
      description: "A caring and secure school environment where every child can learn with confidence.",
    },
    {
      title: "Experienced Faculty",
      description: "Dedicated educators who guide, encourage and support students throughout their journey.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[320px] w-[320px] rounded-full border-[50px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[320px] w-[320px] rounded-full border-[50px] border-[#f5b400]/10" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-10 sm:py-12 lg:py-14">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Admissions 2026–27
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Apply For
                <span className="block text-[#f5b400]">
                  Admission
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Take the first step towards an inspiring educational journey at The Kaizen School Bhana.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">Apply For Admission</span>
              </div>
            </div>

            {/* Hero Badge */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="relative mr-8 h-[200px] w-[280px]">
                <div className="absolute right-8 top-4 flex h-36 w-36 items-center justify-center rounded-full border border-[#f5b400]/20 bg-[#f5b400]/10">
                  <GraduationCap size={64} strokeWidth={1.2} className="text-[#f5b400]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FORM & SIDE CONTENT */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">

            {/* LEFT SIDE CONTENT */}
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55]">
                  Admission Steps
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h2 className="mt-2 text-2xl font-black leading-tight text-[#082b55] sm:text-3xl">
                Your Child's
                <span className="block text-[#f2ad00]">Future Starts Here</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                We believe every child deserves an environment where they can learn, explore, develop confidence and discover their potential.
              </p>

              {/* Steps */}
              <div className="mt-6 space-y-4">
                {(admissionsData?.steps?.length ? admissionsData.steps : [
                  { number: "01", title: "Submit Application", description: "Share your child's basic information using the form." },
                  { number: "02", title: "Connect With Our Team", description: "Our admissions team will contact you with further details." },
                  { number: "03", title: "Complete Formalities", description: "Visit the school and complete required admission steps." },
                ]).map((st, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#082b55] text-xs font-black text-[#f5b400]">
                      {st.number || `0${idx + 1}`}
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#082b55]">{st.title}</h3>
                      <p className="mt-0.5 text-xs leading-5 text-slate-500">{st.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Card */}
              <div className="mt-8 rounded-2xl bg-[#082b55] p-5 text-white sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                  Need Direct Support?
                </p>
                <h3 className="mt-1 text-lg font-black">Talk To Admissions Desk</h3>
                <div className="mt-4 space-y-2 text-xs">
                  <a href="tel:9468023823" className="flex items-center gap-2 font-semibold hover:text-[#f5b400]">
                    <Phone size={15} className="text-[#f5b400]" /> 9468023823 / 9467818529
                  </a>
                  <div className="flex items-center gap-2 font-semibold">
                    <MapPin size={15} className="text-[#f5b400]" /> Badopal Road, Bhana, Haryana – 125123
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff4d0] text-[#d99d00]">
                    <FileText size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">Official Form</p>
                    <h2 className="text-xl font-black text-[#082b55]">Online Application</h2>
                  </div>
                </div>
                <span className="rounded-full bg-[#f5b400]/10 px-3 py-1 text-[10px] font-bold uppercase text-[#a47700]">
                  Session 2026–27
                </span>
              </div>

              {submitted && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                  <div>
                    <p className="font-bold">Application Submitted Successfully!</p>
                    <p className="mt-0.5 text-green-700">Your details have been saved to Admin Enquiries. Our team will contact you soon.</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Student Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        placeholder="Full name of child"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Gender <span className="text-red-500">*</span></label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Class Applying For <span className="text-red-500">*</span></label>
                    <select
                      name="classApplying"
                      value={formData.classApplying}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Pre-Nursery">Pre-Nursery</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                </div>

                {/* Parent Info */}
                <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-100">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Parent / Guardian Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      placeholder="Parent's full name"
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
                    <label className="mb-1 block text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Optional email"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Address / City</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your residential location"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Additional Message / Remarks</label>
                    <textarea
                      rows="2"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific questions or remarks..."
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
                    {loading ? "Submitting Application..." : "Submit Application Form"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHY KAIZEN */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f5b400]">Why Choose Us</p>
            <h2 className="text-2xl font-black text-[#082b55] mt-1">A Foundation Built For Excellence</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => (
              <div key={index} className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <span className="text-xs font-black text-[#f5b400]">0{index + 1}</span>
                <h3 className="mt-2 text-sm font-bold text-[#082b55]">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-600 leading-5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ApplyAdmission;