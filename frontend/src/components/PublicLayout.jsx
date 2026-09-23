import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;