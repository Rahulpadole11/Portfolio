import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData } from '../redux/slices/sectionsSlice';
import { MdWork, MdCalendarToday } from 'react-icons/md';

const Experience = () => {
  const dispatch = useDispatch();
  const experienceData = useSelector((state) => state.sections.experience);

  useEffect(() => {
    dispatch(fetchSectionData('experience'));
  }, [dispatch]);

  const ExperienceCard = ({ company, position, duration, description, achievements, index, id }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Timeline Connector */}
      {index < (Array.isArray(experienceData) ? experienceData.length - 1 : 0) && (
        <div className="absolute left-6 top-16 w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent"></div>
      )}

      <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-slate-800/80 group-hover:to-slate-900/80">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon and ID Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Timeline Dot with ID */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-1 text-purple-400 text-2xl bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-3 shadow-lg shadow-purple-500/50 flex items-center justify-center w-14 h-14 font-bold text-white"
              >
                {id}
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-1"
                >
                  {position}
                </motion.h3>
                <p className="text-purple-200 font-semibold text-lg">{company}</p>
              </div>
            </div>
          </div>

          {/* Duration Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/40"
          >
            <MdCalendarToday className="text-purple-300 text-sm" />
            <span className="text-sm font-semibold text-purple-200">{duration}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-4 leading-relaxed text-base"
          >
            {description}
          </motion.p>

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <p className="text-sm font-bold text-purple-300 uppercase tracking-wider">✨ Key Achievements:</p>
              <div className="space-y-2 pl-2">
                {achievements.map((achievement, idx) => (
                  <motion.div
                    key={`${index}-achievement-${idx}`}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                  >
                    <span className="text-purple-400 font-bold text-lg mt-0.5">→</span>
                    <span className="text-gray-300 text-sm leading-relaxed">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Check if we have experience data
  const hasExperience = experienceData && Array.isArray(experienceData) && experienceData.length > 0;

  return (
    <Element name="experience">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4"
            >
              <span className="text-2xl">💼</span>
              <span className="text-purple-300 font-semibold">Professional Journey</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              My <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full" />
            <p className="text-gray-400 mt-6 max-w-3xl text-lg leading-relaxed">
              I've had the privilege of working with talented teams and challenging projects that shaped my expertise. Each role has contributed to my growth as a full-stack developer.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          {hasExperience ? (
            <div className="space-y-8 relative">
              {experienceData.map((exp, idx) => (
                <ExperienceCard
                  key={exp._id}
                  id={exp.id}
                  company={exp.company}
                  position={exp.position}
                  duration={exp.duration}
                  description={exp.description}
                  achievements={exp.achievements}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg">Experience data coming soon...</p>
            </motion.div>
          )}
        </div>
      </div>
    </Element>
  );
};

export default Experience;
