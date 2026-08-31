import React from 'react';
import logoImage from '../assets/logo.jpeg';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <img
      src={logoImage}
      alt="Studio Logo"
      className={`object-contain rounded-lg ${className}`}
      style={{ width: size, height: size }}
    />
  );
};