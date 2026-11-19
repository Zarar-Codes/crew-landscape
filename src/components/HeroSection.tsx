import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { SITE_ASSETS } from '../data/siteData';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onStartProject: () => void;
}

const HEADLINE_LINES = [
  ['OUTDOOR', 'SPACES.'],
  ['BUILT', 'WITH', 'PURPOSE.'],
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onStartProject,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Crew Landscapes Hero"
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#151A1B] text-white"
    >
      {/* Background Cinematic Photography with Mask Reveal & Subtle Parallax */}
      <motion.div
        initial={{ clipPath: 'inset(0% 0% 10% 0%)', opacity: 0.75 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="h-full w-full will-change-transform"
        >
          <ResilientImage
            src={SITE_ASSETS.hero}
            alt="Architectural outdoor living patio with carved natural stone fire feature, wood terrace, reflecting pool, and structured garden trees"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Measured Architectural Scrim for Guaranteed WCAG AA Legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151A1B]/92 via-[#151A1B]/52 to-[#151A1B]/42"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#00464D]/55 via-transparent to-transparent"
        />
      </motion.div>

      {/* Main Editorial Content Container */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-[92%] max-w-[1440px] pt-36 pb-10 sm:pb-14 lg:pb-16"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          {/* Primary Headline & CTA Column */}
          <div className="lg:col-span-9">
            {/* Eyebrow — Clean Unboxed Typography */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 font-sans text-xs sm:text-[13px] font-semibold tracking-[0.24em] uppercase text-[#B6C0C2]"
            >
              LANDSCAPE DESIGN · CONSTRUCTION · OUTDOOR LIVING
            </motion.p>

            {/* Oversized Word-by-Word Sora ExtraBold Headline */}
            <h1 className="font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.98] text-white text-[clamp(2.55rem,6.4vw,5.75rem)]">
              {HEADLINE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.map((word, wordIdx) => {
                    const globalIdx = lineIdx * 3 + wordIdx;
                    const isAccentWord = word === 'PURPOSE.';
                    return (
                      <span
                        key={word}
                        className="inline-block overflow-hidden align-bottom mr-[0.24em] last:mr-0"
                      >
                        <motion.span
                          initial={{ y: '105%', opacity: 0 }}
                          animate={{ y: '0%', opacity: 1 }}
                          transition={{
                            duration: 0.72,
                            delay: 0.22 + globalIdx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`inline-block ${isAccentWord ? 'text-[#B6C0C2]' : 'text-white'}`}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[62ch] font-sans text-base sm:text-lg leading-[1.65] text-[#EDF1F1]/90"
            >
              From thoughtful landscape design to carefully executed construction, Crew Landscapes
              creates outdoor environments designed around the way you live.
            </motion.p>

            {/* Staggered CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onExploreProjects}
                className="group inline-flex items-center gap-3 bg-[#005B63] px-7 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-all duration-200 hover:bg-[#08717A] cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE OUR PROJECTS</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onStartProject}
                className="group inline-flex items-center gap-3 border border-white/45 bg-[#151A1B]/45 px-7 py-4 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#151A1B] cursor-pointer whitespace-nowrap"
              >
                <span>START YOUR PROJECT</span>
              </button>
            </motion.div>
          </div>

          {/* Right Editorial Metadata Rail */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-3 flex-col items-end text-right"
          >
            <div className="h-px w-14 bg-[#B6C0C2]/60 mb-4" />
            <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-white">
              LANDSCAPE DESIGN &amp; BUILD
            </span>
            <span className="mt-2 font-sans text-xs tracking-[0.14em] uppercase text-[#B6C0C2]">
              CHICAGO, ILLINOIS · EST. 2014
            </span>
          </motion.div>
        </div>

        {/* Bottom Architectural Bar: Scroll Indicator + Editorial Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.82 }}
          className="mt-14 flex items-center justify-between border-t border-white/15 pt-5"
        >
          <a
            href="#introduction"
            className="group inline-flex items-center gap-3 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-[#EDF1F1] hover:text-white transition-colors"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex h-8 w-8 items-center justify-center border border-white/30"
            >
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
            <span>SCROLL TO EXPLORE</span>
          </a>

          <span className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B6C0C2] lg:hidden">
            LANDSCAPE DESIGN &amp; BUILD
          </span>

          <span className="hidden lg:inline-block font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#B6C0C2]">
            CREW LANDSCAPES · ARCHITECTURAL OUTDOOR ENVIRONMENTS
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
