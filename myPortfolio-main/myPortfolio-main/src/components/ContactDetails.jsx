import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData } from '../redux/slices/sectionsSlice';
import { MdEmail, MdPhone, MdLocationOn, MdLanguage } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

const SOCIAL_COLORS = {
  github: 'hover:text-gray-400',
  linkedin: 'hover:text-blue-400',
  twitter: 'hover:text-cyan-400',
  instagram: 'hover:text-pink-400',
};

/**
 * Contact Details Component - Professional Contact Information Display
 */
const ContactDetails = () => {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.sections.contact);

  useEffect(() => {
    dispatch(fetchSectionData('contact'));
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Element name="contact">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 px-6"
      >
        <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
        >
          Get In Touch
        </motion.h2>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Card - Email */}
          {contactData?.email && (
            <motion.a
              variants={itemVariants}
              href={`mailto:${contactData.email}`}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MdEmail className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400 break-all hover:text-purple-400 transition-colors">
                    {contactData.email}
                  </p>
                </div>
              </div>
            </motion.a>
          )}

          {/* Contact Card - Phone */}
          {contactData?.phone && (
            <motion.a
              variants={itemVariants}
              href={`tel:${contactData.phone}`}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MdPhone className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-400 hover:text-purple-400 transition-colors">
                    {contactData.phone}
                  </p>
                </div>
              </div>
            </motion.a>
          )}

          {/* Contact Card - Location */}
          {contactData?.location && (
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MdLocationOn className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400">{contactData.location}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Card - Website */}
          {contactData?.website && (
            <motion.a
              variants={itemVariants}
              href={contactData.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MdLanguage className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Website</h3>
                  <p className="text-gray-400 hover:text-purple-400 transition-colors truncate">
                    {contactData.website}
                  </p>
                </div>
              </div>
            </motion.a>
          )}

          {/* Contact Card - GitHub */}
          {contactData?.github && (
            <motion.a
              variants={itemVariants}
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <FaGithub className="text-2xl text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">GitHub</h3>
                  <p className="text-gray-400 hover:text-purple-400 transition-colors truncate">
                    {contactData.github ? contactData.github.split('/').pop() : 'rahulpadole11'}
                  </p>
                </div>
              </div>
            </motion.a>
          )}
        </div>

        {/* Social Media Links */}
        {(contactData?.linkedin || contactData?.github || contactData?.twitter || contactData?.instagram) && (
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Follow Me</h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {contactData?.github && (
                <motion.a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 text-3xl transition-all duration-300 hover:text-gray-400"
                  title="GitHub"
                >
                  <FaGithub />
                </motion.a>
              )}
              {contactData?.linkedin && (
                <motion.a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 text-3xl transition-all duration-300 hover:text-blue-400"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </motion.a>
              )}
              {contactData?.twitter && (
                <motion.a
                  href={contactData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 text-3xl transition-all duration-300 hover:text-cyan-400"
                  title="Twitter"
                >
                  <FaTwitter />
                </motion.a>
              )}
              {contactData?.instagram && (
                <motion.a
                  href={contactData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 text-3xl transition-all duration-300 hover:text-pink-400"
                  title="Instagram"
                >
                  <FaInstagram />
                </motion.a>
              )}
            </div>
            
          </motion.div>
        )}

        {/* Quick Message */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-6 border border-purple-500/30"
        >
          <p className="text-gray-300 mb-4">
            Have a question or want to collaborate? Feel free to reach out!
          </p>
          <p className="text-sm text-gray-400">
            💡 I typically respond within 24 hours
          </p>
        </motion.div>
      </div>
      </motion.section>
    </Element>
  );
};

export default ContactDetails;
