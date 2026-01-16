import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../redux/slices/uiSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const showPanel = useSelector((state) => state.admin.isOpen);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    github: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setMessage('Title and description are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies
            .split(',')
            .map((t) => t.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      setMessage('✓ Project added successfully!');
      setFormData({
        title: '',
        description: '',
        technologies: '',
        link: '',
        github: '',
      });

      setTimeout(() => {
        setMessage('');
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage('✗ Failed to add project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Admin Button */}
      <button
        onClick={() => dispatch(setIsOpen(!showPanel))}
        className="fixed left-5 bottom-5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg z-40 text-sm"
      >
        {showPanel ? 'Close Admin' : 'Admin Panel'}
      </button>

      {/* Admin Panel */}
      {showPanel && (
        <motion.div
          className="fixed left-5 bottom-20 w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6 z-40 max-h-96 overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <h2 className="text-purple-400 font-bold text-lg mb-4">Add Project</h2>

          <form onSubmit={handleAddProject} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm resize-none"
              rows={3}
            />

            <input
              type="text"
              name="technologies"
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
            />

            <input
              type="url"
              name="link"
              placeholder="Project Link (optional)"
              value={formData.link}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
            />

            <input
              type="url"
              name="github"
              placeholder="GitHub Link (optional)"
              value={formData.github}
              onChange={handleChange}
              className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>

            {message && (
              <p
                className={`text-sm text-center ${
                  message.includes('✓')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </motion.div>
      )}
    </>
  );
};

export default AdminPanel;
