import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ApplyAdmission from "./pages/admissions/ApplyAdmission";
import ScheduleVisit from "./pages/admissions/ScheduleVisit";
import AdmissionEnquiry from "./pages/admissions/AdmissionEnquiry";
import AdmissionCriteria from "./pages/admissions/AdmissionCriteria";
import AdmissionFAQs from "./pages/admissions/AdmissionFAQs";
import MeritScholarship from "./pages/admissions/MeritScholarship";
import PrePrimary from "./pages/academics/PrePrimary";
import Primary from "./pages/academics/Primary";
import MiddleSchool from "./pages/academics/MiddleSchool";
import Secondary from "./pages/academics/Secondary";
import SeniorSecondary from "./pages/academics/SeniorSecondary";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* =====================================================
          PUBLIC WEBSITE
      ====================================================== */}

      <Route element={<PublicLayout />}>
        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/academics" element={<Academics />} />

        <Route path="/admissions" element={<Admissions />} />

        <Route path="/facilities" element={<Facilities />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/contact" element={<Contact />} />

        {/* =================================================
            ADMISSIONS
            SUB PAGES
        ================================================== */}

        <Route path="/admissions/apply" element={<ApplyAdmission />} />

        <Route path="/admissions/schedule-visit" element={<ScheduleVisit />} />

        <Route path="/admissions/enquiry" element={<AdmissionEnquiry />} />

        <Route path="/admissions/criteria" element={<AdmissionCriteria />} />
        <Route path="/admissions/faqs" element={<AdmissionFAQs />} />

        <Route path="/admissions/scholarship" element={<MeritScholarship />} />

        <Route path="/academics/pre-primary" element={<PrePrimary />} />

        <Route path="/academics/primary" element={<Primary />} />
        <Route path="/academics/middle-school" element={<MiddleSchool />} />
        <Route
  path="/academics/secondary"
  element={<Secondary />}
/>
<Route
  path="/academics/senior-secondary"
  element={<SeniorSecondary />}
/>
      </Route>

      {/* =====================================================
          ADMIN
      ====================================================== */}

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
