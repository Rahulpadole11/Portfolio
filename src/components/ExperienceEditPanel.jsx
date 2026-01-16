import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../redux/slices/uiSlice';
import axios from 'axios';

const ExperienceEditPanel = () => {
  const dispatch = useDispatch();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState('');

  const API_URL = 'http://localhost:5000/api/experiences';

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { timeout: 5000 });
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      if (error.response?.status === 500) {
        dispatch(setMessage('✗ Server error: ' + (error.response?.data?.message || 'Unknown error')));
      } else {
        dispatch(setMessage('✗ Failed to load experiences'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      company: '',
      position: '',
      duration: '',
      description: '',
      achievements: [],
    });
    setAchievementInput('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      description: exp.description,
      achievements: exp.achievements || [],
    });
    setEditingId(exp._id);
    setShowForm(true);
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput],
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.position || !formData.duration || !formData.description) {
      dispatch(setMessage('✗ Please fill all required fields'));
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        dispatch(setMessage('✓ Experience updated successfully'));
      } else {
        await axios.post(API_URL, formData);
        dispatch(setMessage('✓ Experience added successfully'));
      }

      fetchExperiences();
      handleReset();
      setTimeout(() => dispatch(setMessage('')), 2000);
    } catch (error) {
      dispatch(setMessage('✗ Error saving experience'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch(setMessage('✓ Experience deleted successfully'));
        fetchExperiences();
        setTimeout(() => dispatch(setMessage('')), 2000);
      } catch (error) {
        dispatch(setMessage('✗ Failed to delete experience'));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <motion.button
        onClick={() => {
          if (!showForm) {
            handleReset();
            setShowForm(true);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold transition-all"
      >
        <MdAdd size={20} />
        Add New Experience
      </motion.button>

      {/* Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 p-6 space-y-4"
          >
            <h3 className="text-xl font-bold text-purple-300 mb-4">
              {editingId ? '✏️ Edit Experience' : '➕ Add New Experience'}
            </h3>

            <div className="space-y-4">
              {/* Company */}
              <div>
                <label className="block text-purple-200 font-semibold mb-2">Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g., CS Tech AI"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-purple-200 font-semibold mb-2">Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Frontend Developer Intern"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-purple-200 font-semibold mb-2">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., Sept 2025 – Jan 2026"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-purple-200 font-semibold mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your role and responsibilities..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-purple-200 font-semibold mb-2">Key Achievements</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    placeholder="Add an achievement..."
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
                  />
                  <motion.button
                    onClick={handleAddAchievement}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                  >
                    <MdAdd />
                  </motion.button>
                </div>

                {/* Achievements List */}
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg border border-purple-500/20"
                    >
                      <span className="text-gray-200">▸ {achievement}</span>
                      <button
                        onClick={() => handleRemoveAchievement(index)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <MdDelete />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition-all disabled:opacity-50"
              >
                <MdSave />
                {loading ? 'Saving...' : 'Save'}
              </motion.button>
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all"
              >
                <MdCancel />
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiences List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No experiences yet. Add your first one!</div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-purple-300 mb-4">All Experiences</h3>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 hover:border-purple-500/60 p-6 mb-4 transition-all space-y-4"
              >
                {/* Header with ID Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-purple-500/50">
                      {exp.id}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-purple-300">{exp.position}</h4>
                      <p className="text-purple-200 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(exp)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 transition-all"
                    >
                      <MdEdit size={18} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(exp._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 transition-all"
                    >
                      <MdDelete size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Duration Info */}
                <div className="flex gap-4 py-3 border-t border-purple-500/20">
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs font-semibold">Duration:</p>
                    <p className="text-gray-200 text-sm">{exp.duration}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs font-semibold">Database ID:</p>
                    <p className="text-gray-300 text-xs font-mono break-all">{exp._id}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="py-3 border-t border-purple-500/20">
                  <p className="text-gray-400 text-xs font-semibold mb-2">Description:</p>
                  <p className="text-gray-200 text-sm leading-relaxed">{exp.description}</p>
                </div>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="py-3 border-t border-purple-500/20 bg-slate-800/50 rounded-lg p-4">
                    <p className="text-purple-200 text-xs font-semibold mb-3">Key Achievements:</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start gap-3">
                          <span className="text-purple-400 font-bold mt-0.5">→</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metadata */}
                <div className="text-xs text-gray-500 pt-2 border-t border-purple-500/20">
                  <p>Created: {new Date(exp.createdAt).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceEditPanel;
