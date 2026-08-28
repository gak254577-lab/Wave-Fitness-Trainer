import React from 'react';

interface WaveFitnessLogoProps {
  className?: string;
  size?: number | string;
  fillColor?: string;
  bannerColor?: string;
  textColor?: string;
  variant?: 'full' | 'icon' | 'badge';
}

export const WaveFitnessLogo: React.FC<WaveFitnessLogoProps> = ({
  className = '',
  size = 48,
  fillColor = '#FFE000', // Vibrant Gold Yellow from updated brand logo
  bannerColor = '#000000', // Solid Dark Banner
  textColor = '#FFFFFF',
  variant = 'full'
}) => {
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        style={{ width: size, height: size }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Wave Fitness Logo Icon"
      >
        <defs>
          <filter id="wf-icon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        <g filter="url(#wf-icon-glow)">
          {/* White outer contour */}
          <path
            d="M 50 10 
               C 56 8, 64 12, 68 18 
               C 72 23, 70 28, 64 30 
               C 70 26, 80 22, 86 28 
               C 92 34, 90 44, 83 50 
               C 78 54, 70 52, 65 47 
               C 62 53, 66 60, 62 66 
               C 57 73, 52 76, 52 82 
               C 47 82, 43 82, 38 82
               C 36 75, 32 70, 27 64
               C 23 60, 18 55, 15 48
               C 12 42, 12 34, 18 28
               C 24 23, 31 28, 33 35
               C 35 40, 34 45, 30 48
               C 34 53, 40 54, 43 48
               C 41 42, 38 34, 40 26
               C 40 21, 44 15, 50 10 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Yellow Muscular Bodybuilder Silhouette */}
          <path
            d="M 50 10 
               C 56 8, 64 12, 68 18 
               C 72 23, 70 28, 64 30 
               C 70 26, 80 22, 86 28 
               C 92 34, 90 44, 83 50 
               C 78 54, 70 52, 65 47 
               C 62 53, 66 60, 62 66 
               C 57 73, 52 76, 52 82 
               C 47 82, 43 82, 38 82
               C 36 75, 32 70, 27 64
               C 23 60, 18 55, 15 48
               C 12 42, 12 34, 18 28
               C 24 23, 31 28, 33 35
               C 35 40, 34 45, 30 48
               C 34 53, 40 54, 43 48
               C 41 42, 38 34, 40 26
               C 40 21, 44 15, 50 10 Z"
            fill={fillColor}
          />

          {/* Yellow Base Arch */}
          <path
            d="M 10 84 C 35 78, 65 78, 90 84 C 90 90, 10 90, 10 84 Z"
            fill={fillColor}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </g>
      </svg>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 310"
        className="w-full h-auto max-w-full drop-shadow-2xl"
        style={{ width: size, height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Wave Fitness Logo"
      >
        <defs>
          <filter id="wf-diecut-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* --- Outer Die-Cut White Sticker Outline Wrapper --- */}
        <g filter="url(#wf-diecut-shadow)">
          {/* Main Background Silhouette Outline (Thick White Cut Contour) */}
          {/* Upper Bodybuilder Contour Mask */}
          <path
            d="M 125 72 
               C 105 60, 85 64, 75 75 
               C 70 80, 80 84, 94 85 
               C 102 86, 108 94, 110 104 
               C 92 90, 72 90, 58 104 
               C 42 118, 40 144, 52 164 
               C 66 182, 88 184, 106 170 
               C 114 162, 116 148, 114 136 
               C 124 140, 142 138, 154 118 
               C 142 104, 138 88, 125 72 
               C 134 54, 146 28, 172 14 
               C 198 0, 230 14, 236 40 
               C 242 64, 226 90, 202 106 
               C 188 116, 170 114, 160 104 
               C 156 122, 162 142, 152 164 
               C 144 182, 138 198, 142 216 
               C 210 216, 260 220, 280 230 
               L 298 230 
               L 286 282 
               L 294 286 
               L 26 286 
               L 34 262 
               L 20 230 
               L 40 230 
               C 60 220, 110 216, 138 216 
               C 134 198, 126 180, 118 164 
               C 106 144, 112 126, 125 118 Z"
            fill="#09090B"
            stroke="#FFFFFF"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 1. Bodybuilder Muscular Flexing Silhouette in Bright Yellow */}
          {/* Head & Cap in profile facing left */}
          <path
            d="M 124 74 
               C 112 65, 94 65, 82 72 
               C 78 76, 88 80, 100 81 
               C 108 82, 114 90, 116 100 
               C 126 98, 132 89, 130 80 
               C 127 76, 125 75, 124 74 Z"
            fill={fillColor}
          />

          {/* Right Raised Overhead Arm & High Bicep Peak */}
          <path
            d="M 136 84 
               C 146 66, 156 40, 178 26 
               C 200 12, 228 24, 234 48 
               C 238 70, 222 94, 200 108 
               C 186 117, 170 115, 160 105 
               C 158 96, 148 89, 136 84 Z"
            fill={fillColor}
          />
          {/* Right Fist */}
          <path
            d="M 178 26 C 166 30, 158 42, 164 54 C 172 62, 186 60, 194 50 C 198 42, 194 30, 178 26 Z"
            fill={fillColor}
          />

          {/* Left Flexed Bicep & Arm */}
          <path
            d="M 108 100 
               C 94 88, 76 88, 62 102 
               C 48 116, 46 140, 58 158 
               C 70 174, 92 176, 108 164 
               C 116 154, 118 138, 116 124 
               C 114 112, 112 106, 108 100 Z"
            fill={fillColor}
          />
          {/* Left Fist */}
          <path
            d="M 62 102 C 54 94, 42 100, 40 112 C 38 124, 48 136, 58 138 C 66 138, 70 126, 68 114 C 66 106, 64 103, 62 102 Z"
            fill={fillColor}
          />

          {/* Torso, Muscular Lats, Chest & Waist */}
          <path
            d="M 116 124 
               C 128 128, 152 128, 166 108 
               C 176 124, 184 144, 174 166 
               C 166 182, 160 200, 162 220 
               C 144 224, 124 224, 110 220 
               C 112 200, 104 182, 96 166 
               C 88 146, 96 130, 116 124 Z"
            fill={fillColor}
          />

          {/* Latissimus dorsi & back sweep detail */}
          <path
            d="M 174 166 C 182 178, 180 196, 162 220"
            fill={fillColor}
          />

          {/* 2. Curved Platform / Arch underneath bodybuilder (Yellow Bar) */}
          <path
            d="M 32 232 C 100 214, 220 214, 288 232 C 288 244, 32 244, 32 232 Z"
            fill={fillColor}
          />

          {/* 3. Bottom Black Banner with Angled Ribbon Tails & White Contour */}
          {/* Main Solid Black Ribbon */}
          <path
            d="M 16 236 
               L 304 236 
               L 292 278 
               L 300 282 
               L 20 282 
               L 28 260 
               L 16 236 Z"
            fill={bannerColor}
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Stylized Text: "Wave Fitness" */}
          <text
            x="160"
            y="271"
            textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
            fontSize="34"
            fontWeight="900"
            fontStyle="italic"
            fill={textColor}
            letterSpacing="1px"
            style={{
              textShadow: '0 2px 6px rgba(0,0,0,0.9)'
            }}
          >
            Wave Fitness
          </text>
        </g>
      </svg>
    </div>
  );
};

