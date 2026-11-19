import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { ProjectLightbox } from './ProjectLightbox';
import {
  GALLERY_ITEMS,
  GalleryCategory,
  ServiceOption,
} from '../data/siteData';

interface ProjectGalleryProps {
  onSelectProjectInquiry: (service: ServiceOption) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Completed Projects',
  'During Construction',
  'Design',
];

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onSelectProjectInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const getSpanClass = (index: number, total: number): string => {
    if (total === 1) return 'md:col-span-12';
    if (total === 2) return 'md:col-span-6';
    // Asymmetric architectural editorial rhythm
    const pattern = [
      'md:col-span-7', // Oversized featured
      'md:col-span-5', // Tall architectural study
      'md:col-span-5', // Medium left
      'md:col-span-7', // Wide right
      'md:col-span-8', // Sweeping wide
      'md:col-span-4', // Compact upright
    ];
    return pattern[index % pattern.length];
  };

  const getAspectClass = (index: number, total: number): string => {
    if (total === 1) return 'aspect-[16/9]';
    const pattern = [
      'aspect-[4/3] lg:aspect-[16/11]',
      'aspect-[4/3] lg:aspect-[10/11]',
      'aspect-[4/3]',
      'aspect-[16/10]',
      'aspect-[16/9]',
      'aspect-[4/3] lg:aspect-[4/5]',
    ];
    return pattern[index % pattern.length];
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white py-20 sm:py-28 lg:py-36 text-[#202526]"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Editorial Header & Interactive Category Filter Controls */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#202526]/12 pb-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#005B63]">
              SELECTED WORK
            </p>
            <h2
              id="projects-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-[#151A1B] text-[clamp(2.2rem,4.6vw,4.35rem)]"
            >
              THE WORK SPEAKS
              <br />
              <span className="text-[#005B63]">FOR ITSELF.</span>
            </h2>
          </motion.div>

          {/* Interactive Category Filter Tabs */}
          <div className="lg:col-span-5 flex flex-col lg:items-end gap-4">
            <div
              role="tablist"
              aria-label="Filter gallery by project phase"
              className="flex flex-wrap items-center gap-1.5 bg-[#EDF1F1] p-1.5"
            >
              {CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveCategory(category);
                      setLightboxIndex(null);
                    }}
                    className={`px-3.5 py-2 font-sans text-xs font-semibold tracking-[0.06em] transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#005B63] text-white'
                        : 'text-[#202526]/75 hover:text-[#005B63]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <p className="font-sans text-xs text-[#727D7F]">
              Representative architectural landscape imagery illustrating design, base construction,
              and finished environments.
            </p>
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12">
          {filteredItems.map((item, idx) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col ${getSpanClass(idx, filteredItems.length)}`}
            >
              {/* Image Container Triggering Lightbox */}
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${item.title} in fullscreen gallery`}
                className="relative w-full overflow-hidden bg-[#EDF1F1] text-left cursor-pointer"
              >
                <div className={`w-full overflow-hidden ${getAspectClass(idx, filteredItems.length)}`}>
                  <ResilientImage
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Subtle Architectural Hover Scrim & Expand Affordance */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#151A1B]/0 transition-colors duration-300 group-hover:bg-[#151A1B]/20"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center bg-white/95 text-[#151A1B] opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>

              {/* Editorial Caption & Pre-filled Inquiry Trigger */}
              <div className="mt-4 flex flex-col justify-between gap-4 border-t border-[#202526]/12 pt-4 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#005B63]">
                    <span className="editorial-index">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg sm:text-xl font-extrabold uppercase tracking-[-0.015em] text-[#151A1B]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-[52ch] font-sans text-sm leading-relaxed text-[#727D7F]">
                    {item.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProjectInquiry(item.inquiryService)}
                  className="group/cta inline-flex items-center gap-1.5 self-start font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#005B63] hover:text-[#00464D] transition-colors cursor-pointer whitespace-nowrap shrink-0 pt-1"
                >
                  <span>{item.ctaLabel}</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Lead-Generation Conversion Strip Below Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 gap-6 bg-[#EDF1F1] p-8 sm:p-10 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-bold tracking-[0.22em] uppercase text-[#005B63]">
              PLANNING A NEW PATIO?
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-[-0.02em] text-[#151A1B]">
              LET&apos;S DISCUSS YOUR LANDSCAPE.
            </h3>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => onSelectProjectInquiry('Brick Paving')}
              className="group inline-flex items-center gap-2.5 bg-[#005B63] px-6 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-[#00464D] cursor-pointer whitespace-nowrap"
            >
              <span>START A SIMILAR PROJECT</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>
      </div>

      <ProjectLightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(next) => setLightboxIndex(next)}
        onInquire={onSelectProjectInquiry}
      />
    </section>
  );
};
