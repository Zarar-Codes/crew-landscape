import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp, Instagram } from 'lucide-react';
import { CrewLogo } from './CrewLogo';
import { BUSINESS_INFO, NAV_ITEMS, SERVICES, ServiceOption } from '../data/siteData';

interface FooterProps {
  onSelectService: (service: ServiceOption) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151A1B] pt-20 pb-12 text-white">
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Large Closing Brand Statement */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-9"
          >
            <p className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.98] text-white text-[clamp(2.2rem,5.2vw,4.8rem)]">
              GOOD DESIGN.
              <br />
              <span className="text-[#B6C0C2]">GREAT CRAFT.</span>
              <br />
              OUTDOOR LIVING.
            </p>
          </motion.div>

          <div className="lg:col-span-3 flex lg:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex items-center gap-3 border border-white/25 px-5 py-3.5 font-display text-[11px] font-bold tracking-[0.18em] uppercase text-white transition-colors duration-200 hover:border-[#08717A] hover:bg-[#00464D] cursor-pointer whitespace-nowrap"
            >
              <span>BACK TO TOP</span>
              <ArrowUp
                className="h-4 w-4 text-[#B6C0C2] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Animated Architectural Hairline Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-full origin-left bg-white/15"
        />

        {/* Structured Footer Columns */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" aria-label="Crew Landscapes Home">
              <CrewLogo variant="light" showSubtext />
            </Link>
            <p className="max-w-[34ch] font-sans text-sm leading-[1.7] text-[#B6C0C2]">
              Landscape design, brick paving, outdoor living construction, and commercial property
              care serving Chicago since {BUSINESS_INFO.established}.
            </p>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-xs font-semibold tracking-[0.14em] uppercase text-white hover:text-[#B6C0C2] transition-colors"
            >
              <Instagram className="h-4 w-4 text-[#08717A]" aria-hidden="true" />
              <span>@crew_landscapes</span>
            </a>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#B6C0C2]">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-sans text-sm text-[#EDF1F1]/85 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Overview Column */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#B6C0C2]">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.inquiryService)}
                    className="text-left font-sans text-sm text-[#EDF1F1]/85 hover:text-white transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#B6C0C2]">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm text-[#EDF1F1]/85">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="hover:text-white transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="text-[#B6C0C2]">{BUSINESS_INFO.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-[#727D7F] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Crew Landscapes. All rights reserved.</p>
          <p>
            Website redesign concept by{' '}
            <a
              href={BUSINESS_INFO.inodoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B6C0C2] hover:text-white transition-colors underline underline-offset-4"
            >
              InoDo
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
