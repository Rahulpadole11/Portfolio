import Experience from '../models/Experience.js';

// Create new experience
export const createExperience = async (req, res) => {
  try {
    const { company, position, duration, description, achievements } = req.body;

    if (!company || !position || !duration || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get the highest existing ID and increment by 1
    const lastExperience = await Experience.findOne().sort({ id: -1 });
    const newId = (lastExperience?.id || 0) + 1;

    const newExperience = new Experience({
      id: newId,
      company,
      position,
      duration,
      description,
      achievements: achievements || [],
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
};

// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
};

// Get experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(200).json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Error fetching experience', error: error.message });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { company, position, duration, description, achievements } = req.body;

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        company,
        position,
        duration,
        description,
        achievements: achievements || [],
      },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
};