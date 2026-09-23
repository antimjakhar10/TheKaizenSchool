import { useState, useEffect } from "react";
import { Save, Phone, MapPin, MessageSquare, Layout, Share2 } from "lucide-react";
import { updateAdminData } from "../../services/adminApi";

const SettingsPageAdmin = ({ settings, token, onSaved }) => {
  const [form, setForm] = useState({
    schoolName: settings?.schoolName || "The Kaizen School Bhana",
    motto: settings?.motto || "Read • Lead • Succeed",
    phone1: settings?.phone1 || "9468023823",
    phone2: settings?.phone2 || "9467818529",
    email: settings?.email || "kaizenschoolbhana@gmail.com",
    address: settings?.address || "Badopal Road, Bhana, Haryana - 125123",
    topbarAnnounce:
      settings?.topbarAnnounce || "Admissions Open for Academic Session 2025-26",
    mapUrl:
      settings?.mapUrl ||
      "https://www.google.com/maps/search/?api=1&query=The+Kaizen+School+Bhana",
    timing: settings?.timing || "Monday - Saturday: 8:00 AM - 2:00 PM",
    contactHeroEyebrow: settings?.contactHeroEyebrow || "Contact Us",
    contactHeroTitle: settings?.contactHeroTitle || "Let's Start a",
    contactHeroTitleHighlight: settings?.contactHeroTitleHighlight || "Conversation",
    contactHeroDescription:
      settings?.contactHeroDescription ||
      "Have questions about admissions, academics, facilities or school life? Our team is always happy to help parents and students with the information they need.",
    contactFormHeading: settings?.contactFormHeading || "How Can We Help?",
    contactFormSubheading:
      settings?.contactFormSubheading ||
      "Share a few details with us and our admission team will assist you with the right information.",
    facebookUrl: settings?.facebookUrl || "https://facebook.com",
    instagramUrl: settings?.instagramUrl || "https://instagram.com/the_kaizen_school_bhana",
    youtubeUrl: settings?.youtubeUrl || "https://youtube.com",
    twitterUrl: settings?.twitterUrl || "",
    linkedinUrl: settings?.linkedinUrl || "",
    whatsappUrl: settings?.whatsappUrl || "https://wa.me/919468023823",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm((prev) => ({ ...prev, ...settings }));
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateAdminData("settings", "PUT", form, token);
      if (res.success) {
        onSaved(res.settings);
        alert("Contact page, social links & website settings updated successfully!");
      }
    } catch (err) {
      alert(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900">Manage Contact Page & Website Settings</h3>
          <p className="mt-0.5 text-xs text-slate-500 font-semibold">
            Edit contact numbers, email, address, timing, map location, social media links, and hero headers for the Contact page.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#082b55] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-4xl">
        {/* SECTION 1: CONTACT INFO & WEBSITE DETAILS */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
          <h4 className="text-xs font-black uppercase text-[#082b55] tracking-wider flex items-center gap-2">
            <Phone size={15} /> 1. Contact Information & School Details
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">School Full Name</label>
              <input
                type="text"
                value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">School Motto / Tagline</label>
              <input
                type="text"
                value={form.motto}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Primary Phone Number</label>
              <input
                type="text"
                value={form.phone1}
                onChange={(e) => setForm({ ...form, phone1: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Secondary Phone Number</label>
              <input
                type="text"
                value={form.phone2}
                onChange={(e) => setForm({ ...form, phone2: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">School Official Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">School Working Hours / Timing</label>
              <input
                type="text"
                value={form.timing}
                onChange={(e) => setForm({ ...form, timing: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Full School Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Google Maps Directions URL</label>
              <input
                type="text"
                value={form.mapUrl}
                onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Website Top Announcement Bar Text</label>
              <input
                type="text"
                value={form.topbarAnnounce}
                onChange={(e) => setForm({ ...form, topbarAnnounce: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: SOCIAL MEDIA HANDLES & LINKS */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
          <h4 className="text-xs font-black uppercase text-[#082b55] tracking-wider flex items-center gap-2">
            <Share2 size={15} /> 2. Social Media Handles & Profile Links
          </h4>
          <p className="text-xs text-slate-500 font-semibold -mt-2">
            Add or update official social media links. These icons will be displayed in the website Footer and Header.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Facebook Page Link</label>
              <input
                type="text"
                value={form.facebookUrl || ""}
                onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                placeholder="e.g. https://facebook.com/your-school"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Instagram Profile Link</label>
              <input
                type="text"
                value={form.instagramUrl || ""}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                placeholder="e.g. https://instagram.com/the_kaizen_school_bhana"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">YouTube Channel Link</label>
              <input
                type="text"
                value={form.youtubeUrl || ""}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                placeholder="e.g. https://youtube.com/@your-school"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Twitter / X Profile Link</label>
              <input
                type="text"
                value={form.twitterUrl || ""}
                onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
                placeholder="e.g. https://x.com/your-school"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">LinkedIn Page Link</label>
              <input
                type="text"
                value={form.linkedinUrl || ""}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                placeholder="e.g. https://linkedin.com/company/your-school"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">WhatsApp Chat / Group Link</label>
              <input
                type="text"
                value={form.whatsappUrl || ""}
                onChange={(e) => setForm({ ...form, whatsappUrl: e.target.value })}
                placeholder="e.g. https://wa.me/919468023823"
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: CONTACT PAGE HEADERS & FORM HEADINGS */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
          <h4 className="text-xs font-black uppercase text-[#082b55] tracking-wider flex items-center gap-2">
            <Layout size={15} /> 3. Contact Page Hero & Section Content
          </h4>

          <div>
            <label className="block text-xs font-bold text-slate-700">Contact Hero Eyebrow Tag</label>
            <input
              type="text"
              value={form.contactHeroEyebrow}
              onChange={(e) => setForm({ ...form, contactHeroEyebrow: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Hero Title Line 1</label>
              <input
                type="text"
                value={form.contactHeroTitle}
                onChange={(e) => setForm({ ...form, contactHeroTitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Hero Highlight Title Line 2 (Yellow)</label>
              <input
                type="text"
                value={form.contactHeroTitleHighlight}
                onChange={(e) => setForm({ ...form, contactHeroTitleHighlight: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Hero Description Paragraph</label>
            <textarea
              rows="3"
              value={form.contactHeroDescription}
              onChange={(e) => setForm({ ...form, contactHeroDescription: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Form Section Main Title</label>
              <input
                type="text"
                value={form.contactFormHeading}
                onChange={(e) => setForm({ ...form, contactFormHeading: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Form Section Subtitle / Instructions</label>
              <input
                type="text"
                value={form.contactFormSubheading}
                onChange={(e) => setForm({ ...form, contactFormSubheading: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#082b55] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#f5b400] hover:text-[#082b55]"
          >
            <Save size={16} />
            {saving ? "Saving Changes..." : "Save Contact & Website Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPageAdmin;
