import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { GalleryItem, ServiceOption } from '../data/siteData';

interface ProjectLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  onInquire: (service: ServiceOption) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onNavigate,
  onInquire,
}) => {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const activeItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + items.length) % items.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && activeItem && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery view: ${activeItem.title}`}
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-[#151A1B]/96 p-4 sm:p-8 text-white"
        >
          {/* Top Bar */}
          <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-[#B6C0C2]">
              <span className="editorial-index font-display font-bold text-white">
                {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.category}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-[#151A1B] cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Center Image Stage */}
          <div className="mx-auto my-4 flex w-full max-w-[1360px] flex-1 items-center justify-center overflow-hidden">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[65vh] w-full flex items-center justify-center"
            >
              <ResilientImage
                src={activeItem.image}
                alt={activeItem.alt}
                loading="eager"
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </div>

          {/* Bottom Caption, Controls & Inquiry Action */}
          <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5 border-t border-white/15 pt-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                {activeItem.title}
              </h3>
              <p className="mt-2 font-sans text-sm sm:text-[15px] leading-relaxed text-[#B6C0C2]">
                {activeItem.caption}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
                  aria-label="Previous photograph"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-[#151A1B] cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex + 1) % items.length)}
                  aria-label="Next photograph"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-[#151A1B] cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire(activeItem.inquiryService);
                }}
                className="inline-flex items-center gap-2.5 bg-[#005B63] px-6 py-3.5 font-display text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-[#08717A] cursor-pointer whitespace-nowrap"
              >
                <span>START A SIMILAR PROJECT</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
