import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Education from './models/Education.js';
import Certificate from './models/Certificate.js';
import Social from './models/Social.js';
import Settings from './models/Settings.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await Certificate.deleteMany();
    await Social.deleteMany();
    await Settings.deleteMany();

    await User.create({
      name: 'Radhin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });

    await Project.insertMany([
      { title: 'MITTI', slug: 'mitti', description: 'A full-featured MERN stack e-commerce platform with payment integration, real-time inventory, and admin dashboard.', shortDescription: 'MERN E-commerce Platform', liveUrl: 'https://mitti-zeta.vercel.app', techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'], features: ['Payment Integration', 'Real-time Inventory', 'Admin Dashboard', 'Responsive Design'], category: 'fullstack', featured: true, order: 1 },
      { title: 'AI Resume Builder', slug: 'ai-resume-builder', description: 'AI-powered resume builder with dynamic templates, ATS optimization, and PDF export.', shortDescription: 'AI Resume Builder', techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'PDF.js'], features: ['AI Content Generation', 'Multiple Templates', 'ATS Optimization', 'PDF Export'], category: 'fullstack', featured: true, order: 2 },
      { title: 'Hotel Management System', slug: 'hotel-management', description: 'Complete hotel management solution with booking, billing, and room management.', shortDescription: 'Hotel Management System', techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'], features: ['Real-time Booking', 'Billing System', 'Room Management', 'Staff Dashboard'], category: 'fullstack', featured: true, order: 3 },
      { title: 'Movie Ticket Booking', slug: 'movie-ticket-booking', description: 'Modern movie ticket booking platform with seat selection, payments, and showtimes.', shortDescription: 'Movie Ticket Booking', techStack: ['React', 'Node.js', 'Express', 'MongoDB'], features: ['Seat Selection', 'Payment Gateway', 'Showtime Management', 'Email Notifications'], category: 'fullstack', featured: false, order: 4 },
      { title: 'Inventory Management', slug: 'inventory-management', description: 'Inventory management system with tracking, analytics, and alert system.', shortDescription: 'Inventory Management', techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'], features: ['Stock Tracking', 'Analytics Dashboard', 'Low Stock Alerts', 'Barcode Support'], category: 'fullstack', featured: false, order: 5 },
    ]);

    await Skill.insertMany([
      { name: 'React', category: 'frontend', level: 90, color: '#61DAFB', order: 1 },
      { name: 'JavaScript', category: 'frontend', level: 92, color: '#F7DF1E', order: 2 },
      { name: 'HTML', category: 'frontend', level: 95, color: '#E34F26', order: 3 },
      { name: 'CSS', category: 'frontend', level: 90, color: '#1572B6', order: 4 },
      { name: 'Tailwind CSS', category: 'frontend', level: 88, color: '#06B6D4', order: 5 },
      { name: 'Bootstrap', category: 'frontend', level: 85, color: '#7952B3', order: 6 },
      { name: 'Node.js', category: 'backend', level: 85, color: '#339933', order: 7 },
      { name: 'Express.js', category: 'backend', level: 82, color: '#000000', order: 8 },
      { name: 'MongoDB', category: 'database', level: 80, color: '#47A248', order: 9 },
      { name: 'MySQL', category: 'database', level: 75, color: '#4479A1', order: 10 },
      { name: 'Git', category: 'tools', level: 85, color: '#F05032', order: 11 },
      { name: 'GitHub', category: 'tools', level: 88, color: '#181717', order: 12 },
      { name: 'VS Code', category: 'tools', level: 90, color: '#007ACC', order: 13 },
      { name: 'Postman', category: 'tools', level: 82, color: '#FF6C37', order: 14 },
      { name: 'Cloudinary', category: 'tools', level: 78, color: '#F23D6F', order: 15 },
      { name: 'JWT', category: 'tools', level: 80, color: '#000000', order: 16 },
    ]);

    await Experience.create({
      company: 'BDreamz Global Solutions',
      position: 'MERN Stack Developer Intern',
      description: 'Developed full-stack web applications using the MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      achievements: ['Built 3 full-stack applications from scratch', 'Implemented RESTful APIs with Node.js and Express', 'Developed responsive UIs with React and Tailwind CSS', 'Integrated MongoDB for data persistence'],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      location: 'Chennai',
      order: 1,
    });

    await Education.insertMany([
      { institution: 'Malabar College of Engineering', degree: 'Bachelor of Technology', field: 'Computer Science', startDate: new Date('2020-08-01'), endDate: new Date('2024-05-31'), location: 'Kerala', order: 1 },
      { institution: 'Besant Technologies', degree: 'MERN Stack Development', field: 'Full Stack Web Development', startDate: new Date('2023-06-01'), endDate: new Date('2023-12-31'), location: 'Chennai', order: 2 },
    ]);

    await Certificate.insertMany([
      { title: 'MERN Stack Development', issuer: 'Besant Technologies', date: new Date('2023-12-15'), description: 'Completed comprehensive MERN stack development training', order: 1 },
      { title: 'Web Development Internship', issuer: 'BDreamz Global Solutions', date: new Date('2024-06-30'), description: 'Successfully completed 6-month internship as MERN Stack Developer', order: 2 },
    ]);

    await Social.insertMany([
      { platform: 'GitHub', url: 'https://github.com/radhinraj', icon: 'github', order: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/radhinraj', icon: 'linkedin', order: 2 },
      { platform: 'Instagram', url: 'https://www.instagram.com/ra.th.in?igsh=MWNvZTB1ZzQ1a2p4ZQ%3D%3D&utm_source=qr', icon: 'instagram', order: 3 },
      { platform: 'Email', url: 'mailto:rathinraj1122@gmail.com', icon: 'mail', order: 4 },
    ]);

    await Settings.insertMany([
      { key: 'siteName', value: 'Radhin | MERN Stack Developer' },
      { key: 'heroTitle', value: 'MERN Stack Developer' },
      { key: 'aboutText', value: 'Passionate MERN Stack Developer from Kerala, currently based in Chennai. Building modern web applications with cutting-edge technologies.' },
      { key: 'location', value: 'Chennai, India' },
      { key: 'phone', value: '+91 6238659224' },
      { key: 'email', value: 'rathinraj1122@gmail.com' },
    ]);

    process.exit(0);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    process.exit(1);
  }
};

seed();
