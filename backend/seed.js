import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import SectionData from './models/SectionData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Contact.deleteMany({});
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await SectionData.deleteMany({});

    // Add sample experiences
    const sampleExperiences = [
      {
        id: 1,
        company: 'CS Tech AI',
        position: 'Frontend Developer Intern',
        duration: 'Sept 2025 – Jan 2026',
        description: 'Developed scalable React.js modules for the MHADA Housing & Building Services System serving citizen and admin users.',
        achievements: [
          'Built multi-step forms with real-time validation and role-based dashboards',
          'Optimized UI rendering using React.memo and lazy loading, improving load speed by 20–30%',
          'Integrated REST APIs and handled asynchronous data workflows',
          'Implemented fully responsive UI across mobile, tablet, and desktop devices',
          'Successfully completed internship with official certification',
        ],
      },
      {
        id: 2,
        company: 'PHN Technology Pvt. Ltd.',
        position: 'Full-Stack Engineer Intern',
        duration: 'Mar 2023 – Jun 2023',
        description: 'Rebuilt and optimized the company website for performance and maintainability.',
        achievements: [
          'Implemented mobile-first responsive design, reducing page load time by 25%',
          'Collaborated with design and product teams to deliver features efficiently',
          'Assisted in backend API integration and database connectivity using Node.js and MySQL',
        ],
      },
    ];
    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce application built with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://example.com',
        github: 'https://github.com/example/ecommerce',
      },
      {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing projects and skills',
        technologies: ['React', 'Tailwind CSS', 'Vite'],
        link: 'https://example.com',
        github: 'https://github.com/example/portfolio',
      },
    ];

    await Project.insertMany(sampleProjects);
    console.log('Sample projects added');

    await Experience.insertMany(sampleExperiences);
    console.log('Sample experiences added');

    // Create SectionData for experience
    const experienceSectionData = new SectionData({
      section: 'experience',
      data: sampleExperiences,
    });
    await experienceSectionData.save();
    console.log('Experience section data created');

    mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
