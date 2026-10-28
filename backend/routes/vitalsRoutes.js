import express from 'express';
import Vitals from '../models/Vitals.js';

const router = express.Router();

// GET /api/vitals - Get latest vitals reading
router.get('/', async (req, res) => {
  try {
    let latest = await Vitals.findOne().sort({ createdAt: -1 });
    if (!latest) {
      latest = await Vitals.create({
        heartRate: 72,
        bloodPressure: '120/80',
        spo2: 98,
        healthScore: 85,
        memberName: 'Self',
        notes: 'Initial baseline vitals',
      });
    }
    res.json({ success: true, data: latest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/vitals - Record a new vitals reading
router.post('/', async (req, res) => {
  try {
    const { heartRate, bloodPressure, spo2, healthScore, memberName, notes } = req.body;
    const newVitals = await Vitals.create({
      heartRate: heartRate || 72,
      bloodPressure: bloodPressure || '120/80',
      spo2: spo2 || 98,
      healthScore: healthScore || 85,
      memberName: memberName || 'Self',
      notes: notes || 'Daily vitals record',
    });
    res.status(201).json({ success: true, data: newVitals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

