import mongoose from 'mongoose';
import Experience from './models/Experience.js';

async function test() {
  try {
    await mongoose.connect('mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');
    
    const exp = await Experience.find().sort({ createdAt: -1 });
    console.log('Experiences:', JSON.stringify(exp, null, 2));
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

test();
