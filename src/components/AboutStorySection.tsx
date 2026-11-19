import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { ABOUT_PILLARS, SITE_ASSETS } from '../data/siteData';

interface AboutStorySectionProps {
  onExploreApproach: () => void;
}

export const AboutStorySection: React.FC<AboutStorySectionProps> = ({
  onExploreApproach,
}) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#B6C0C2] py-20 sm:py-28 lg:py-36 text-[#202526]"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Editorial Header Row with EST. 2014 Architectural Milestone */}
        <div className="grid grid-cols-1 gap-8 border-b border-[#202526]/15 pb-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#00464D]">
              GET TO KNOW CREW
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-[#151A1B] text-[clamp(2.2rem,4.6vw,4.35rem)]"
            >
              DESIGN. CRAFT.
              <br />
              <span className="text-[#00464D]">BUILT TOGETHER.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col lg:items-end"
          >
            <span className="editorial-index font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#00464D]">
              EST. 2014
            </span>
            <span className="mt-2 font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#202526]/80">
              CHICAGO LANDSCAPE DESIGN &amp; CONSTRUCTION
            </span>
          </motion.div>
        </div>

        {/* Visual Split: Left Architectural Photo Composition, Right Structured Story Pillars */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Visual Composition */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ clipPath: 'inset(0% 0% 10% 0%)', opacity: 0.65 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden bg-[#EDF1F1]"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <ResilientImage
                  src={SITE_ASSETS.serviceLandscapeInstall}
                  alt="Completed natural stone patio with linear fire feature, layered ornamental plants, and warm landscape lighting"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>

            {/* Secondary Architectural Detail Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="sm:col-span-6 overflow-hidden bg-[#EDF1F1] aspect-[4/3] sm:aspect-auto"
              >
                <ResilientImage
                  src={SITE_ASSETS.galleryConstructionPrep}
                  alt="Organized landscape construction site with compacted crushed limestone base and staged natural stone pavers"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="sm:col-span-6 flex flex-col justify-between bg-[#EDF1F1] p-6 sm:p-7"
              >
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#005B63]">
                  THE CREW STANDARD
                </span>
                <p className="mt-4 font-sans text-sm sm:text-[15px] leading-[1.65] text-[#202526]">
                  Every project unites site planning, structural base work, quality stone, and
                  living plant material into a single disciplined build.
                </p>
                <div className="mt-6 h-[2px] w-12 bg-[#005B63]" />
              </motion.div>
            </div>
          </div>

          {/* Right Editorial Brand Story Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="divide-y divide-[#202526]/18 border-t border-b border-[#202526]/18">
              {ABOUT_PILLARS.map((pillar, idx) => (
                <motion.article
                  key={pillar.index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-12 gap-4 py-7 sm:py-8"
                >
                  <div className="col-span-2 sm:col-span-2">
                    <span className="editorial-index font-display text-xl sm:text-2xl font-extrabold text-[#00464D]">
                      {pillar.index}
                    </span>
                  </div>
                  <div className="col-span-10 sm:col-span-10">
                    <h3 className="font-display text-base sm:text-lg font-extrabold tracking-[0.04em] uppercase text-[#151A1B]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm sm:text-[15.5px] leading-[1.68] text-[#202526]/85">
                      {pillar.body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <button
                type="button"
                onClick={onExploreApproach}
                className="group inline-flex items-center gap-3 bg-[#00464D] px-7 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors duration-200 hover:bg-[#005B63] cursor-pointer whitespace-nowrap"
              >
                <span>GET TO KNOW OUR APPROACH</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
