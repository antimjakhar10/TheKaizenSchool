import { useEffect, useState } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicHero } from "../services/publicApi";

const defaultHero = {
  slides: [
    {
      badge: "Welcome To",
      title: "The Kaizen School",
      highlightedText: "Bhana",
      description:
        "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
      image: "/images/hero-school.png",
      primaryButtonText: "Enquire Now",
      primaryButtonLink: "/contact",
      secondaryButtonText: "Watch Video",
      secondaryButtonLink: "",
    },
  ],
  badge: "Welcome To",
  title: "The Kaizen School",
  highlightedText: "Bhana",
  description:
    "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
  image: "/images/hero-school.png",
  primaryButtonText: "Enquire Now",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Watch Video",
  secondaryButtonLink: "",
};

const HeroSection = () => {
  const [hero, setHero] = useState(defaultHero);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    getPublicHero().then((data) => {
      if (data) {
        setHero(data);
      }
    });
  }, []);

  const slides =
    hero?.slides && hero.slides.length > 0
      ? hero.slides
      : [
          {
            badge: hero?.badge || "Welcome To",
            title: hero?.title || "The Kaizen School",
            highlightedText: hero?.highlightedText || "Bhana",
            description:
              hero?.description ||
              "Nurturing curious minds, building strong foundations and empowering students to succeed in a dynamic world.",
            image: hero?.image || "/images/hero-school.png",
            primaryButtonText: hero?.primaryButtonText || "Enquire Now",
            primaryButtonLink: hero?.primaryButtonLink || "/contact",
            secondaryButtonText: hero?.secondaryButtonText || "Watch Video",
            secondaryButtonLink: hero?.secondaryButtonLink || "",
          },
        ];

  // Auto-play timer for slides
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const currentSlide = slides[currentIndex] || slides[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Background Shape */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#fff8e5] blur-3xl" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-116px)] items-center gap-10 py-6 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:py-10 xl:min-h-[580px]">
          
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 order-2 lg:order-1 min-h-[340px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Welcome Badge */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#0b2d57] sm:text-base">
                    {currentSlide.badge || "Welcome To"}
                  </span>

                  <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
                </div>

                {/* Heading */}
                <h1 className="max-w-2xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#082b55] sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px]">
                  <span className="block sm:whitespace-nowrap">
                    {currentSlide.title || "The Kaizen School"}
                  </span>
                  <span className="mt-1 block text-[#f2ad00]">
                    {currentSlide.highlightedText || "Bhana"}
                  </span>
                </h1>

                {/* Motto */}
                <div className="mt-5">
                  <p className="inline-block border-b-2 border-[#f5b400] pb-1 text-lg font-extrabold text-[#082b55] sm:text-xl">
                    Read Lead Succeed
                  </p>
                </div>

                {/* Description */}
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  {currentSlide.description}
                </p>

                {/* Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
                  {/* Primary Button */}
                  <Link
                    to={currentSlide.primaryButtonLink || "/contact"}
                    className="group inline-flex items-center gap-2 rounded-md bg-[#082b55] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#082b55]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5b400] hover:text-[#082b55] hover:shadow-xl sm:text-lg"
                  >
                    {currentSlide.primaryButtonText || "Enquire Now"}

                    <ArrowRight
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {/* Secondary Button */}
                  {currentSlide.secondaryButtonText && (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentSlide.secondaryButtonLink) {
                          if (currentSlide.secondaryButtonLink.startsWith("http")) {
                            window.open(currentSlide.secondaryButtonLink, "_blank");
                          } else {
                            window.location.href = currentSlide.secondaryButtonLink;
                          }
                        }
                      }}
                      className="group inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3.5 text-base font-bold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#082b55] hover:text-[#082b55] hover:shadow-md"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 transition group-hover:border-[#f5b400] group-hover:bg-[#f5b400]">
                        <Play size={12} fill="currentColor" className="ml-0.5" />
                      </span>

                      {currentSlide.secondaryButtonText}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Small Trust Line */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                Quality Education
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                Safe Environment
              </span>

              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                Holistic Development
              </span>
            </div>

            {/* Multi-Slide Dots & Navigation Controls */}
            {slides.length > 1 && (
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-[#082b55] hover:bg-[#082b55] hover:text-white shadow-xs"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#082b55] transition hover:border-[#082b55] hover:bg-[#082b55] hover:text-white shadow-xs"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Dots Pagination */}
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? "w-8 bg-[#f5b400]"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-bold text-slate-400">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>
            )}
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[720px]">
              {/* Yellow Curved Accent */}
              <div className="absolute -left-5 top-1/2 h-[108%] w-16 -translate-y-1/2 rounded-l-full border-[7px] border-r-0 border-[#f5b400] sm:-left-7 sm:w-20 lg:-left-8" />

              {/* Image Container with AnimatePresence */}
              <div className="relative ml-2 overflow-hidden rounded-[45%_0_0_45%] shadow-2xl shadow-[#082b55]/10 sm:ml-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={currentSlide.image || "/images/hero-school.png"}
                    alt={currentSlide.title || "The Kaizen School"}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-[300px] w-full object-cover object-center sm:h-[400px] md:h-[470px] lg:h-[510px] xl:h-[540px]"
                  />
                </AnimatePresence>

                {/* Image Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#082b55]/10 via-transparent to-transparent" />
              </div>

              {/* Floating Motto Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-4 left-4 hidden rounded-lg border border-white/50 bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Our Motto
                </p>

                <p className="mt-0.5 text-base font-black text-[#082b55]">
                  Read • Lead • Succeed
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;