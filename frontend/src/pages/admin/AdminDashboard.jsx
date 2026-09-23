import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MessageSquare,
  User,
  CheckCircle,
  Building2,
  BookOpen,
  Images,
  Settings,
  MailCheck,
  ExternalLink,
  Sparkles,
  ClipboardList,
  Home,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { fetchAdminData } from "../../services/adminApi";

// Import modular admin sub-pages directly from src/pages/admin/
import HomePageAdmin from "./HomePageAdmin";
import AboutPageAdmin from "./AboutPageAdmin";
import AcademicsPageAdmin from "./AcademicsPageAdmin";
import AdmissionsPageAdmin from "./AdmissionsPageAdmin";
import FacilitiesPageAdmin from "./FacilitiesPageAdmin";
import GalleryPageAdmin from "./GalleryPageAdmin";
import SettingsPageAdmin from "./SettingsPageAdmin";
import EnquiriesPageAdmin from "./EnquiriesPageAdmin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [token, setToken] = useState("");

  // Section Data States
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [academics, setAcademics] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [facilityPageData, setFacilityPageData] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents] = useState([]);
  const [settingsData, setSettingsData] = useState(null);
  const [admissionsData, setAdmissionsData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);

  // UI state for notifications
  const [feedback, setFeedback] = useState({ message: "", isError: false });

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const adminDataStr = localStorage.getItem("adminData");

    if (!adminToken || !adminDataStr) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      const parsedAdmin = JSON.parse(adminDataStr);
      setAdmin(parsedAdmin);
      setToken(adminToken);
      loadAllAdminData(adminToken);
    } catch (error) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      navigate("/admin/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const loadAllAdminData = async (authToken) => {
    const t = authToken || token;
    if (!t) return;

    try {
      const [
        heroRes,
        aboutRes,
        acadRes,
        facRes,
        galRes,
        testRes,
        eventRes,
        settRes,
        admRes,
        enqRes,
      ] = await Promise.allSettled([
        fetchAdminData("hero/admin", t),
        fetchAdminData("about", t),
        fetchAdminData("academics/admin", t),
        fetchAdminData("facilities/admin", t),
        fetchAdminData("gallery/admin", t),
        fetchAdminData("testimonials/admin", t),
        fetchAdminData("events/admin", t),
        fetchAdminData("settings", t),
        fetchAdminData("admissions", t),
        fetchAdminData("enquiries", t),
      ]);

      if (heroRes.status === "fulfilled" && heroRes.value?.hero) {
        setHeroData(heroRes.value.hero);
      }
      if (aboutRes.status === "fulfilled" && aboutRes.value?.about) {
        setAboutData(aboutRes.value.about);
      }
      if (acadRes.status === "fulfilled" && acadRes.value?.academics) {
        setAcademics(acadRes.value.academics);
      }
      if (facRes.status === "fulfilled" && facRes.value) {
        if (facRes.value.facilities) setFacilities(facRes.value.facilities);
        if (facRes.value.pageInfo) setFacilityPageData(facRes.value.pageInfo);
      }
      if (galRes.status === "fulfilled" && galRes.value?.items) {
        setGallery(galRes.value.items);
      }
      if (testRes.status === "fulfilled" && testRes.value?.testimonials) {
        setTestimonials(testRes.value.testimonials);
      }
      if (eventRes.status === "fulfilled" && eventRes.value?.events) {
        setEvents(eventRes.value.events);
      }
      if (settRes.status === "fulfilled" && settRes.value?.settings) {
        setSettingsData(settRes.value.settings);
      }
      if (admRes.status === "fulfilled" && admRes.value?.admissions) {
        setAdmissionsData(admRes.value.admissions);
      }
      if (enqRes.status === "fulfilled" && enqRes.value?.enquiries) {
        setEnquiries(enqRes.value.enquiries);
      }
    } catch (err) {
      console.error("Load admin data error:", err);
    }
  };

  const showNotification = (msg, isError = false) => {
    setFeedback({ message: msg, isError });
    setTimeout(() => {
      setFeedback({ message: "", isError: false });
    }, 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login", { replace: true });
  };

  const pendingEnquiriesCount = enquiries.filter(
    (e) => e.status === "Pending"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-sm font-medium text-slate-500">
          Loading page-wise admin panel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-900">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        admin={admin}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        pendingEnquiriesCount={pendingEnquiriesCount}
      />

      <div className="lg:pl-72">
        <AdminTopbar
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          admin={admin}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl">
          {/* Global Alert Notification */}
          {feedback.message && (
            <div
              className={`mb-6 flex items-center justify-between rounded-xl p-4 text-xs font-bold shadow-sm ${
                feedback.isError
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>{feedback.message}</span>
              </div>
            </div>
          )}

          {/* DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div>
              {/* Premium Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl mb-8 border border-white/10">
                <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full border-[30px] border-white/5" />
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                      <Sparkles size={12} />
                      Page-Wise Control Center
                    </span>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl text-white tracking-tight">
                      Welcome back, {admin?.name}!
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
                      Manage and update every full page of your website live in real-time.
                    </p>
                  </div>

                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 shrink-0 rounded-xl bg-amber-500 px-5 py-3 text-xs font-black text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                  >
                    <span>View Public Website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardCard
                  icon={Home}
                  title="Dynamic Pages"
                  value="7 Pages"
                  text="Home, About, Academics, Admissions, Facilities, Gallery, Contact"
                />
                <DashboardCard
                  icon={CalendarDays}
                  title="School Events"
                  value={events.length.toString()}
                  text="Active calendar events"
                />
                <DashboardCard
                  icon={MessageSquare}
                  title="Enquiries"
                  value={enquiries.length.toString()}
                  text={`${pendingEnquiriesCount} pending response`}
                />
                <DashboardCard
                  icon={User}
                  title="Admin Role"
                  value={admin?.role || "Superadmin"}
                  text="Full page edit access"
                />
              </div>

              {/* Page-Wise Management Grid */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Page-Wise Website Content Managers
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any page below to edit its complete live data.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { id: "home-page", name: "Home Page", desc: "Hero sliders, title, motto, events & reviews", icon: Home },
                    { id: "about-page", name: "About Us Page", desc: "About story, Mission, Vision & Core Values", icon: Building2 },
                    { id: "academics-page", name: "Academics Page", desc: "Academic stages, grades & philosophy", icon: BookOpen },
                    { id: "admissions-page", name: "Admissions Page", desc: "Steps, required documents & guidelines", icon: ClipboardList },
                    { id: "facilities-page", name: "Facilities Page", desc: "Campus facilities, photos & features", icon: Building2 },
                    { id: "gallery-page", name: "Gallery Page", desc: "School photos & categories", icon: Images },
                    { id: "contact-settings", name: "Contact & Settings", desc: "Address, phones, email & top bar announcement", icon: Settings },
                    { id: "enquiries", name: "Student Enquiries", desc: "Admission form submissions list", icon: MailCheck },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-slate-400 hover:bg-slate-50 hover:shadow-xs"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-amber-400">
                          <ItemIcon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-slate-950">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* HOME PAGE MANAGER (Handles Hero Sliders, Events, and Testimonials) */}
          {(activeTab === "home-page" ||
            activeTab === "hero" ||
            activeTab === "testimonials" ||
            activeTab === "events") && (
            <HomePageAdmin
              hero={heroData}
              token={token}
              events={events}
              testimonials={testimonials}
              onRefreshData={() => loadAllAdminData(token)}
              onSavedHero={(data) => {
                setHeroData(data);
                showNotification("Home Page Hero data updated successfully!");
              }}
              showNotification={showNotification}
            />
          )}

          {/* ABOUT US PAGE MANAGER */}
          {(activeTab === "about-page" || activeTab === "about") && (
            <AboutPageAdmin
              about={aboutData}
              token={token}
              onSaved={(data) => {
                setAboutData(data);
                showNotification("About Us Page data updated successfully!");
              }}
            />
          )}

          {/* ACADEMICS PAGE MANAGER */}
          {(activeTab === "academics-page" || activeTab === "academics") && (
            <AcademicsPageAdmin
              items={academics}
              token={token}
              onRefresh={() => loadAllAdminData(token)}
              showNotification={showNotification}
            />
          )}

          {/* ADMISSIONS PAGE MANAGER */}
          {activeTab === "admissions-page" && (
            <AdmissionsPageAdmin
              admissions={admissionsData}
              token={token}
              onSaved={(data) => {
                setAdmissionsData(data);
                showNotification("Admissions Page data updated successfully!");
              }}
            />
          )}

          {/* FACILITIES PAGE MANAGER */}
          {(activeTab === "facilities-page" || activeTab === "facilities") && (
            <FacilitiesPageAdmin
              items={facilities}
              pageInfo={facilityPageData}
              token={token}
              onRefresh={() => loadAllAdminData(token)}
              showNotification={showNotification}
            />
          )}

          {/* GALLERY PAGE MANAGER */}
          {(activeTab === "gallery-page" || activeTab === "gallery") && (
            <GalleryPageAdmin
              items={gallery}
              token={token}
              onRefresh={() => loadAllAdminData(token)}
              showNotification={showNotification}
            />
          )}

          {/* CONTACT & WEBSITE SETTINGS MANAGER */}
          {(activeTab === "contact-settings" || activeTab === "settings") && (
            <SettingsPageAdmin
              settings={settingsData}
              token={token}
              onSaved={(data) => {
                setSettingsData(data);
                showNotification("Contact & Website settings saved successfully!");
              }}
            />
          )}

          {/* STUDENT ENQUIRIES */}
          {activeTab === "enquiries" && (
            <EnquiriesPageAdmin
              items={enquiries}
              token={token}
              onRefresh={() => loadAllAdminData(token)}
              showNotification={showNotification}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// DASHBOARD CARD REUSABLE COMPONENT
const DashboardCard = ({ icon: Icon, title, value, text }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-bold capitalize text-slate-900 tracking-tight">
        {value}
      </h3>
      <p className="mt-1.5 text-xs text-slate-400">{text}</p>
    </div>
  );
};

export default AdminDashboard;