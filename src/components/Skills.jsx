import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData } from '../redux/slices/sectionsSlice';

const Skills = () => {
  const dispatch = useDispatch();
  const skillsData = useSelector((state) => state.sections.skills);

  useEffect(() => {
    dispatch(fetchSectionData('skills'));
  }, [dispatch]);

  const SkillCard = ({ title, skills }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <div className="relative h-full rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 p-6 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Header */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold text-purple-400 mb-6 relative z-10"
        >
          {title}
        </motion.h3>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 flex-1 relative z-10"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 hover:border-purple-400/60 text-purple-300 text-sm font-medium transition-all duration-200 text-center"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <Element name="Skills">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl">
              Proficient in modern web technologies and full-stack development with expertise across frontend and backend ecosystems.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <SkillCard title="🎨 Frontend Skills" skills={skillsData?.frontend || []} />
            <SkillCard title="⚙️ Backend Skills" skills={skillsData?.backend || []} />
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Skills;