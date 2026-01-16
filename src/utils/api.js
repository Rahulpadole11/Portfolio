// API utility for communicating with backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Contacts API
export const submitContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit contact');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Projects API
export const getProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
