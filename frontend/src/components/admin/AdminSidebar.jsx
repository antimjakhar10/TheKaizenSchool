import {
  LayoutDashboard,
  Home,
  Building2,
  BookOpen,
  Images,
  Settings,
  LogOut,
  X,
  MailCheck,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  admin,
  activeTab,
  setActiveTab,
  onLogout,
  pendingEnquiriesCount = 0,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
    },
    {
      id: "home-page",
      label: "Home Page",
      icon: Home,
    },
    {
      id: "about-page",
      label: "About Us Page",
      icon: Building2,
    },
    {
      id: "academics-page",
      label: "Academics Page",
      icon: BookOpen,
    },
    {
      id: "admissions-page",
      label: "Admissions Page",
      icon: ClipboardList,
    },
    {
      id: "facilities-page",
      label: "Facilities Page",
      icon: Building2,
    },
    {
      id: "gallery-page",
      label: "Gallery Page",
      icon: Images,
    },
    {
      id: "contact-settings",
      label: "Contact & Settings",
      icon: Settings,
    },
    {
      id: "enquiries",
      label: "Student Enquiries",
      icon: MailCheck,
      badge: pendingEnquiriesCount,
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-white">
                Kaizen School
              </h1>
              <p className="text-[10px] font-bold text-amber-400">
                PAGE-WISE ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-56" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`group flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:bg-white/8 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive ? "text-slate-950" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-amber-500 text-slate-950"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin profile & logout */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-black text-sm">
              {admin?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-extrabold text-white">
                {admin?.name}
              </p>
              <p className="truncate text-[10px] text-slate-400">
                {admin?.email}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;