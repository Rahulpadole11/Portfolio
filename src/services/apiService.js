// API Service - All API endpoints
import apiClient from './apiClient/axiosClient';

// ============ CONTACTS API ============

export const contactsAPI = {
  // Submit a contact message
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all contacts
  getContacts: async () => {
    try {
      const response = await apiClient.get('/contacts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single contact
  getContact: async (id) => {
    try {
      const response = await apiClient.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      const response = await apiClient.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// ============ PROJECTS API ============

export const projectsAPI = {
  // Get all projects
  getProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single project
  getProject: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create project
  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await apiClient.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// ============ EXPERIENCES API ============

export const experiencesAPI = {
  // Get all experiences
  getExperiences: async () => {
    try {
      const response = await apiClient.get('/experiences');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single experience
  getExperience: async (id) => {
    try {
      const response = await apiClient.get(`/experiences/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create experience
  createExperience: async (experienceData) => {
    try {
      const response = await apiClient.post('/experiences', experienceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update experience
  updateExperience: async (id, experienceData) => {
    try {
      const response = await apiClient.put(`/experiences/${id}`, experienceData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete experience
  deleteExperience: async (id) => {
    try {
      const response = await apiClient.delete(`/experiences/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// ============ SECTIONS API ============

export const sectionsAPI = {
  // Get section data
  getSectionData: async (section) => {
    try {
      const response = await apiClient.get(`/sections/${section}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update section data
  updateSectionData: async (section, data) => {
    try {
      const response = await apiClient.put(`/sections/${section}`, { data });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all sections
  getAllSections: async () => {
    try {
      const response = await apiClient.get('/sections');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

// ============ HEALTH CHECK ============

export const healthAPI = {
  // Check server health
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default {
  contacts: contactsAPI,
  projects: projectsAPI,
  experiences: experiencesAPI,
  sections: sectionsAPI,
  health: healthAPI,
};
