import { useEffect, useState } from "react";
import { ArrowUpRight, Images } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicGallery } from "../services/publicApi";

const defaultGalleryImages = [
  {
    image: "/images/gallery/gallery-1.png",
    title: "School Campus",
    category: "Campus",
  },
  {
    image: "/images/gallery/gallery-2.png",
    title: "Annual Function",
    category: "Events",
  },
  {
    image: "/images/gallery/gallery-3.png",
    title: "Students Activities",
    category: "Activities",
  },
  {
    image: "/images/gallery/gallery-4.png",
    title: "Sports Day",
    category: "Sports",
  },
  {
    image: "/images/gallery/gallery-5.png",
    title: "Learning Moments",
    category: "Education",
  },
];

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(defaultGalleryImages);

  useEffect(() => {
    getPublicGallery().then((data) => {
      if (data && data.length > 0) setGalleryImages(data);
    });
  }, []);

  const featured = galleryImages[0] || defaultGalleryImages[0];
  const others = galleryImages.slice(1);

  return (
    <section className="bg-[#fafbfc] py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
                Our Gallery
              </span>

              <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
              Moments That Matter
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Take a glimpse into our vibrant school life, memorable events,
              activities and everyday learning experiences.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            to="/gallery"
            className="group hidden shrink-0 items-center gap-2 text-sm font-bold text-[#082b55] md:inline-flex"
          >
            View Full Gallery

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#082b55]/20 transition-all duration-300 group-hover:border-[#f5b400] group-hover:bg-[#f5b400]">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* ================= GALLERY ================= */}
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="group relative min-h-[330px] overflow-hidden rounded-2xl sm:min-h-[430px] lg:min-h-[500px]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#031a36]/90 via-transparent to-transparent" />

            {/* Image Icon */}
            <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md">
              <Images size={19} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5b400]">
                {featured.category}
              </p>

              <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                {featured.title}
              </h3>
            </div>
          </motion.div>

          {/* Smaller Images */}
          <div className="grid grid-cols-2 gap-4">
            {others.map((item, index) => (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative min-h-[180px] overflow-hidden rounded-xl sm:min-h-[210px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031a36]/85 via-transparent to-transparent opacity-90" />

                {/* Arrow */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#082b55] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#f5b400]">
                    {item.category}
                  </p>

                  <h3 className="mt-0.5 text-sm font-extrabold text-white sm:text-base">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center md:hidden">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-md bg-[#082b55] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#f5b400] hover:text-[#082b55]"
          >
            View Full Gallery
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;