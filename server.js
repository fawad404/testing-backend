import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import taskRoute from './routes/task.route.js';
import submitedTaskRoute from './routes/submitedTask.route.js';
import gigRoute from './routes/gig.route.js';
import orderRoute from './routes/order.route.js';
import converstionRoute from './routes/conversation.route.js';
import messageRoute from './routes/message.route.js';
import reviewRoute from './routes/review.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// MongoDB connection
const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect MongoDB once when the app starts
connectMongodb();

// Middleware for CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://https://www.expertsync.co.uk/"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json("welcome fawad on main route");
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json("welcome fawad on main route");
});


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);
app.use("/api/submitedTask", submitedTaskRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversation", converstionRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Global error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!🤔";
  return res.status(errorStatus).send(errorMessage);
});


export default app;