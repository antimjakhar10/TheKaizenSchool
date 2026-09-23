import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to top whenever route/pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show floating scroll to top button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#f5b400] bg-[#061f3d] text-white shadow-xl transition-all duration-300 hover:bg-[#f5b400] hover:text-[#061f3d] hover:scale-110 active:scale-95 focus:outline-none"
        >
          <ArrowUp size={22} className="stroke-[2.5]" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
