import SectionData from '../models/SectionData.js';

// Get section data
export const getSectionData = async (req, res) => {
  try {
    const { section } = req.params;
    let data = await SectionData.findOne({ section });

    // Return default data if not found
    if (!data) {
      const defaults = {
        about: {
          name: 'Rahul Padole',
          role: 'Full-Stack Developer',
          about: 'Frontend & Full-Stack Developer with 1 years of hands-on experience...',
        },
        skills: {
          frontend: ['HTML', 'CSS', 'JavaScript (ES6+)', 'React.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Axios'],
          backend: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Authentication & JWT', 'Postman', 'Git & GitHub', 'AI Integration'],
        },
        experience: [],
        contact: {
          email: 'rahulpadole43@gmail.com',
          location: 'Nagpur, India',
          phone: '+91-8765432109',
          linkedin: 'https://www.linkedin.com/in/rahul-padole-542600245/',
          github: 'https://github.com/Rahulpadole11',
          twitter: 'https://x.com/It51Rahul90153',
        },
      };

      data = await SectionData.create({
        section,
        data: defaults[section],
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update section data
export const updateSectionData = async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    let sectionData = await SectionData.findOneAndUpdate(
      { section },
      { data },
      { new: true, upsert: true }
    );

    res.json(sectionData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sections data
export const getAllSectionsData = async (req, res) => {
  try {
    const sections = await SectionData.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
