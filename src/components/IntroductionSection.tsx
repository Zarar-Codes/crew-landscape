import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ResilientImage } from './ResilientImage';
import { SITE_ASSETS } from '../data/siteData';

export const IntroductionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const secondaryOffsetY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      aria-labelledby="intro-heading"
      className="bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        {/* Top Editorial Split: Left Copy, Right Large Architectural Image */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pt-4"
          >
            <p className="font-sans text-xs font-bold tracking-[0.22em] uppercase text-[#005B63]">
              LANDSCAPE DESIGN &amp; CONSTRUCTION
            </p>

            <h2
              id="intro-heading"
              className="mt-5 font-display font-extrabold uppercase tracking-[-0.025em] leading-[1.04] text-[#202526] text-[clamp(2rem,3.6vw,3.35rem)]"
            >
              FROM THE FIRST IDEA
              <br />
              <span className="text-[#005B63]">TO THE FINISHED</span>
              <br />
              LANDSCAPE.
            </h2>

            {/* Subtle Animated Teal Architectural Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[2px] w-20 origin-left bg-[#005B63]"
            />

            <div className="mt-8 space-y-5 font-sans text-base sm:text-[17px] leading-[1.7] text-[#202526]/85">
              <p>
                Crew Landscapes designs and builds thoughtfully planned outdoor spaces throughout
                Chicago. From patios and gardens to complete landscape renovations, we bring the
                design and construction process together to create outdoor environments that reflect
                each client&apos;s vision, needs, and long-term plans.
              </p>
              <p className="text-[#727D7F]">
                Since 2014, our focus has been on quality work, attention to detail, and a
                collaborative process that carries each project from its initial concept through
                construction.
              </p>
            </div>
          </motion.div>

          {/* Right Primary Architectural Image */}
          <div className="lg:col-span-7">
            <motion.figure
              initial={{ clipPath: 'inset(0% 0% 12% 0%)', opacity: 0.6 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden"
            >
              <div className="overflow-hidden bg-[#EDF1F1] aspect-[4/3]">
                <ResilientImage
                  src={SITE_ASSETS.introPatio}
                  alt="Refined Chicago residential courtyard with bluestone and brick paver walkways, limestone seat walls, and structured hedges"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3.5 flex items-center justify-between gap-4 border-t border-[#202526]/10 pt-3 font-sans text-xs text-[#727D7F]">
                <span className="font-semibold uppercase tracking-[0.14em] text-[#202526]">
                  01 · Architectural Courtyard &amp; Hardscape
                </span>
                <span>Natural stone · Interlocking pavers · Layered planting</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>

        {/* Lower Asymmetric Overlapping Supporting Photography Composition */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
          {/* Left Overlapping Architectural Detail */}
          <motion.figure
            style={{ y: secondaryOffsetY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 lg:col-span-4 lg:-mt-28 z-10 group"
          >
            <div className="bg-white p-2 sm:p-3 border border-[#202526]/8">
              <div className="overflow-hidden bg-[#EDF1F1] aspect-[3/4]">
                <ResilientImage
                  src={SITE_ASSETS.introWalkway}
                  alt="Cut natural limestone walkway curving through shade perennials with brass landscape path lighting"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-xs text-[#727D7F]">
              <span className="font-semibold uppercase tracking-[0.14em] text-[#202526]">
                02 · Planting &amp; Path Lighting
              </span>
              <span>Stonework &amp; perennials</span>
            </figcaption>
          </motion.figure>

          {/* Right Offset Design & Material Plan Study */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 lg:col-span-6 lg:col-start-6 group"
          >
            <div className="overflow-hidden bg-[#EDF1F1] aspect-[4/3]">
              <ResilientImage
                src={SITE_ASSETS.galleryDesignPlan}
                alt="Landscape master plan drawing on drafting paper paired with natural bluestone and brick paver samples"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3.5 flex items-center justify-between gap-4 border-t border-[#202526]/10 pt-3 text-xs text-[#727D7F]">
              <span className="font-semibold uppercase tracking-[0.14em] text-[#202526]">
                03 · Concept Planning &amp; Material Curation
              </span>
              <span>Chicago · Design-Build since 2014</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
