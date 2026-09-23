import { Menu, Globe, ChevronRight } from "lucide-react";

const tabTitles = {
  dashboard: "Dashboard Overview",
  "home-page": "Home Page Manager",
  hero: "Home Page Manager",
  "about-page": "About Us Page Manager",
  about: "About Us Page Manager",
  "academics-page": "Academics Page Manager",
  academics: "Academics Page Manager",
  "admissions-page": "Admissions Page Manager",
  "facilities-page": "Facilities Page Manager",
  facilities: "Facilities Page Manager",
  "gallery-page": "Gallery Page Manager",
  gallery: "Gallery Page Manager",
  testimonials: "Testimonials Management",
  events: "Events & Calendar",
  enquiries: "Student & Parent Enquiries",
  "contact-settings": "Contact Page & Settings",
  settings: "Contact Page & Settings",
};

const AdminTopbar = ({ setSidebarOpen, activeTab, admin }) => {
  const currentTitle = tabTitles[activeTab] || "Admin Panel";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left side: Hamburger button + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="hidden sm:inline">The Kaizen School</span>
          <ChevronRight size={14} className="hidden text-slate-400 sm:inline" />
          <span className="font-bold text-slate-900">{currentTitle}</span>
        </div>
      </div>

      {/* Right side: View Website button + Profile indicator */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white shadow-2xs"
        >
          <Globe className="h-3.5 w-3.5 text-slate-500" />
          <span>View Website</span>
        </a>

        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-amber-400">
            {admin?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <span className="hidden text-xs font-semibold text-slate-800 sm:inline">
            {admin?.name || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;