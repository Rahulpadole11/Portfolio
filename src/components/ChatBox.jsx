import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { submitContact, clearSuccess } from '../redux/slices/contactsSlice';
import { MdChat, MdClose, MdSend, MdCheckCircle, MdError } from 'react-icons/md';
import { BiSolidMessageSquareDots } from 'react-icons/bi';

const ChatBox = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contacts);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await dispatch(submitContact(formData)).unwrap();
      setStatus('✓ Message sent successfully! We\'ll reply to your email soon.');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => {
        setStatus('');
        dispatch(clearSuccess());
        setChatOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('✗ Failed to send message. Please try again.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, y: 20 },
  };

  return (
    <>
      {/* Chat Floating Button */}
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed right-6 bottom-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-2xl z-40 font-semibold flex items-center justify-center group"
        title="Open Chat"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MdClose size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BiSolidMessageSquareDots size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Box */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-6 bottom-24 w-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl z-40 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MdChat size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Send Message</h2>
                  <p className="text-purple-100 text-xs">We'll get back to you soon</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 text-xs font-semibold block mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs font-semibold block mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-slate-300 text-xs font-semibold block mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition text-sm resize-none"
                    rows={4}
                  />
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MdSend size={18} />
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>

              {/* Status Message */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm font-semibold ${
                      status.includes('✓')
                        ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                        : status.includes('✗')
                        ? 'bg-red-600/20 text-red-300 border border-red-500/30'
                        : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {status.includes('✓') ? (
                      <MdCheckCircle size={18} />
                    ) : status.includes('✗') ? (
                      <MdError size={18} />
                    ) : (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <MdChat size={18} />
                      </motion.div>
                    )}
                    {status}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
