
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
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="flex flex-col items-center">
      {showText && (
        <div className="flex flex-col items-center">
          <div className="h-1 w-full max-w-[320px] bg-primary mb-2"></div>
          <div className="flex items-center gap-0">
            <span className={`font-semibold ${textSizes[size]} text-primary`}>
              Global<span className="font-light">Test</span>MVP
            </span>
          </div>
          <div className="flex mt-2 w-full max-w-[320px] justify-between">
            <div className="h-1 w-1/2 bg-primary"></div>
            <div className="h-1 w-3/4 bg-accent"></div>
          </div>
          <div className="h-1 w-1/3 mt-1 bg-primary"></div>
        </div>
      )}
      {!showText && (
        <div className={`${sizes[size]} flex items-center justify-center text-white font-bold ${textSizes[size]} bg-primary rounded-xl`}>
          GT
        </div>
      )}
    </Link>
  );
};

export default Logo;
