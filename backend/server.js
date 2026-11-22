import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import medicineRoutes from './routes/medicineRoutes.js';
import vitalsRoutes from './routes/vitalsRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import voiceRoutes from './routes/voiceRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env reliably whether started from root or from backend folder
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/voice', voiceRoutes);
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
