import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import AboutSection from "../components/AboutSection";
import StatsSection from "../components/StatsSection";
import AcademicsSection from "../components/AcademicsSection";
import FacilitiesSection from "../components/FacilitiesSection";
import GallerySection from "../components/GallerySection";
import EventsSection from "../components/EventsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import AdmissionCTA from "../components/AdmissionCTA";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <StatsSection />
      <AcademicsSection />
      <FacilitiesSection />
      <GallerySection />
      <EventsSection />
      <TestimonialsSection />
      <AdmissionCTA />
    </main>
  );
};

export default Home;