import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceRow } from './ServiceRow';
import { SERVICES, ServiceOption } from '../data/siteData';

interface ServiceSectionProps {
  onSelectService: (service: ServiceOption) => void;
  onDiscussProject: () => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  onSelectService,
  onDiscussProject,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#00464D] py-20 sm:py-28 lg:py-36 text-white"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#B6C0C2]">
              WHAT WE DO
            </p>
            <h2
              id="services-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-white text-[clamp(2.2rem,4.6vw,4.3rem)]"
            >
              SPACES THAT WORK.
              <br />
              <span className="text-[#B6C0C2]">LANDSCAPES THAT LAST.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:text-right"
          >
            <p className="font-sans text-sm sm:text-[15px] leading-[1.65] text-[#EDF1F1]/80 lg:ml-auto lg:max-w-[36ch]">
              Residential design-build construction and year-round commercial property care across
              Chicago.
            </p>
          </motion.div>
        </div>

        {/* Editorial Full-Width Service Rows */}
        <div className="border-b border-white/15">
          {SERVICES.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              isActive={activeServiceId === service.id}
              onActivate={() => setActiveServiceId(service.id)}
              onSelectService={onSelectService}
            />
          ))}
        </div>

        {/* Bottom Conversion Bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <p className="font-sans text-sm sm:text-base text-[#B6C0C2]">
            Not sure which scope fits your property? We help plan residential and commercial outdoor
            spaces from the ground up.
          </p>
          <button
            type="button"
            onClick={onDiscussProject}
            className="group inline-flex items-center gap-3 bg-white px-7 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase text-[#00464D] transition-colors duration-200 hover:bg-[#EDF1F1] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>DISCUSS YOUR LANDSCAPE PROJECT</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
