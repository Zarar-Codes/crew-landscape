import React from 'react';
import { motion } from 'motion/react';

export const TestimonialSection: React.FC = () => {
  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="bg-[#B6C0C2] py-20 sm:py-28 lg:py-36 text-[#151A1B]"
    >
      <div className="mx-auto w-[92%] max-w-[1440px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Header Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="font-sans text-xs font-bold tracking-[0.24em] uppercase text-[#00464D]">
              CLIENT EXPERIENCE
            </p>
            <h2
              id="testimonial-heading"
              className="mt-4 font-display font-extrabold uppercase tracking-[-0.03em] leading-[1.04] text-[#151A1B] text-[clamp(1.9rem,3.2vw,2.9rem)]"
            >
              BUILT ON TRUST.
              <br />
              <span className="text-[#00464D]">REMEMBERED FOR THE WORK.</span>
            </h2>
            <div className="mt-8 h-[2px] w-16 bg-[#00464D]" />
          </motion.div>

          {/* Right Editorial Quote Stage */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-[#EDF1F1] p-8 sm:p-12 lg:p-16"
          >
            {/* Oversized Architectural Quotation Mark */}
            <div
              aria-hidden="true"
              className="font-display text-7xl sm:text-8xl font-extrabold leading-none text-[#005B63] select-none -mb-4 sm:-mb-6"
            >
              &ldquo;
            </div>

            <blockquote>
              <p className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-bold leading-[1.28] tracking-[-0.02em] text-[#151A1B]">
                From the very beginning, the entire team was professional, knowledgeable, and
                incredibly easy to work with.
              </p>
            </blockquote>

            <footer className="mt-10 flex items-center justify-between border-t border-[#202526]/12 pt-6">
              <cite className="not-italic font-display text-sm sm:text-base font-extrabold tracking-[0.18em] uppercase text-[#005B63]">
                — COLLEEN
              </cite>
              <span className="font-sans text-xs font-medium tracking-[0.14em] uppercase text-[#727D7F]">
                VERIFIED CLIENT TESTIMONIAL
              </span>
            </footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
