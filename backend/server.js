import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import medicineRoutes from './routes/medicineRoutes.js';
import vitalsRoutes from './routes/vitalsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/vitals', vitalsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Saathi Backend is Running with MongoDB! 🚀',
    endpoints: ['/api/medicines', '/api/vitals'],
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
