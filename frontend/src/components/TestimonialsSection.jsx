import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getPublicTestimonials } from "../services/publicApi";

const defaultTestimonials = [
  {
    name: "Mrs. Priya Sharma",
    role: "Parent",
    initials: "PS",
    text: "The Kaizen School has created a wonderful learning environment. The teachers are caring, supportive and genuinely focused on every child's growth.",
  },
  {
    name: "Mr. Amit Kumar",
    role: "Parent",
    initials: "AK",
    text: "We are very happy with the academic approach and activities at the school. Our child has become more confident and enthusiastic about learning.",
  },
  {
    name: "Kavya",
    role: "Student",
    initials: "K",
    text: "I love my school because our teachers always encourage us to participate, ask questions and discover something new every day.",
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    getPublicTestimonials().then((data) => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  return (
    <section className="overflow-hidden bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#082b55] sm:text-sm">
              Testimonials
            </span>

            <span className="h-[2px] w-10 bg-[#f5b400] sm:w-14" />
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#082b55] sm:text-4xl lg:text-[42px]">
            What Our Community Says
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Hear from parents and students who are part of the Kaizen School
            family.
          </p>
        </motion.div>

        {/* ================= TESTIMONIAL CARDS ================= */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(8,43,85,0.07)] transition-all duration-300 hover:-translate-y-2 hover:border-[#f5b400]/30 hover:shadow-[0_18px_45px_rgba(8,43,85,0.12)] sm:p-7"
            >
              {/* Quote Icon */}
              <div className="absolute right-5 top-5 text-[#f5b400]/15 transition-colors duration-300 group-hover:text-[#f5b400]/30">
                <Quote size={55} strokeWidth={1.5} />
              </div>

              {/* Stars */}
              <div className="relative flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    fill="currentColor"
                    className="text-[#f5b400]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="relative mt-5 text-sm leading-7 text-slate-600">
                “{testimonial.text}”
              </p>

              {/* User */}
              <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#082b55] text-xs font-black text-[#f5b400] transition-all duration-300 group-hover:bg-[#f5b400] group-hover:text-[#082b55]">
                  {testimonial.initials || testimonial.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#082b55]">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Gold Bottom Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#f5b400] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;