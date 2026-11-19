import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CrewLogo } from './CrewLogo';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from '../data/siteData';

interface NavbarProps {
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#202526]/10 shadow-[0_4px_24px_rgba(21,26,27,0.06)] py-3.5'
            : 'bg-gradient-to-b from-[#151A1B]/70 via-[#151A1B]/30 to-transparent border-b border-white/15 py-5'
        }`}
      >
        <div className="mx-auto flex w-[92%] max-w-[1440px] items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            aria-label="Crew Landscapes Home"
            className="group whitespace-nowrap shrink-0"
          >
            <CrewLogo variant={isScrolled ? 'dark' : 'light'} />
          </Link>

          {/* Zone 2: Horizontal Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative py-1 font-sans text-[12px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isScrolled
                      ? isActive
                        ? 'text-[#005B63]'
                        : 'text-[#202526] hover:text-[#005B63]'
                      : isActive
                        ? 'text-white'
                        : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] w-full origin-left transition-transform duration-300 ${
                      isScrolled ? 'bg-[#005B63]' : 'bg-[#B6C0C2]'
                    } ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onStartProject}
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 font-display text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                isScrolled
                  ? 'bg-[#005B63] text-white hover:bg-[#00464D]'
                  : 'bg-white text-[#151A1B] hover:bg-[#EDF1F1]'
              }`}
            >
              <span>LET&apos;S DISCUSS YOUR PROJECT</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
              className={`inline-flex lg:hidden h-11 w-11 items-center justify-center transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-[#202526] hover:text-[#005B63]'
                  : 'text-white hover:text-[#B6C0C2]'
              }`}
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onStartProject={() => {
          setIsMobileOpen(false);
          onStartProject();
        }}
      />
    </>
  );
};
