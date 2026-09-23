import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setAcademicsOpen(false);
    setAdmissionsOpen(false);
  };

  const academicsLinks = [
    { name: "Pre-Primary", path: "/academics/pre-primary" },
    {
      name: "Primary",
      path: "/academics/primary",
    },
    {
      name: "Middle School",
      path: "/academics/middle-school",
    },
    {
      name: "Secondary",
      path: "/academics/secondary",
    },
    {
      name: "Senior Secondary",
      path: "/academics/senior-secondary",
    },
  ];

  const admissionsLinks = [
    {
      name: "Apply for Admission",
      path: "/admissions/apply",
    },
    {
      name: "Schedule a Visit",
      path: "/admissions/schedule-visit",
    },
    {
      name: "Enquire About Admission",
      path: "/admissions/enquiry",
    },
    {
      name: "Admission Criteria & Process",
      path: "/admissions/criteria",
    },
    {
      name: "FAQs",
      path: "/admissions/faqs",
    },
    {
      name: "Merit Scholarship",
      path: "/admissions/scholarship",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            DESKTOP / MAIN NAVBAR
        ====================================================== */}
        <div className="flex min-h-[78px] items-center justify-between gap-5">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#f5b400] bg-white p-1 shadow-sm">
              <img
                src="/images/logo.png"
                alt="The Kaizen School Bhana"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-[16px] font-extrabold uppercase leading-tight text-[#082b55] md:text-[18px]">
                The Kaizen School Bhana
              </h1>

              <p className="mt-1 text-xs font-bold tracking-wide text-slate-500">
                Read Lead Succeed
              </p>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden items-center lg:flex">
            {/* HOME */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                  isActive
                    ? "text-[#e5a800]"
                    : "text-slate-700 hover:text-[#e5a800]"
                }`
              }
            >
              Home
            </NavLink>

            {/* ABOUT US */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                  isActive
                    ? "text-[#e5a800]"
                    : "text-slate-700 hover:text-[#e5a800]"
                }`
              }
            >
              About Us
            </NavLink>

            {/* =================================================
                ACADEMICS DROPDOWN
            ================================================== */}
            <div
              className="relative"
              onMouseEnter={() => setAcademicsOpen(true)}
              onMouseLeave={() => setAcademicsOpen(false)}
            >
              <NavLink
                to="/academics"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                    isActive
                      ? "text-[#e5a800]"
                      : "text-slate-700 hover:text-[#e5a800]"
                  }`
                }
              >
                Academics
                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ${
                    academicsOpen ? "rotate-180" : ""
                  }`}
                />
              </NavLink>

              {/* DROPDOWN */}
              <div
                className={`absolute left-1/2 top-full w-[250px] -translate-x-1/2 pt-1 transition-all duration-200 ${
                  academicsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(8,43,85,0.14)]">
                  {academicsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className="group flex items-center px-5 py-3.5 text-[15px] font-medium text-[#29446d] transition-all duration-200 hover:bg-[#fff8e6] hover:pl-6 hover:text-[#d99d00]"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-transparent transition-all duration-200 group-hover:bg-[#f5b400]" />

                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                ADMISSIONS DROPDOWN
            ================================================== */}
            <div
              className="relative"
              onMouseEnter={() => setAdmissionsOpen(true)}
              onMouseLeave={() => setAdmissionsOpen(false)}
            >
              <NavLink
                to="/admissions"
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                    isActive
                      ? "text-[#e5a800]"
                      : "text-slate-700 hover:text-[#e5a800]"
                  }`
                }
              >
                Admissions
                <ChevronDown
                  size={15}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ${
                    admissionsOpen ? "rotate-180" : ""
                  }`}
                />
              </NavLink>

              {/* DROPDOWN */}
              <div
                className={`absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-1 transition-all duration-200 ${
                  admissionsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(8,43,85,0.14)]">
                  {admissionsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className="group flex items-center px-5 py-3.5 text-[15px] font-medium text-[#29446d] transition-all duration-200 hover:bg-[#fff8e6] hover:pl-6 hover:text-[#d99d00]"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-transparent transition-all duration-200 group-hover:bg-[#f5b400]" />

                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* FACILITIES */}
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                  isActive
                    ? "text-[#e5a800]"
                    : "text-slate-700 hover:text-[#e5a800]"
                }`
              }
            >
              Facilities
            </NavLink>

            {/* GALLERY */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                  isActive
                    ? "text-[#e5a800]"
                    : "text-slate-700 hover:text-[#e5a800]"
                }`
              }
            >
              Gallery
            </NavLink>

            {/* CONTACT */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-7 text-sm font-bold transition-colors duration-300 xl:text-base ${
                  isActive
                    ? "text-[#e5a800]"
                    : "text-slate-700 hover:text-[#e5a800]"
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* ENQUIRE BUTTON */}
            <Link
              to="/contact"
              className="ml-3 rounded-md bg-[#082b55] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5b400] hover:text-[#082b55] hover:shadow-lg"
            >
              Enquire Now
            </Link>
          </nav>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#082b55] text-white transition hover:bg-[#f5b400] hover:text-[#082b55] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "max-h-[1200px] border-t border-slate-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 py-4">
            {/* HOME */}
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#082b55] text-white"
                    : "text-slate-700 hover:bg-[#fff8e6] hover:text-[#d99d00]"
                }`
              }
            >
              Home
            </NavLink>

            {/* ABOUT */}
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#082b55] text-white"
                    : "text-slate-700 hover:bg-[#fff8e6] hover:text-[#d99d00]"
                }`
              }
            >
              About Us
            </NavLink>

            {/* =================================================
                MOBILE ACADEMICS
            ================================================== */}
            <div>
              <button
                type="button"
                onClick={() => setAcademicsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-[#fff8e6] hover:text-[#d99d00]"
              >
                <span>Academics</span>

                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    academicsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  academicsOpen
                    ? "max-h-[400px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-3 border-l-2 border-[#f5b400]/30 py-1">
                  <Link
                    to="/academics"
                    onClick={closeMenu}
                    className="block px-4 py-2.5 text-sm font-medium text-[#29446d] hover:text-[#d99d00]"
                  >
                    All Academics
                  </Link>

                  {academicsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className="block px-4 py-2.5 text-sm font-medium text-[#29446d] hover:text-[#d99d00]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE ADMISSIONS
            ================================================== */}
            <div>
              <button
                type="button"
                onClick={() => setAdmissionsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-[#fff8e6] hover:text-[#d99d00]"
              >
                <span>Admissions</span>

                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    admissionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  admissionsOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-3 border-l-2 border-[#f5b400]/30 py-1">
                  <Link
                    to="/admissions"
                    onClick={closeMenu}
                    className="block px-4 py-2.5 text-sm font-medium text-[#29446d] hover:text-[#d99d00]"
                  >
                    Admissions Overview
                  </Link>

                  {admissionsLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className="block px-4 py-2.5 text-sm font-medium text-[#29446d] hover:text-[#d99d00]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* FACILITIES */}
            <NavLink
              to="/facilities"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#082b55] text-white"
                    : "text-slate-700 hover:bg-[#fff8e6] hover:text-[#d99d00]"
                }`
              }
            >
              Facilities
            </NavLink>

            {/* GALLERY */}
            <NavLink
              to="/gallery"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#082b55] text-white"
                    : "text-slate-700 hover:bg-[#fff8e6] hover:text-[#d99d00]"
                }`
              }
            >
              Gallery
            </NavLink>

            {/* CONTACT */}
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#082b55] text-white"
                    : "text-slate-700 hover:bg-[#fff8e6] hover:text-[#d99d00]"
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* ENQUIRE */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-2 rounded-md bg-[#f5b400] px-4 py-3 text-center text-sm font-bold text-[#082b55] transition hover:bg-[#082b55] hover:text-white"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
