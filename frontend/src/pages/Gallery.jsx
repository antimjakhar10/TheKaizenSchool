import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicGallery } from "../services/publicApi";

const defaultGalleryItems = [
  {
    id: 1,
    title: "Beautiful Campus",
    category: "Campus",
    image: "/images/gallery/gallery-1.png",
  },
  {
    id: 2,
    title: "Classroom Learning",
    category: "Academics",
    image: "/images/gallery/gallery-2.png",
  },
  {
    id: 3,
    title: "Student Activities",
    category: "Activities",
    image: "/images/gallery/gallery-3.png",
  },
  {
    id: 4,
    title: "Annual Sports Day",
    category: "Sports",
    image: "/images/gallery/gallery-4.png",
  },
  {
    id: 5,
    title: "School Celebration",
    category: "Events",
    image: "/images/gallery/gallery-5.png",
  },
  {
    id: 6,
    title: "Creative Learning",
    category: "Academics",
    image: "/images/gallery/gallery-6.png",
  },
];

const Gallery = () => {
  const categories = [
    "All",
    "Campus",
    "Academics",
    "Activities",
    "Sports",
    "Events",
  ];

  const [galleryItems, setGalleryItems] = useState(defaultGalleryItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPublicGallery().then((data) => {
      if (data && data.length > 0) setGalleryItems(data);
    });
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  const previousImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => (img._id || img.id) === (selectedImage._id || selectedImage.id)
    );
    const prevIndex =
      currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => (img._id || img.id) === (selectedImage._id || selectedImage.id)
    );
    const nextIndex =
      currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#082b55]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[430px] w-[430px] rounded-full border-[70px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[430px] w-[430px] rounded-full border-[70px] border-[#f5b400]/10" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[340px] items-center py-10 sm:py-14 lg:min-h-[380px] lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 max-w-3xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f5b400] sm:text-sm">
                  Our Gallery
                </span>
                <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
              </div>

              <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Moments & Memories
                <span className="block text-[#f5b400]">At Kaizen School</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Explore photos of our campus, academic life, sports day, events,
                and student achievements.
              </p>

              <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/60">
                <Link to="/" className="transition-colors hover:text-[#f5b400]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b400]">Gallery</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}
      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                  Life At Kaizen
                </span>
                <span className="h-[2px] w-12 bg-[#f5b400]" />
              </div>

              <h2 className="mt-3 text-3xl font-black text-[#082b55] sm:text-4xl lg:text-[42px]">
                A Glimpse Into Our Journey
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                Every day brings something new — a new lesson, a new
                achievement, a new friendship and countless moments worth
                remembering.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-[#fafbfc] px-5 py-4 lg:self-auto">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#082b55] text-[#f5b400]">
                <Images size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Gallery
                </p>
                <p className="text-base font-black text-[#082b55]">
                  {galleryItems.length} Photos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER
      ====================================================== */}
      <section className="bg-white pb-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto border-b border-slate-100 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-md px-5 py-2.5 text-xs font-extrabold transition-all duration-300 sm:text-sm ${
                  activeCategory === category
                    ? "bg-[#082b55] text-[#f5b400] shadow-md"
                    : "bg-[#f8fafc] text-slate-500 hover:bg-[#fff4d0] hover:text-[#082b55]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          GALLERY GRID (DYNAMIC FROM BACKEND)
      ====================================================== */}
      <section className="bg-[#f8fafc] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99d00]">
                Photo Gallery
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#082b55] sm:text-3xl">
                School Life In Pictures
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 sm:flex">
              <Camera size={15} />
              Click any image to enlarge
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredImages.map((item, index) => (
              <motion.div
                layout
                key={item._id || item.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => setSelectedImage(item)}
                className="group relative h-[240px] cursor-pointer overflow-hidden rounded-2xl bg-slate-200 shadow-xs sm:h-[280px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/80 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Icon */}
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-[#f5b400] text-[#082b55] opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Camera size={20} />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#f5b400]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 text-base font-black text-white">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#082b55] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[45px] border-[#f5b400]/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                  Discover Kaizen
                </p>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  Want To Be Part Of Our
                  <span className="text-[#f5b400]"> Story?</span>
                </h2>
                <p className="mt-3 text-base leading-7 text-white/75 sm:text-lg">
                  Explore our academics, facilities and admissions to learn
                  more about life at The Kaizen School Bhana.
                </p>
              </div>

              <Link
                to="/admissions"
                className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[#f5b400] px-6 py-3.5 text-sm font-extrabold text-[#082b55] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Admissions
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020b18]/95 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#f5b400] hover:text-[#082b55] sm:right-7 sm:top-7"
            >
              <X size={20} />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#f5b400] hover:text-[#082b55] sm:left-7 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#f5b400] hover:text-[#082b55] sm:right-7 sm:h-12 sm:w-12"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex max-h-[90vh] max-w-[1100px] flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
              />

              <div className="mt-4 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f5b400]">
                  {selectedImage.category}
                </p>
                <h3 className="mt-1 text-lg font-black text-white sm:text-xl">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Gallery;