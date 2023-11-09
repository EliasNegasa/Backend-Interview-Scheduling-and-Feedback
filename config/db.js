import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;