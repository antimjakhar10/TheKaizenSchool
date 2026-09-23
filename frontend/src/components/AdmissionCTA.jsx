import { ArrowRight, CheckCircle2, GraduationCap, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdmissionCTA = () => {
  const points = [
    "Nurturing Learning Environment",
    "Experienced & Caring Faculty",
    "Holistic Student Development",
  ];

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-2xl bg-[#082b55] shadow-[0_20px_55px_rgba(8,43,85,0.18)]">

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[45px] border-white/5" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[45px] border-[#f5b400]/10" />

          {/* Gold Accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-[#f5b400]" />

          <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-14 xl:px-16">

            {/* ================= CONTENT ================= */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b400]/30 bg-[#f5b400]/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#f5b400]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#f5b400] sm:text-xs">
                  Admissions Open 2026
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[44px]">
                Give Your Child the
                <span className="block text-[#f5b400]">
                  Right Start
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Join The Kaizen School Bhana and give your child an
                environment where curiosity is encouraged, talent is nurtured
                and every achievement matters.
              </p>

              {/* Points */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-xs font-medium text-white/80"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#f5b400]"
                    />

                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ================= CTA ================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <Link
                to="/admissions"
                className="group inline-flex min-w-[175px] items-center justify-center gap-2 rounded-md bg-[#f5b400] px-6 py-3.5 text-sm font-extrabold text-[#082b55] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                Apply for Admission

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-w-[175px] items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                <Phone size={16} />

                Contact School
              </Link>
            </motion.div>

          </div>

          {/* Bottom Mini Badge */}
          <div className="absolute bottom-3 right-5 hidden items-center gap-2 text-[10px] font-semibold text-white/30 sm:flex">
            <GraduationCap size={14} />
            Read • Lead • Succeed
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionCTA;