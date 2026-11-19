import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ResilientImage } from './ResilientImage';
import { SITE_ASSETS } from '../data/siteData';

export const VisualStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      aria-label="Crew Landscapes Visual Statement"
      className="relative flex min-h-[72vh] sm:min-h-[82vh] w-full items-center overflow-hidden bg-[#151A1B] py-24 sm:py-32 text-white"
    >
      {/* Parallax Twilight Architectural Landscape Background */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <ResilientImage
          src={SITE_ASSETS.statementTwilight}
          alt="Twilight architectural garden terrace with cantilevered natural stone, calm reflecting basin, and warmly illuminated mature trees"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151A1B]/88 via-[#151A1B]/60 to-[#00464D]/48"
        />
      </motion.div>

      {/* Massive Bold Architectural Typography */}
      <div className="relative z-10 mx-auto w-[92%] max-w-[1440px]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 h-[2px] w-24 origin-left bg-[#B6C0C2]"
        />

        <h2 className="font-display font-extrabold uppercase tracking-[-0.035em] leading-[0.96] text-[clamp(2.65rem,7.2vw,6.75rem)]">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            YOUR OUTDOORS.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[#B6C0C2]"
          >
            YOUR VISION.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-white"
          >
            OUR <span className="text-[#08717A]">CREW.</span>
          </motion.span>
        </h2>
      </div>
    </section>
  );
};
