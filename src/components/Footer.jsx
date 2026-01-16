import React, { useEffect } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData } from '../redux/slices/sectionsSlice';
import { motion } from 'framer-motion';

const Footer = () => {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.sections.contact);

  useEffect(() => {
    dispatch(fetchSectionData('contact'));
  }, [dispatch]);

  const socialLinks = [
    { icon: FaLinkedin, url: contactData?.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400', bgColor: 'group-hover:bg-blue-500/20' },
    { icon: FaGithub, url: contactData?.github, label: 'GitHub', color: 'hover:text-gray-300', bgColor: 'group-hover:bg-gray-500/20' },
    { icon: FaXTwitter, url: contactData?.twitter, label: 'Twitter', color: 'hover:text-sky-400', bgColor: 'group-hover:bg-sky-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full border border-purple-500/20 rounded-t-2xl font-sans relative px-4 py-8 md:py-10 bg-gradient-to-r from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-md mt-12"
    >
      {/* Decorative corner borders */}
      <div className="absolute top-0 left-0 h-6 w-6 border-t border-l border-purple-500/40 rounded-tl-xl" />
      <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-purple-500/40 rounded-tr-xl" />

      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Brand */}
          <motion.div variants={itemVariants} className="md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
              Rahul Padole
            </h3>
            <p className="text-sm text-gray-400">
              Building amazing digital experiences with modern technologies.
            </p>
          </motion.div>

       
         

          {/* Right Section - Social Links */}
          <motion.div variants={itemVariants} className="md:text-right text-right">
            <h4 className="text-md font-bold text-purple-400 mb-3 mr-25 justify-end">Connect</h4>
            <div className="flex gap-3 md:justify-end">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return link.url ? (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-3 rounded-lg border border-purple-500/30 transition-all duration-300 ${link.bgColor}`}
                    title={link.label}
                  >
                    <Icon className={`text-xl text-gray-300 ${link.color} transition-colors duration-300`} />
                  </motion.a>
                ) : null;
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6" />

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-500">
            © {new Date().getFullYear()} Rahul Padole. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            Designed & Built with ❤️ using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
