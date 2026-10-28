import express from 'express';
import Medicine from '../models/Medicine.js';

const router = express.Router();

// Initial seed data if collection is empty
const defaultMedicines = [
  {
    name: 'Medicine A',
    time: '8:00 AM',
    dosage: '1 tablet',
    purpose: 'Blood Pressure / BP',
    timingDetail: 'After Breakfast',
    status: 'taken',
    icon: '💊',
  },
  {
    name: 'Medicine B',
    time: '2:00 PM',
    dosage: '1 tablet',
    purpose: 'Multivitamin',
    timingDetail: 'After Lunch',
    status: 'upcoming',
    icon: '💊',
  },
  {
    name: 'Medicine C',
    time: '9:00 PM',
    dosage: '1 tablet',
    purpose: 'Diabetes Care',
    timingDetail: 'After Dinner',
    status: 'upcoming',
    icon: '💊',
  },
];

// GET /api/medicines - Get all medicines (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let meds = await Medicine.find().sort({ createdAt: 1 });
    if (meds.length === 0) {
      meds = await Medicine.insertMany(defaultMedicines);
    }
    res.json({ success: true, count: meds.length, data: meds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/medicines - Create a new medicine
router.post('/', async (req, res) => {
  try {
    const { name, time, dosage, purpose, timingDetail, status, icon } = req.body;
    if (!name || !time) {
      return res.status(400).json({ success: false, message: 'Name and Time are required' });
    }

    const newMed = await Medicine.create({
      name,
      time,
      dosage: dosage || '1 tablet',
      purpose: purpose || 'Daily Wellness',
      timingDetail: timingDetail || 'After Food',
      status: status || 'upcoming',
      icon: icon || '💊',
    });

    res.status(201).json({ success: true, data: newMed });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/medicines/bulk - Add multiple medicines (e.g. from prescription upload)
router.post('/bulk', async (req, res) => {
  try {
    const { medicines } = req.body;
    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ success: false, message: 'Array of medicines is required' });
    }

    const inserted = await Medicine.insertMany(medicines);
    res.status(201).json({ success: true, count: inserted.length, data: inserted });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/medicines/:id - Update status (taken/upcoming) or details
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/medicines/:id - Delete a medicine
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }
    res.json({ success: true, message: 'Medicine deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

