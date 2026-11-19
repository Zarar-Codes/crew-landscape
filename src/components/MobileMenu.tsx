import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { CrewLogo } from './CrewLogo';
import { BUSINESS_INFO, NAV_ITEMS } from '../data/siteData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#151A1B] text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Link to="/" onClick={onClose} aria-label="Crew Landscapes Home">
              <CrewLogo variant="light" showSubtext />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white hover:border-[#08717A] hover:text-[#B6C0C2] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Bold Architectural Links */}
          <nav className="flex flex-1 flex-col justify-center px-6 py-8">
            <ul className="space-y-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = location.pathname === item.to;
                return (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + idx * 0.05,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className={`group flex items-baseline justify-between border-b border-white/10 py-3 transition-colors ${
                        isActive ? 'text-[#08717A]' : 'text-white hover:text-[#B6C0C2]'
                      }`}
                    >
                      <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
                        {item.label}
                      </span>
                      <span className="editorial-index font-sans text-xs font-medium tracking-[0.2em] text-[#B6C0C2]">
                        0{idx + 1}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Action & Verified Contact */}
          <div className="border-t border-white/10 bg-[#00464D]/40 px-6 py-6">
            <button
              type="button"
              onClick={onStartProject}
              className="flex w-full items-center justify-between bg-[#005B63] px-5 py-4 font-display text-xs font-bold tracking-[0.16em] uppercase text-white hover:bg-[#08717A] transition-colors cursor-pointer"
            >
              <span>LET&apos;S DISCUSS YOUR PROJECT</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#B6C0C2]">
              <a href={BUSINESS_INFO.phoneHref} className="hover:text-white transition-colors">
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <a href={BUSINESS_INFO.emailHref} className="hover:text-white transition-colors">
                {BUSINESS_INFO.email}
              </a>
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
