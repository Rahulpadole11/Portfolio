import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/slices/adminSlice';
import { MdOpenInNew, MdCode } from 'react-icons/md';

const Project = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.items);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  return (
    <Element name="project">
      <div className="w-full  px-4 sm:px-6 md:px-8 lg:px-12 py-20">
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
               <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            
          </motion.div>

          {loading && (
            <motion.div
              className="flex justify-center items-center py-20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 text-red-300 p-6 rounded-xl mb-8 backdrop-blur-sm"
            >
              <p className="font-semibold">⚠️ {error}</p>
            </motion.div>
          )}

          {!loading && projects.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-400 text-lg">No projects added yet. Stay tuned!</p>
            </motion.div>
          )}

          {!loading && projects.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group h-full"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Project Image */}
                    {project.image && (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-600/20 to-blue-600/20">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col relative z-10">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 transition-colors duration-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600/50">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-700/50 group-hover:border-cyan-500/30 transition-colors duration-300">
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 text-sm"
                          >
                            <MdOpenInNew size={16} />
                            View
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-300 font-semibold transition-all duration-300 text-sm"
                          >
                            <MdCode size={16} />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Element>
  );
};

export default Project;
