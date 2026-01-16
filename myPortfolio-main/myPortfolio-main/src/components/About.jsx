import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData } from '../redux/slices/sectionsSlice';
import { AiFillFilePdf } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';

const About = () => {
  const dispatch = useDispatch();
  const aboutData = useSelector((state) => state.sections.about);

  useEffect(() => {
    dispatch(fetchSectionData('about'));
  }, [dispatch]);

  return (
    <Element name="Profile">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              </motion.div>
            </div>

            {/* Content Card */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Profile Image & Info */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="md:col-span-1"
                >
                  <div className="sticky top-24 space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50" />
                      <div className="relative h-40 w-40 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 border border-cyan-400/50 flex items-center justify-center overflow-hidden">
                        <img
                          src="/logobg.png"
                          alt="Profile"
                          className="h-32 w-32 object-contain"
                        />
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <h3 className="text-2xl font-bold text-white">{aboutData.name}</h3>
                      <div className="flex items-center gap-2 text-cyan-400">
                        <MdVerified />
                        <span className="text-sm font-semibold">{aboutData.role}</span>
                      </div>
                    </motion.div>

                    <motion.a
                      href="/resume.pdf"
                      download
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      <AiFillFilePdf className="text-xl" />
                      Download Resume
                    </motion.a>
                  </div>
                </motion.div>

                {/* About Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:col-span-2 space-y-6"
                >
                  {/* Bio Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-6 md:p-8 rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {aboutData.about}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {[
                      { label: 'Experience', value: '1+ Year' },
                      { label: 'Projects', value: '10+' },
                      { label: 'Skills', value: '15+' },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 },
                        }}
                        className="p-4 rounded-xl border border-gray-700/50 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
        </div>
      </div>
    </Element>
  );
};

export default About;
