import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Bus,
  Dumbbell,
  FlaskConical,
  Library,
  Monitor,
} from "lucide-react";
import { motion } from "framer-motion";
import { getPublicFacilities } from "../services/publicApi";

const iconMap = {
  Monitor,
  FlaskConical,
  Building2,
  Library,
  Dumbbell,
  Bus,
};

const defaultFacilities = [
  {
    title: "Smart Classrooms",
    image: "/images/facilities/classroom.png",
    iconName: "Monitor",
  },
  {
    title: "Science Lab",
    image: "/images/facilities/science-lab.png",
    iconName: "FlaskConical",
  },
  {
    title: "Computer Lab",
    image: "/images/facilities/computer-lab.png",
    iconName: "Building2",
  },
  {
    title: "Library",
    image: "/images/facilities/library.png",
    iconName: "Library",
  },
  {
    title: "Sports Facilities",
    image: "/images/facilities/sports.png",
    iconName: "Dumbbell",
  },
  {
    title: "Transport",
    image: "/images/facilities/transport.png",
    iconName: "Bus",
  },
];

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState(defaultFacilities);

  useEffect(() => {
    getPublicFacilities().then((data) => {
      if (data && data.length > 0) setFacilities(data);
    });
  }, []);

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
              Our Facilities
            </span>

            <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
            Everything Students Need to Grow
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Modern facilities and a safe, inspiring environment designed to
            support learning, creativity, physical development and exploration.
          </p>
        </motion.div>

        {/* ================= FACILITY GRID ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {facilities.map((facility, index) => {
            const Icon = iconMap[facility.iconName] || Building2;

            return (
              <motion.div
                key={facility.title || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                className="group relative h-[245px] overflow-hidden rounded-xl shadow-sm"
              >
                {/* Image */}
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031a36]/95 via-[#082b55]/25 to-transparent" />

                {/* Top Icon */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#f5b400] group-hover:text-[#082b55]">
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="mb-2 h-[2px] w-8 bg-[#f5b400] transition-all duration-300 group-hover:w-14" />

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#f5b400]">
                        Facility
                      </p>

                      <h3 className="mt-1 text-lg font-extrabold text-white">
                        {facility.title}
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#082b55] opacity-0 translate-y-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;