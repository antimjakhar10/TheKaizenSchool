import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicSettings, submitPublicEnquiry } from "../services/publicApi";

const defaultSettings = {
  schoolName: "The Kaizen School Bhana",
  motto: "Read • Lead • Succeed",
  phone1: "9468023823",
  phone2: "9467818529",
  email: "kaizenschoolbhana@gmail.com",
  address: "Badopal Road, Bhana, Haryana - 125123",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Kaizen+School+Bhana",
  timing: "Monday - Saturday: 8:00 AM - 2:00 PM",
  contactHeroEyebrow: "Contact Us",
  contactHeroTitle: "Let's Start a",
  contactHeroTitleHighlight: "Conversation",
  contactHeroDescription:
    "Have questions about admissions, academics, facilities or school life? Our team is always happy to help parents and students with the information they need.",
  contactFormHeading: "How Can We Help?",
  contactFormSubheading:
    "Share a few details with us and our admission team will assist you with the right information.",
};

const Contact = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getPublicSettings().then((data) => {
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const payload = {
      parentName: formData.get("parentName"),
      studentName: formData.get("studentName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      classGrade: formData.get("class"),
      interest: formData.get("interest"),
      visitDate: formData.get("visitDate"),
      contactMethod: formData.get("contactMethod"),
      message: formData.get("message"),
    };

    try {
      await submitPublicEnquiry(payload);
      setSubmitted(true);
      form.reset();
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err) {
      setErrorMessage(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfoCards = [
    {
      title: "Call Us",
      value: settings.phone1 || "9468023823",
      secondValue: settings.phone2 ? settings.phone2 : undefined,
      icon: Phone,
      href: `tel:${settings.phone1 || "9468023823"}`,
    },
    {
      title: "Email Us",
      value: settings.email || "kaizenschoolbhana@gmail.com",
      icon: Mail,
      href: `mailto:${settings.email || "kaizenschoolbhana@gmail.com"}`,
    },
    {
      title: "Visit Us",
      value: settings.address || "Badopal Road, Bhana, Haryana - 125123",
      icon: MapPin,
      href:
        settings.mapUrl ||
        "https://www.google.com/maps/search/?api=1&query=The+Kaizen+School+Bhana",
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="pointer-events-none absolute -right-36 -top-44 h-[500px] w-[500px] rounded-full border-[75px] border-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-44 -left-36 h-[500px] w-[500px] rounded-full border-[75px] border-[#f5b400]/10" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[320px] items-center py-8 sm:py-12 lg:min-h-[360px] lg:py-14">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-3xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  {settings.contactHeroEyebrow || "Contact Us"}
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {settings.contactHeroTitle || "Let's Start a"}
                <span className="block text-[#f5b400]">
                  {settings.contactHeroTitleHighlight || "Conversation"}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                {settings.contactHeroDescription}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold">
                <Link to="/" className="text-white/45 transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-[#f5b400]">Contact Us</span>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <div className="relative mr-5 h-[280px] w-[400px] xl:mr-12 xl:w-[440px]">
                <div className="absolute right-12 top-8 flex h-48 w-48 items-center justify-center rounded-full border border-[#f5b400]/25 bg-[#f5b400]/[0.08]">
                  <MessageCircle size={60} strokeWidth={1.1} className="text-[#f5b400]" />
                </div>
                <div className="absolute left-0 top-10 rounded-xl border border-white/10 bg-white/[0.08] px-5 py-4 shadow-xl backdrop-blur-md">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f5b400]">We're Here</p>
                  <p className="mt-1 text-base font-black text-white">To Help You</p>
                </div>
                <div className="absolute bottom-4 left-10 rounded-xl bg-white px-5 py-3 shadow-lg">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {settings.schoolName || "The Kaizen School"}
                  </p>
                  <p className="mt-0.5 text-xs font-black text-[#082b55]">
                    {settings.motto || "Read • Lead • Succeed"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {contactInfoCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.title === "Visit Us" ? "_blank" : undefined}
                  rel={item.title === "Visit Us" ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#fafbfc] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#082b55] text-[#f5b400] transition-all duration-300 group-hover:bg-[#f5b400] group-hover:text-[#082b55]">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#d99d00]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 break-words text-xs font-extrabold text-[#082b55] leading-5 sm:text-sm">
                      {item.value}
                    </p>
                    {item.secondValue && (
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">
                        {item.secondValue}
                      </p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM & LOCATION DETAILS */}
      <section className="bg-slate-50/60 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-7 lg:grid-cols-[1.15fr_0.85fr]">

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55]">
                    Send An Enquiry
                  </span>
                  <span className="h-[2px] w-12 bg-[#f5b400]" />
                </div>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#082b55] sm:text-3xl">
                  {settings.contactFormHeading || "How Can We Help?"}
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {settings.contactFormSubheading}
                </p>
              </div>

              {submitted && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-xs font-semibold text-green-800">
                  <CheckCircle2 size={18} className="shrink-0 text-green-600" />
                  <div>
                    <p className="font-bold">Enquiry Submitted Successfully!</p>
                    <p className="mt-0.5 text-green-700">Thank you for reaching out. Our team will contact you shortly.</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="parentName" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      required
                      placeholder="Enter parent name"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="studentName" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Student Name
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      placeholder="Enter student name"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="10-digit phone number"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Optional email address"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="class" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Class / Grade
                    </label>
                    <select
                      id="class"
                      name="class"
                      defaultValue="Primary"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="Pre-Primary">Pre-Primary</option>
                      <option value="Primary">Primary</option>
                      <option value="Middle School">Middle School</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Senior Secondary">Senior Secondary</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-1 block text-xs font-bold text-[#082b55]">
                      Enquiry Topic
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      defaultValue="General Enquiry"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                    >
                      <option value="New Admission">New Admission</option>
                      <option value="School Visit">School Visit</option>
                      <option value="Fee Structure">Fee Structure</option>
                      <option value="Transport">Transport</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-xs font-bold text-[#082b55]">
                    Message / Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-[#082b55] outline-none focus:border-[#f5b400] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#082b55] py-3 text-xs font-extrabold text-white transition hover:bg-[#f5b400] hover:text-[#082b55] sm:w-auto sm:px-8"
                  >
                    <Send size={15} />
                    {submitting ? "Sending..." : "Submit Enquiry Form"}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* RIGHT SIDE DETAILS & HOURS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* School Box */}
              <div className="relative overflow-hidden rounded-2xl bg-[#082b55] p-6 text-white shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5b400] text-[#082b55]">
                  <MapPin size={20} />
                </div>

                <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#f5b400]">
                  Visit Our School
                </p>

                <h2 className="mt-1 text-2xl font-black">{settings.schoolName}</h2>

                <p className="mt-2 text-xs leading-5 text-white/70">{settings.address}</p>

                <div className="mt-5 space-y-2 text-xs">
                  <a href={`tel:${settings.phone1}`} className="flex items-center gap-2 font-semibold hover:text-[#f5b400]">
                    <Phone size={14} className="text-[#f5b400]" /> {settings.phone1} {settings.phone2 ? `/ ${settings.phone2}` : ""}
                  </a>

                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 font-semibold hover:text-[#f5b400]">
                    <Mail size={14} className="text-[#f5b400]" /> {settings.email}
                  </a>
                </div>

                {settings.mapUrl && (
                  <a
                    href={settings.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f5b400] px-4 py-2.5 text-xs font-extrabold text-[#082b55] transition hover:bg-white"
                  >
                    Get Directions <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>

              {/* Working Hours */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff4d0] text-[#d99d00]">
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#d99d00]">School Hours</p>
                    <h3 className="text-base font-black text-[#082b55]">Office & Visiting Timing</h3>
                  </div>
                </div>

                <p className="mt-3 text-xs font-semibold text-slate-700 leading-5">
                  {settings.timing || "Monday - Saturday: 8:00 AM - 2:00 PM"}
                </p>

                <p className="mt-1.5 text-[11px] text-slate-500">
                  (Prior appointment preferred for guided campus tours)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;