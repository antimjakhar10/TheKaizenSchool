import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicEvents } from "../services/publicApi";

const defaultEvents = [
  {
    title: "Annual Sports Meet 2025",
    date: "October 15, 2025",
    location: "School Sports Ground",
    description: "Inter-house sports competitions, races, and awards ceremony.",
    isUpcoming: true,
  },
  {
    title: "Science & Art Exhibition",
    date: "November 20, 2025",
    location: "School Auditorium",
    description: "Students showcasing creative projects, models, and artwork.",
    isUpcoming: true,
  },
];

const EventsSection = () => {
  const [events, setEvents] = useState(defaultEvents);

  useEffect(() => {
    getPublicEvents().then((data) => {
      if (data && data.length > 0) setEvents(data);
    });
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="bg-slate-50 py-8 sm:py-12 lg:py-14 border-y border-slate-100">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-4xl text-center sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-base">
              School Calendar
            </span>
            <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-[#082b55] sm:text-3xl md:text-4xl lg:text-5xl sm:whitespace-nowrap">
            Upcoming Events & Announcements
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Stay updated with all major school functions, sports meets, cultural celebrations, and academic exhibitions.
          </p>
        </motion.div>

        {/* EVENTS GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((item, index) => (
            <motion.div
              key={item._id || item.title || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f5b400]/40 hover:shadow-xl"
            >
              {item.image && (
                <div className="mb-4 h-44 w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700 border border-amber-200/60">
                  <Calendar size={13} />
                  {item.date}
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#082b55] bg-[#082b55]/5 px-2.5 py-1 rounded-md">
                  <Sparkles size={10} className="text-amber-500" />
                  Upcoming
                </span>
              </div>

              <h3 className="mt-4 text-xl font-black text-[#082b55] group-hover:text-amber-600 transition-colors">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 font-semibold">
                <MapPin size={15} className="text-amber-500 shrink-0" />
                <span>{item.location || "School Campus"}</span>
              </div>

              {item.description && (
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                  {item.description}
                </p>
              )}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082b55] transition-colors duration-300 hover:text-amber-600"
                >
                  Enquire About Event
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Gold Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
