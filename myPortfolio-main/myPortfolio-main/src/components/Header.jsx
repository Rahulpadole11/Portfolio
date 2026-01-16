import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../redux/slices/uiSlice';
import HeaderLogo from './HeaderLogo';
import { motion } from 'framer-motion';
import { MdMenu, MdClose } from 'react-icons/md';

/**
 * Navigation configuration with label, target section, and offset
 */
const NAV_ITEMS = [
  { label: 'About', target: 'Profile', offset: -90 },
  { label: 'Skills', target: 'Skills', offset: -90 },
  { label: 'Experience', target: 'experience', offset: -90 },
  { label: 'Project', target: 'project', offset: -90 },
  { label: 'Contact', target: 'contact', offset: -90 },
];

/**
 * Header Component - Professional Navigation with Active State Management
 */
const Header = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState('About');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Handle logo click to open admin panel
   */
  const handleLogoClick = () => {
    dispatch(setIsOpen(true));
  };

  /**
   * Handle active state when navigation link is clicked
   */
  const handleSetActive = (itemLabel) => {
    setActive(itemLabel);
    setMobileOpen(false);
  };

  /**
   * Check if a navigation item is currently active
   */
  const isActiveItem = (itemLabel) => {
    return active === itemLabel;
  };

  /**
   * Monitor scroll events for better active state tracking
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto pt-1 sm:pt-2 rounded-b-2xl border-b border-l border-r border-purple-500/30 shadow-md z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md text-2xl transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-purple-500/20' : 'shadow-md'
      }`}
    >
      <div className="flex items-center justify-between h-full relative px-4 w-full pb-2 sm:pb-2 md:pb-2 lg:pb-3">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={handleLogoClick}
          className="cursor-pointer"
        >
          <HeaderLogo size="medium" />
        </motion.div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex w-full justify-end items-center">
          <ul className="flex space-x-3 sm:space-x-5 md:space-x-8 lg:space-x-10 items-end text-sm sm:text-base md:text-lg pr-5 sm:pr-6 md:pr-8">
            {NAV_ITEMS.map((item) => (
              <motion.li key={item.label} whileHover={{ y: -2 }}>
                <Link
                  to={item.target}
                  smooth
                  duration={600}
                  offset={item.offset}
                  spy={true}
                  activeClass="active-nav"
                  onSetActive={() => handleSetActive(item.label)}
                  className={`cursor-pointer inline-block transition-colors duration-300 after:content-[''] after:block after:h-[2px] after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-transform after:duration-300 origin-left ${
                    isActiveItem(item.label)
                      ? 'text-purple-400 after:scale-x-100'
                      : 'text-gray-300 hover:text-purple-300 after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-purple-400 hover:text-purple-300"
        >
          {mobileOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </motion.button>
      </div>

      {/* MOBILE NAVIGATION */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileOpen ? 1 : 0, height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-purple-500/20"
      >
        <nav className="flex flex-col gap-2 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.target}
              smooth
              duration={600}
              offset={item.offset}
              spy={true}
              onSetActive={() => handleSetActive(item.label)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                isActiveItem(item.label)
                  ? 'bg-purple-600/30 text-purple-300 border-l-2 border-purple-400'
                  : 'text-gray-300 hover:bg-slate-700/50 hover:text-purple-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
