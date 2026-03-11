import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connection to MongoDB established.');
  } catch (error) {
    console.error('Error trying to connect to MongoDB:', error);
    process.exit(1);
  }
};
