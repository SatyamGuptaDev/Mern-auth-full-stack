import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if MONGO variable is properly loaded
if (!process.env.MONGO) {
  console.error('MongoDB connection URI is not defined in the environment variables.');
  process.exit(1); // Exit the process if MongoDB URI is not defined
}

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO).then(
  () => {
    console.log('Connected to MongoDB');
  }
).catch(
  (err) => {
    console.log('Error connecting to MongoDB', err);
  }
);

const app = express();

app.listen(3000, () => {
  console.log('Server is on port 3000');
});
