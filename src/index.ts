import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

// Import Routes
import projectRouter from './routes/projects.route';
import skillRouter from './routes/skills.route';
import categoryRouter from './routes/category.route';
import achievementRouter from './routes/achievement.route';
import infoRouter from './routes/info.route';
import educationRouter from './routes/education.route';
import authRouter from './routes/auth.route';
import contactRouter from './routes/contact.route';

dotenv.config();
const app = express();

// Initialize constants from Environment file
const clientUrl = process.env.CLIENT_URL as string;
const adminUrl = process.env.ADMIN_URL as string;
const mongodbString = process.env.MONGODB_CONNECTION_URI as string;
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME as string;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY as string;
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET as string;
const port = process.env.PORT || 5001;

// Throw error if any constant is missing
if (!mongodbString) throw new Error('[-] There is no MongoDB connection URI on Env variable!');
if (!clientUrl) throw new Error('[-] There is no Client URL on Env variables!');
if (!adminUrl) throw new Error('[-] There is no Admin URL on Env variables!');
if (!cloudinaryName)
  throw new Error("[-] There is no Cloudinary's Cloud name URL on Env variables!");
if (!cloudinaryKey) throw new Error("[-] There is no Cloudinary's Cloud Key URL on Env variables!");
if (!cloudinarySecret)
  throw new Error("[-] There is no Cloudinary's Cloud Secret URL on Env variables!");

// Connect MongoDB
mongoose
  .connect(mongodbString)
  .then(() => {
    console.log('[+] MongoDB connected successfully.');
  })
  .catch((error) => {
    console.error('[!] Error mongodb connection:', error);
  });

// Cloudinary initialization
cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

// Pass CORS to Express
app.use(
  cors({
    origin: [clientUrl, adminUrl],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User Routes

// Admin Routes
app.use('/projects', projectRouter);
app.use('/categories', categoryRouter);
app.use('/skills', skillRouter);
app.use('/achievements', achievementRouter);
app.use('/info', infoRouter);
app.use('/education', educationRouter);
app.use('/admin-ath', authRouter);
app.use('/contact', contactRouter);

app.listen(Number(port), () => {
  console.log('[+] The app is running');
});
