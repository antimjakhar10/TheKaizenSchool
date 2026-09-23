import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  Brain,
  Building2,
  ShieldCheck,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { getPublicHero } from "../services/publicApi";

const iconMap = {
  BookOpen,
  Users,
  Brain,
  Building2,
  ShieldCheck,
  GraduationCap,
  Trophy,
};

const defaultFeatures = [
  {
    title: "Quality Education",
    description: "Focused on academic excellence and overall development.",
    iconName: "BookOpen",
  },
  {
    title: "Experienced Faculty",
    description: "Dedicated and qualified teachers guiding every student.",
    iconName: "Users",
  },
  {
    title: "Holistic Development",
    description: "Encouraging sports, arts and life skills for all-round growth.",
    iconName: "Brain",
  },
  {
    title: "Modern Infrastructure",
    description: "Smart classrooms, labs and advanced learning facilities.",
    iconName: "Building2",
  },
  {
    title: "Safe & Secure",
    description: "A secure environment to learn, explore and grow with confidence.",
    iconName: "ShieldCheck",
  },
];

const FeaturesSection = () => {
  const [features, setFeatures] = useState(defaultFeatures);

  useEffect(() => {
    getPublicHero().then((data) => {
      if (data && data.features && data.features.length > 0) {
        setFeatures(data.features);
      }
    });
  }, []);

  return (
    <section className="relative z-20 -mt-5 px-4 pb-8 sm:-mt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_15px_45px_rgba(8,43,85,0.10)]">
          <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.iconName] || BookOpen;

              return (
                <motion.div
                  key={feature.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group relative flex min-h-[205px] flex-col items-center justify-center px-6 py-7 text-center transition-all duration-300 hover:bg-[#fffaf0]"
                >
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#082b55] text-white shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#f5b400] group-hover:text-[#082b55] group-hover:shadow-lg">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    {/* Small gold accent */}
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#f5b400]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-[#082b55] sm:text-lg">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 max-w-[230px] text-xs leading-5 text-slate-500 sm:text-sm">
                    {feature.description}
                  </p>

                  {/* Bottom Hover Line */}
                  <span className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-[#f5b400] transition-all duration-300 group-hover:w-16" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;