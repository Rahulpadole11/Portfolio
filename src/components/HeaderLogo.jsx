import React from 'react';
import { motion } from 'framer-motion';

/**
 * Logo Component - Professional Header Logo with Fallback
 */
const HeaderLogo = ({ size = 'medium', onClick }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${sizeClasses[size]} min-w-[40px] rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group relative overflow-hidden`}
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 group-hover:via-cyan-400/100 transition-all duration-500 opacity-0 group-hover:opacity-100" />

      {/* Logo Image or Fallback */}
      {!imageError ? (
        <img
          src="/logobg.png"
          alt="Portfolio Logo"
          className="h-full w-full object-contain relative z-10"
          onError={handleImageError}
        />
      ) : (
        /* Fallback Logo - Custom Initial Avatar */
        <div className="flex items-center justify-center h-full w-full relative z-10 bg-gradient-to-br from-cyan-600 to-blue-600 text-white font-bold text-lg">
          RP
        </div>
      )}
    </motion.div>
  );
};

export default HeaderLogo;
