import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

if (!process.env.MONGO) {
  console.error('MongoDB connection URI is not defined in the environment variables.');
  process.exit(1); 
}

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

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is on port 3000');
});


app.get('/', (req, res) => {
  res.json({
    messages: 'API is working ',
  })
})


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
  
});