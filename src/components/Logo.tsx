
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${sizes[size]} rounde-full bg-gradient-to-r from-accent via-accent/80 to-accent/60 rounded-xl flex items-center justify-center text-white font-bold ${textSizes[size]}`}>
        GT
      </div>
      {showText && (
        <span className={`font-semibold ${textSizes[size]} bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent`}>
          Global Test MVP
        </span>
      )}
    </Link>
  );
};

export default Logo;
