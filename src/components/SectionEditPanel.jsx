import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionData, updateSectionData } from '../redux/slices/sectionsSlice';
import { setMessage } from '../redux/slices/uiSlice';
import { MdSave, MdEdit } from 'react-icons/md';
import ExperienceEditPanel from './ExperienceEditPanel';

const SectionEditPanel = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections);
  const [activeSection, setActiveSection] = useState('about');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchSectionData(activeSection));
  }, [activeSection, dispatch]);

  useEffect(() => {
    setFormData(sections[activeSection] || {});
  }, [sections, activeSection]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    if (Array.isArray(formData[field])) {
      setFormData({ ...formData, [field]: value.split(',').map(item => item.trim()) });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await dispatch(updateSectionData({ section: activeSection, data: formData }));
      dispatch(setMessage('✓ Section updated successfully!'));
      setTimeout(() => dispatch(setMessage('')), 2000);
    } catch (error) {
      dispatch(setMessage('✗ Failed to update section'));
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (activeSection === 'experience') {
      return <ExperienceEditPanel />;
    }

    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange(e, 'name')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Role</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => handleChange(e, 'role')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">About Description</label>
              <textarea
                value={formData.about || ''}
                onChange={(e) => handleChange(e, 'about')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
                rows={5}
              />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Frontend Skills (comma separated)</label>
              <textarea
                value={Array.isArray(formData.frontend) ? formData.frontend.join(', ') : ''}
                onChange={(e) => handleChange(e, 'frontend')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Backend Skills (comma separated)</label>
              <textarea
                value={Array.isArray(formData.backend) ? formData.backend.join(', ') : ''}
                onChange={(e) => handleChange(e, 'backend')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
                rows={4}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange(e, 'email')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange(e, 'phone')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleChange(e, 'location')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => handleChange(e, 'linkedin')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => handleChange(e, 'github')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Twitter URL</label>
              <input
                type="url"
                value={formData.twitter || ''}
                onChange={(e) => handleChange(e, 'twitter')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-cyan-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['about', 'skills', 'experience', 'contact'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveSection(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeSection === tab
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderForm()}
      </motion.div>

      {/* Save Button */}
      {activeSection !== 'experience' && (
        <motion.button
          onClick={handleSave}
          disabled={sections.loading || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition-all disabled:opacity-50"
        >
          <MdSave />
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      )}
    </div>
  );
};

export default SectionEditPanel;
