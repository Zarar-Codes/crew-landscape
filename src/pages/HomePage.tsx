import React, { useCallback, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { IntroductionSection } from '../components/IntroductionSection';
import { AboutStorySection } from '../components/AboutStorySection';
import { ServiceSection } from '../components/ServiceSection';
import { ProjectGallery } from '../components/ProjectGallery';
import { TestimonialSection } from '../components/TestimonialSection';
import { ProcessSection } from '../components/ProcessSection';
import { VisualStatement } from '../components/VisualStatement';
import { CTASection } from '../components/CTASection';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { ServiceOption } from '../data/siteData';

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceOption>('Brick Paving');

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleInquiryWithService = useCallback(
    (service: ServiceOption) => {
      setSelectedService(service);
      scrollToSection('contact');
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-white text-[#202526]">
      <Navbar onStartProject={() => scrollToSection('contact')} />

      <main>
        {/* Section 01 — Cinematic Hero */}
        <HeroSection
          onExploreProjects={() => scrollToSection('projects')}
          onStartProject={() => scrollToSection('contact')}
        />

        {/* Section 02 — Stronger Brand Introduction */}
        <IntroductionSection />

        {/* Section 03 — About Crew Landscapes / Visual Brand Story */}
        <AboutStorySection onExploreApproach={() => scrollToSection('process')} />

        {/* Section 04 — Services Showcase */}
        <ServiceSection
          onSelectService={handleInquiryWithService}
          onDiscussProject={() => scrollToSection('contact')}
        />

        {/* Section 05 — Project Gallery */}
        <ProjectGallery onSelectProjectInquiry={handleInquiryWithService} />

        {/* Section 06 — Testimonials */}
        <TestimonialSection />

        {/* Section 07 — Our Process + Interactive 3D Site Study */}
        <ProcessSection />

        {/* Section 08 — Cinematic Visual Statement */}
        <VisualStatement />

        {/* Section 09 — Conversion CTA */}
        <CTASection onStartProject={() => scrollToSection('contact')} />

        {/* Section 10 — Contact Form */}
        <ContactForm
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      {/* Section 11 — Footer */}
      <Footer onSelectService={handleInquiryWithService} />
    </div>
  );
};

export default HomePage;
