import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { ServiceItem, ServiceOption } from '../data/siteData';

interface ServiceRowProps {
  service: ServiceItem;
  isActive: boolean;
  onActivate: () => void;
  onSelectService: (service: ServiceOption) => void;
}

export const ServiceRow: React.FC<ServiceRowProps> = ({
  service,
  isActive,
  onActivate,
  onSelectService,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`group relative border-t border-white/15 py-9 sm:py-12 transition-colors duration-300 ${
        isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
      }`}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-8 px-1 sm:px-3">
        {/* Column 1: Numerical Index */}
        <div className="lg:col-span-1 flex items-center justify-between lg:block">
          <span className="editorial-index font-display text-lg sm:text-xl font-bold text-[#B6C0C2]">
            {service.index}
          </span>
          <span className="lg:hidden font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#B6C0C2]">
            {service.scopeLabels[0]}
          </span>
        </div>

        {/* Column 2: Title, Description, Clean Unboxed Scope Metadata, Action */}
        <div className="lg:col-span-6">
          <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-extrabold uppercase tracking-[-0.02em] leading-[1.08] text-white transition-transform duration-300 group-hover:translate-x-1.5">
            {service.title}
          </h3>

          <p className="mt-4 max-w-[56ch] font-sans text-sm sm:text-base leading-[1.68] text-[#EDF1F1]/85">
            {service.description}
          </p>

          {/* Clean unboxed typographic scope list (zero pills) */}
          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-xs font-medium tracking-[0.06em] text-[#B6C0C2]">
            {service.scopeLabels.map((label, idx) => (
              <React.Fragment key={label}>
                <span>{label}</span>
                {idx < service.scopeLabels.length - 1 && (
                  <span aria-hidden="true" className="text-white/35">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-7">
            <button
              type="button"
              onClick={() => onSelectService(service.inquiryService)}
              className="group/btn inline-flex items-center gap-2.5 border-b border-[#B6C0C2]/55 pb-1.5 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-all duration-200 hover:border-white hover:text-[#EDF1F1] cursor-pointer whitespace-nowrap"
            >
              <span>{service.ctaLabel}</span>
              <ArrowUpRight
                className="h-4 w-4 text-[#B6C0C2] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Column 3: Large Architectural Service Photograph */}
        <div className="lg:col-span-5">
          <button
            type="button"
            onClick={() => onSelectService(service.inquiryService)}
            aria-label={`${service.title} — ${service.ctaLabel}`}
            className="block w-full overflow-hidden bg-[#151A1B] text-left cursor-pointer"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <ResilientImage
                src={service.image}
                alt={service.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#00464D]/45 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-20"
              />
            </div>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
