import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContacts } from '../api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getContacts();
        setContacts(data);
        setError('');
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    
    <div className="text-white font-sans py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-10 text-cyan-400 inline-block after:content-[''] after:block after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 origin-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Messages
      </motion.h2>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-400">Loading messages...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && contacts.length === 0 && !error && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-400">No messages yet.</p>
        </div>
      )}

      {!loading && contacts.length > 0 && (
        <motion.div
          className="grid gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={contact._id || index}
              className="bg-[#1a1a1a] rounded-xl border border-gray-700 p-6 hover:border-cyan-500 transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <p className="text-sm text-gray-400">{contact.email}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {contact.message}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Contacts;
