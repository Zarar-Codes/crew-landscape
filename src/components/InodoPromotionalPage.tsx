import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { BUSINESS_INFO } from '../data/siteData';

export type InodoLayoutVariant =
  | 'centered'
  | 'left-split'
  | 'asymmetric'
  | 'layered'
  | 'spotlight';

interface InodoPromotionalPageProps {
  backgroundImage: string;
  secondaryImage?: string;
  imageAlt: string;
  variant: InodoLayoutVariant;
}

export const InodoPromotionalPage: React.FC<InodoPromotionalPageProps> = ({
  backgroundImage,
  secondaryImage,
  imageAlt,
  variant,
}) => {
  const isLeftAligned = variant === 'left-split' || variant === 'asymmetric';

  const containerAlignment =
    variant === 'centered' || variant === 'layered' || variant === 'spotlight'
      ? 'items-center text-center'
      : 'items-start text-left';

  return (
    <main className="relative flex h-[100dvh] min-h-[620px] w-full flex-col justify-between overflow-hidden bg-[#151A1B] text-white">
      {/* Full-Viewport Cinematic Background with Animated Mask Reveal */}
      <motion.div
        initial={{ clipPath: 'inset(0% 0% 8% 0%)', scale: 1.07 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <ResilientImage
          src={backgroundImage}
          alt={imageAlt}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />

        {/* Variant-tailored Dark Charcoal & Deep Teal Scrim */}
        {variant === 'left-split' ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#151A1B]/95 via-[#151A1B]/80 to-[#00464D]/45"
          />
        ) : variant === 'asymmetric' ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-[#151A1B]/95 via-[#00464D]/65 to-[#151A1B]/45"
          />
        ) : variant === 'spotlight' ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,70,77,0.72)_0%,rgba(21,26,27,0.94)_75%)]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#151A1B]/78 via-[#151A1B]/72 to-[#00464D]/82"
          />
        )}
      </motion.div>

      {/* Architectural Decorative Frame Lines */}
      <div aria-hidden="true" className="pointer-events-none relative z-10 mx-auto w-[92%] max-w-[1440px] pt-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-full origin-left bg-[#B6C0C2]/30"
        />
      </div>

      {/* Main Viewport Composition */}
      <div className="relative z-10 mx-auto flex w-[92%] max-w-[1440px] flex-1 items-center py-8">
        {variant === 'left-split' && secondaryImage ? (
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <PromoContent alignment="items-start text-left" variant={variant} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="border border-[#B6C0C2]/30 p-3 bg-[#151A1B]/55">
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={secondaryImage}
                    alt={imageAlt}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ) : variant === 'layered' && secondaryImage ? (
          <div className="relative flex w-full flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.38, x: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[260px] aspect-[3/4] border border-[#B6C0C2]/25 overflow-hidden"
            >
              <ResilientImage
                src={secondaryImage}
                alt=""
                loading="eager"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
              <PromoContent alignment="items-center text-center" variant={variant} />
            </div>
          </div>
        ) : (
          <div
            className={`flex w-full flex-col ${containerAlignment} ${
              variant === 'asymmetric' ? 'lg:pl-12 max-w-4xl' : 'mx-auto max-w-4xl'
            }`}
          >
            <PromoContent alignment={containerAlignment} variant={variant} isLeft={isLeftAligned} />
          </div>
        )}
      </div>

      {/* Bottom Signature Line Only */}
      <div className="relative z-10 mx-auto w-[92%] max-w-[1440px] pb-8">
        <div className="flex items-center justify-between border-t border-[#B6C0C2]/25 pt-5">
          <p className="font-sans text-xs tracking-[0.14em] text-[#B6C0C2]">
            Website concept designed by InoDo.
          </p>
          <span className="h-px w-12 bg-[#08717A]" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
};

interface PromoContentProps {
  alignment: string;
  variant: InodoLayoutVariant;
  isLeft?: boolean;
}

const PromoContent: React.FC<PromoContentProps> = ({ alignment, variant }) => {
  const isCentered = alignment.includes('text-center');

  return (
    <div className={`flex flex-col ${alignment}`}>
      {/* Exact Required Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-xs sm:text-[13px] font-bold tracking-[0.26em] uppercase text-[#B6C0C2]"
      >
        A WEBSITE CONCEPT BY INODO
      </motion.p>

      {/* Pale Blue-Gray Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-6 h-[2px] w-16 bg-[#08717A] ${isCentered ? 'origin-center' : 'origin-left'}`}
      />

      {/* Exact Required Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.98] text-white text-[clamp(2.6rem,6.8vw,6rem)]"
      >
        LIKE WHAT YOU SEE?
      </motion.h1>

      {/* Exact Required Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-6 font-sans text-base sm:text-xl leading-[1.6] text-[#EDF1F1]/90 ${
          isCentered ? 'max-w-[44ch]' : 'max-w-[48ch]'
        }`}
      >
        Let&apos;s build something extraordinary for your business.
      </motion.p>

      {/* Exact Required Primary & Secondary CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-10 flex flex-wrap items-center gap-4 ${
          isCentered ? 'justify-center' : 'justify-start'
        }`}
      >
        <a
          href={BUSINESS_INFO.inodoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-3 px-8 py-4 font-display text-xs font-extrabold tracking-[0.15em] uppercase text-white transition-colors duration-200 whitespace-nowrap ${
            variant === 'spotlight'
              ? 'bg-[#08717A] hover:bg-[#005B63] shadow-[0_12px_36px_rgba(0,91,99,0.45)]'
              : 'bg-[#005B63] hover:bg-[#08717A]'
          }`}
        >
          <span>HIRE INODO TO BUILD THIS</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 border border-white/40 bg-[#151A1B]/45 px-7 py-4 font-display text-xs font-bold tracking-[0.15em] uppercase text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#151A1B] whitespace-nowrap"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          <span>BACK TO HOMEPAGE</span>
        </Link>
      </motion.div>
    </div>
  );
};
