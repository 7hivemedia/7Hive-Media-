import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-9 h-9', size = 120 }) => {
  return (
    <svg
      className={`${className} select-none shrink-0`}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Drop shadow for the outer frame to give 3D depth */}
        <filter id="outer-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0A84FF" floodOpacity="0.12" />
        </filter>

        {/* Shadow under the 7HM letters and + sign */}
        <filter id="letter-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.15" />
        </filter>

        {/* Bevel gradient for the outer border */}
        <linearGradient id="bevel-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2EBF4" />
        </linearGradient>

        {/* 3D Glossy Blue gradient for the inner concentric circle */}
        <linearGradient id="ring-blue-grad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#309EFF" />
          <stop offset="45%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#0057C2" />
        </linearGradient>

        {/* 3D Blue gradient for the 7HM text */}
        <linearGradient id="text-blue-grad" x1="30" y1="40" x2="90" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E9DFF" />
          <stop offset="40%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#0054BB" />
        </linearGradient>

        {/* Premium metallic gold/yellow gradient for the 3D plus symbol */}
        <linearGradient id="plus-gold-grad" x1="78" y1="34" x2="98" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE182" />
          <stop offset="45%" stopColor="#F4B400" />
          <stop offset="100%" stopColor="#B27A00" />
        </linearGradient>
      </defs>

      {/* 1. Outer bevel ring (realistic 3D plate) */}
      <circle cx="60" cy="60" r="55" fill="url(#bevel-grad)" filter="url(#outer-shadow)" stroke="#D4DEF0" strokeWidth="1" />
      
      {/* 2. Inner light-reflecting circle */}
      <circle cx="60" cy="60" r="52" fill="#FFFFFF" />

      {/* 3. The premium blue concentric circular track */}
      <circle cx="60" cy="60" r="43.5" stroke="url(#ring-blue-grad)" strokeWidth="5" fill="none" opacity="0.95" />
      {/* Subtle overlay border for extra crispness */}
      <circle cx="60" cy="60" r="43.5" stroke="#FFFFFF" strokeWidth="0.75" fill="none" opacity="0.3" />

      {/* 4. Core white center field */}
      <circle cx="60" cy="60" r="38.5" fill="#FCFDFF" />

      {/* 5. 7HM Text */}
      <g filter="url(#letter-shadow)">
        <text
          x="53.5"
          y="72"
          fontFamily="'Arial Black', -apple-system, sans-serif"
          fontWeight="900"
          fontSize="28.5"
          fill="url(#text-blue-grad)"
          textAnchor="middle"
          letterSpacing="-1.6"
        >
          7HM
        </text>
      </g>

      {/* 6. Gold Plus Sign (+) matching the logo exactly */}
      <g transform="translate(86.5, 41.5)" filter="url(#letter-shadow)">
        {/* Vertical rounded bar */}
        <rect x="-2" y="-6" width="4" height="12" rx="1.2" fill="url(#plus-gold-grad)" />
        {/* Horizontal rounded bar */}
        <rect x="-6" y="-2" width="12" height="4" rx="1.2" fill="url(#plus-gold-grad)" />
      </g>
    </svg>
  );
};
