import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface CTASectionProps {
  onStartProject: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartProject }) => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-[#00464D] py-20 sm:py-28 lg:py-32 text-white"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#B6C0C2]">
              LET&apos;S GET STARTED
            </p>
            <h2
              id="cta-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.0] text-white text-[clamp(2.2rem,4.7vw,4.35rem)]"
            >
              READY TO TRANSFORM
              <br />
              <span className="text-[#B6C0C2]">YOUR OUTDOOR SPACE?</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 h-[2px] w-20 origin-left bg-[#B6C0C2]/70"
            />

            <p className="mt-6 max-w-[54ch] font-sans text-base sm:text-lg leading-[1.65] text-[#EDF1F1]/85">
              Tell us what you have in mind. Let&apos;s start planning your next landscape project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-stretch"
          >
            <button
              type="button"
              onClick={onStartProject}
              className="group inline-flex items-center justify-between gap-4 bg-white px-7 py-5 font-display text-xs font-extrabold tracking-[0.15em] uppercase text-[#00464D] transition-colors duration-200 hover:bg-[#EDF1F1] cursor-pointer whitespace-nowrap"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="group inline-flex items-center justify-between gap-4 border border-white/35 px-7 py-5 font-display text-xs font-bold tracking-[0.15em] uppercase text-white transition-colors duration-200 hover:border-white hover:bg-white/10 whitespace-nowrap"
            >
              <span>CALL CREW LANDSCAPES</span>
              <Phone className="h-4 w-4 text-[#B6C0C2] group-hover:text-white" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
