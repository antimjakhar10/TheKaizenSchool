import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { getPublicAdmissions, submitPublicEnquiry } from "../../services/publicApi";

const AdmissionEnquiry = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "",
    classInterested: "Primary",
    enquiryType: "Admission Process",
    preferredContact: "Phone Call",
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
        interest: formData.enquiryType || "General Enquiry",
        contactMethod: formData.preferredContact || "Phone Call",
        message: formData.message,
      };

      await submitPublicEnquiry(payload);
      setSubmitted(true);
      setFormData({
        parentName: "",
        phone: "",
        email: "",
        studentName: "",
        classInterested: "Primary",
        enquiryType: "Admission Process",
        preferredContact: "Phone Call",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative py-10 sm:py-12 lg:py-14">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Support Desk
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400]" />
              </div>

              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Enquire About
                <span className="block text-[#f5b400]">Admissions</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Have questions regarding admission guidelines, fee structures, transport or curriculum? Send us a message directly.
              </p>

              {/* Breadcrumb */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/50">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">Home</Link>
                <span>›</span>
                <Link to="/admissions" className="transition-colors hover:text-[#f5b400]">Admissions</Link>
                <span>›</span>
                <span className="text-[#f5b400]">Enquire About Admission</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM & CONTACT CONTENT */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">

            {/* LEFT CONTENT */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55]">Information Helpline</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[#082b55] sm:text-3xl">
                We're Here To <span className="text-[#f5b400]">Guide You</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-6">
                Our admissions team responds promptly to all parent inquiries with accurate details and clear guidance.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-[#082b55] bg-white p-3 rounded-xl border border-slate-200">
                  <Phone size={18} className="text-[#f5b400]" />
                  <span>Call us: 9468023823 / 9467818529</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#082b55] bg-white p-3 rounded-xl border border-slate-200">
                  <Mail size={18} className="text-[#f5b400]" />
                  <span>Email: kaizenschoolbhana@gmail.com</span>
                </div>
              </div>

              {/* Dynamic Guidelines Box */}
              {admissionsData?.guidelines?.length > 0 && (
                <div className="mt-6 rounded-2xl bg-[#082b55] p-5 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5b400]">Important Note</p>
                  <ul className="mt-3 space-y-2 text-xs text-white/80">
                    {admissionsData.guidelines.slice(0, 3).map((g, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#f5b400]">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ENQUIRY FORM */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">Enquiry Desk</p>
                  <h2 className="text-xl font-black text-[#082b55]">Send Your Query</h2>
                </div>
                <MessageSquare size={24} className="text-[#f5b400]" />
              </div>

              {submitted && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                  <div>
                    <p className="font-bold">Enquiry Received!</p>
                    <p className="mt-0.5 text-green-700">Your message has been sent to Admin Enquiries. We will get back to you shortly.</p>
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
                  <div>
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
                    <label className="mb-1 block text-xs font-bold text-slate-700">Class Seeking Admission</label>
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
                    <label className="mb-1 block text-xs font-bold text-slate-700">Enquiry Topic</label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Admission Process">Admission Process</option>
                      <option value="Fee Structure">Fee Structure</option>
                      <option value="Curriculum & Classes">Curriculum & Classes</option>
                      <option value="School Facilities">School Facilities</option>
                      <option value="Transport Facility">Transport Facility</option>
                      <option value="Scholarships">Scholarships</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Preferred Contact Method</label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Phone Call">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-700">Your Query / Message <span className="text-red-500">*</span></label>
                    <textarea
                      rows="3"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Type your question here in detail..."
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
                    {loading ? "Sending Message..." : "Submit Inquiry"}
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

export default AdmissionEnquiry;