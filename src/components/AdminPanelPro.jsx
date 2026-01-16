import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setAuthenticated,
  setActiveTab,
  setMessage,
  logout,
} from "../redux/slices/uiSlice";
import {
  fetchContacts,
  deleteContactById,
} from "../redux/slices/contactsSlice";
import {
  fetchProjects,
  createNewProject,
  deleteProjectById,
} from "../redux/slices/adminSlice";
import {
  MdDashboard,
  MdClose,
  MdMail,
  MdFolderOpen,
  MdEdit,
  MdLogout,
  MdDelete,
  MdAdd,
  MdRefresh,
  MdVisibility,
  MdCheckCircle,
  MdErrorOutline,
} from "react-icons/md";
import SectionEditPanel from "./SectionEditPanel";
import Loader from "../components/Loader";

const AdminPanelPro = () => {
  const dispatch = useDispatch();
  const { isOpen, isAuthenticated, activeTab, message } = useSelector(
    (state) => state.ui
  );
  const { items: contacts, loading: contactsLoading } = useSelector(
    (state) => state.contacts
  );
  const { items: projects, loading: projectsLoading } = useSelector(
    (state) => state.projects
  );

  const [adminPassword, setAdminPassword] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    github: "",
  });

  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      if (activeTab === "contacts") dispatch(fetchContacts());
      if (activeTab === "projects") dispatch(fetchProjects());
      if (activeTab === "dashboard") {
        dispatch(fetchContacts());
        dispatch(fetchProjects());
      }
    }
  }, [activeTab, isAuthenticated, isOpen, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      dispatch(setAuthenticated(true));
      dispatch(setMessage("✓ Logged in successfully"));
      setAdminPassword("");
    } else {
      dispatch(setMessage("✗ Incorrect password"));
    }
    setTimeout(() => dispatch(setMessage("")), 2000);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("Delete this message?")) {
      dispatch(deleteContactById(id));
      dispatch(setMessage("✓ Message deleted"));
      setTimeout(() => dispatch(setMessage("")), 2000);
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Delete this project?")) {
      dispatch(deleteProjectById(id));
      dispatch(setMessage("✓ Project deleted"));
      setTimeout(() => dispatch(setMessage("")), 2000);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      dispatch(setMessage("✗ Title and description required"));
      setTimeout(() => dispatch(setMessage("")), 2000);
      return;
    }
    dispatch(
      createNewProject({
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
      })
    );
    setFormData({
      title: "",
      description: "",
      technologies: "",
      link: "",
      github: "",
    });
    dispatch(setMessage("✓ Project added successfully"));
    setTimeout(() => dispatch(setMessage("")), 2000);
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 400, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 400, scale: 0.95 },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Floating Admin Button */}
      <motion.button
        onClick={() => dispatch(setIsOpen(true))}
        whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl z-40 font-bold flex items-center gap-2 hover:shadow-purple-500/50 transition-all"
      >
        <MdDashboard size={22} />
        Admin
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setIsOpen(false))}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            />

            {/* Main Panel */}
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-6 left-6 right-6 md:right-auto md:bottom-6 md:left-6 md:w-[600px] max-h-[85vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MdDashboard size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Admin Dashboard</h2>
                    <p className="text-purple-100 text-xs">Manage your portfolio</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => dispatch(logout())}
                      className="text-white hover:bg-white/20 p-2 rounded-lg"
                      title="Logout"
                    >
                      <MdLogout size={22} />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => dispatch(setIsOpen(false))}
                    className="text-white hover:bg-white/20 p-2 rounded-lg"
                  >
                    <MdClose size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {!isAuthenticated ? (
                  // Login Screen
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-8"
                  >
                    <div className="text-center mb-8">
                      <div className="inline-block p-4 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full mb-4">
                        <MdVisibility size={40} className="text-purple-400" />
                      </div>
                      <h3 className="text-white text-xl font-bold">Admin Access</h3>
                      <p className="text-slate-400 text-sm mt-2">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-slate-300 text-sm font-semibold block mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition"
                      >
                        Unlock Admin Panel
                      </motion.button>
                    </form>

                    
                  </motion.div>
                ) : (
                  <>
                    {/* Tabs Navigation */}
                    <div className="flex gap-1 px-6 pt-4 border-b border-slate-700 overflow-x-auto">
                      {[
                        { id: "dashboard", label: "Dashboard", icon: MdDashboard },
                        { id: "contacts", label: "Messages", icon: MdMail },
                        { id: "projects", label: "Projects", icon: MdFolderOpen },
                        { id: "sections", label: "Content", icon: MdEdit },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <motion.button
                            key={tab.id}
                            onClick={() => dispatch(setActiveTab(tab.id))}
                            whileHover={{ y: -2 }}
                            className={`px-4 py-3 flex items-center gap-2 font-semibold text-sm border-b-2 transition ${
                              isActive
                                ? "border-purple-500 text-purple-400"
                                : "border-transparent text-slate-400 hover:text-slate-300"
                            }`}
                          >
                            <Icon size={18} />
                            {tab.label}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                      {/* Dashboard */}
                      {activeTab === "dashboard" && (
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <h3 className="text-white text-lg font-bold">Overview</h3>

                          <div className="grid grid-cols-2 gap-4">
                            <motion.div
                              whileHover={{ y: -5 }}
                              className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-xl p-4"
                            >
                              <p className="text-blue-400 text-sm font-semibold">Messages</p>
                              <p className="text-white text-3xl font-bold mt-2">{contacts.length}</p>
                              <p className="text-blue-300/60 text-xs mt-2">Total received</p>
                            </motion.div>

                            <motion.div
                              whileHover={{ y: -5 }}
                              className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 border border-emerald-500/30 rounded-xl p-4"
                            >
                              <p className="text-emerald-400 text-sm font-semibold">Projects</p>
                              <p className="text-white text-3xl font-bold mt-2">{projects.length}</p>
                              <p className="text-emerald-300/60 text-xs mt-2">Published</p>
                            </motion.div>
                          </div>

                          <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <MdCheckCircle className="text-green-400" size={20} />
                              <div>
                                <p className="text-slate-300 text-sm font-semibold">System Status</p>
                                <p className="text-green-400 text-xs">Active & Running</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MdCheckCircle className="text-green-400" size={20} />
                              <div>
                                <p className="text-slate-300 text-sm font-semibold">Database</p>
                                <p className="text-green-400 text-xs">Connected</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MdCheckCircle className="text-green-400" size={20} />
                              <div>
                                <p className="text-slate-300 text-sm font-semibold">Backend</p>
                                <p className="text-green-400 text-xs">Online</p>
                              </div>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              dispatch(fetchContacts());
                              dispatch(fetchProjects());
                            }}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                          >
                            <MdRefresh size={18} />
                            Refresh Data
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Messages */}
                      {activeTab === "contacts" && (
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-white font-bold">Messages ({contacts.length})</h3>
                            <motion.button
                              whileHover={{ rotate: 180 }}
                              onClick={() => dispatch(fetchContacts())}
                              className="text-purple-400 hover:text-purple-300"
                            >
                              <MdRefresh size={20} />
                            </motion.button>
                          </div>

                          {contactsLoading ? (
                            <Loader />
                          ) : contacts.length === 0 ? (
                            <div className="text-center py-8">
                              <MdMail size={40} className="text-slate-500 mx-auto mb-2" />
                              <p className="text-slate-400">No messages yet</p>
                            </div>
                          ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {contacts.map((contact, idx) => (
                                <motion.div
                                  key={contact._id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4 hover:border-purple-500/50 transition"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-white font-semibold text-sm">
                                        {contact.firstName} {contact.lastName}
                                      </p>
                                      <p className="text-purple-400 text-xs mt-1">{contact.email}</p>
                                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                                        {contact.message}
                                      </p>
                                      <p className="text-slate-500 text-xs mt-2">
                                        {new Date(contact.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      onClick={() => handleDeleteContact(contact._id)}
                                      className="text-red-400 hover:text-red-300 ml-2"
                                    >
                                      <MdDelete size={20} />
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Projects */}
                      {activeTab === "projects" && (
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          <h3 className="text-white font-bold">Manage Projects</h3>

                          {/* Add Project Form */}
                          <form onSubmit={handleAddProject} className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4 space-y-3">
                            <input
                              type="text"
                              placeholder="Project Title"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition text-sm"
                            />
                            <textarea
                              placeholder="Description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition text-sm resize-none"
                              rows="3"
                            />
                            <input
                              type="text"
                              placeholder="Technologies (comma-separated)"
                              value={formData.technologies}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  technologies: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition text-sm"
                            />
                            <input
                              type="url"
                              placeholder="Project Link"
                              value={formData.link}
                              onChange={(e) =>
                                setFormData({ ...formData, link: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition text-sm"
                            />
                            <input
                              type="url"
                              placeholder="GitHub Link"
                              value={formData.github}
                              onChange={(e) =>
                                setFormData({ ...formData, github: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition text-sm"
                            />
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              type="submit"
                              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                            >
                              <MdAdd size={18} />
                              Add Project
                            </motion.button>
                          </form>

                          {/* Projects List */}
                          {projectsLoading ? (
                            <Loader />
                          ) : projects.length === 0 ? (
                            <div className="text-center py-8">
                              <MdFolderOpen size={40} className="text-slate-500 mx-auto mb-2" />
                              <p className="text-slate-400">No projects yet</p>
                            </div>
                          ) : (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {projects.map((project, idx) => (
                                <motion.div
                                  key={project._id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="bg-slate-700/40 border border-slate-600/50 rounded-lg p-4 hover:border-emerald-500/50 transition"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-white font-semibold text-sm">{project.title}</p>
                                      <p className="text-slate-400 text-xs mt-1 line-clamp-1">
                                        {project.description}
                                      </p>
                                      <div className="flex gap-2 mt-2 flex-wrap">
                                        {project.technologies?.slice(0, 3).map((tech, i) => (
                                          <span
                                            key={i}
                                            className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded border border-purple-500/30"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      onClick={() => handleDeleteProject(project._id)}
                                      className="text-red-400 hover:text-red-300 ml-2"
                                    >
                                      <MdDelete size={20} />
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* Content Editor */}
                      {activeTab === "sections" && (
                        <motion.div
                          variants={tabVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <SectionEditPanel />
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Message Notification */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`px-6 py-3 flex items-center gap-2 font-semibold text-sm border-t ${
                    message.includes("✓")
                      ? "bg-green-600/20 border-green-500/30 text-green-300"
                      : "bg-red-600/20 border-red-500/30 text-red-300"
                  }`}
                >
                  {message.includes("✓") ? (
                    <MdCheckCircle size={18} />
                  ) : (
                    <MdErrorOutline size={18} />
                  )}
                  {message}
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanelPro;
