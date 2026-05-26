import Hero from '@/components/Hero';
import SportsSection from '@/components/SportsSection';
import FeaturedFacilities from '@/components/FeaturedFacilities';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';


export default function Home() {
  return (
    <>
      <Hero />
      <SportsSection />
      <FeaturedFacilities />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
