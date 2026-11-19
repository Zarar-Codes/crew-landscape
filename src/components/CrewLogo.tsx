import React from 'react';

interface CrewLogoProps {
  variant?: 'light' | 'dark';
  showSubtext?: boolean;
  className?: string;
}

export const CrewLogo: React.FC<CrewLogoProps> = ({
  variant = 'dark',
  showSubtext = false,
  className = '',
}) => {
  const shieldFill = variant === 'light' ? '#FFFFFF' : '#005B63';
  const innerStroke = variant === 'light' ? '#00464D' : '#FFFFFF';
  const textColor = variant === 'light' ? 'text-white' : 'text-[#202526]';
  const subColor = variant === 'light' ? 'text-[#B6C0C2]' : 'text-[#005B63]';

  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none ${className}`}>
      <svg
        width="34"
        height="38"
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
      >
        {/* Architectural Shield Emblem */}
        <path
          d="M18 1.5L33.5 6.8V20.6C33.5 29.7 26.8 35.8 18 38.6C9.2 35.8 2.5 29.7 2.5 20.6V6.8L18 1.5Z"
          fill={shieldFill}
        />
        {/* Inner Architectural Shield Contour */}
        <path
          d="M18 4.8L30.2 9V20.4C30.2 27.6 24.9 32.6 18 35C11.1 32.6 5.8 27.6 5.8 20.4V9L18 4.8Z"
          stroke={innerStroke}
          strokeWidth="1.4"
          strokeOpacity="0.9"
        />
        {/* Geometric Terrace & Botanical Chevron Mark */}
        <path
          d="M12.2 15.6C13.6 13.8 15.7 12.8 18 12.8C20.5 12.8 22.6 13.9 24 15.8"
          stroke={innerStroke}
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M11.8 21.5L18 17.4L24.2 21.5"
          stroke={innerStroke}
          strokeWidth="2.1"
          strokeLinecap="square"
        />
        <path
          d="M13.2 26.2H22.8"
          stroke={innerStroke}
          strokeWidth="2.1"
          strokeLinecap="square"
        />
      </svg>

      {showSubtext ? (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.15rem] font-extrabold tracking-[0.14em] ${textColor}`}>
            CREW
          </span>
          <span className={`mt-1 font-sans text-[0.62rem] font-semibold tracking-[0.26em] uppercase ${subColor}`}>
            LANDSCAPES
          </span>
        </span>
      ) : (
        <span className={`font-display text-[1.2rem] font-extrabold tracking-[0.14em] leading-none ${textColor}`}>
          CREW
        </span>
      )}
    </span>
  );
};
