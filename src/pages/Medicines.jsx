import React, { useState, useEffect } from 'react';
import MedicineCard from '../components/MedicineCard';
import Modal from '../components/Modal';
import { api } from '../services/api';

export function Medicines({ medicines: externalMeds, setMedicines: setExternalMeds, t }) {
  const [localMedicines, setLocalMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '1 tablet' });

  // Sync external medicines if provided, otherwise fetch default API medicines
  const medicines = externalMeds || localMedicines;
  const setMedicines = setExternalMeds || setLocalMedicines;

  useEffect(() => {
    if (!externalMeds || externalMeds.length === 0) {
      loadMedicines();
    }
  }, []);

  const loadMedicines = async () => {
    setLoading(true);
    const data = await api.getMedicines();
    setMedicines(data);
    setLoading(false);
  };

  const handleMarkTaken = async (id) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'taken' } : m))
    );
    await api.markMedicineTaken(id);
  };

  const handleSaveMedicine = () => {
    if (!newMed.name || !newMed.time) return;
    const added = {
      id: `med-${Date.now()}`,
      name: newMed.name,
      time: newMed.time,
      dosage: newMed.dosage || '1 tablet',
      status: 'upcoming',
      icon: '💊',
    };
    setMedicines((prev) => [...prev, added]);
    setShowAddModal(false);
    setNewMed({ name: '', time: '', dosage: '1 tablet' });
  };

  return (
    <div className="medicines-page animate-fadeIn">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-forest)' }}>
            <span>💊</span>
            <span>{t.medicinesTitle}</span>
          </h2>
          <p style={{ fontSize: '20px', color: 'var(--text-sub)', fontWeight: '600' }}>
            {t.medicinesSub}
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          {t.addMedicineBtn}
        </button>
      </div>

      {/* Medicines Schedule List */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <span>Loading medicine schedule...</span>
        </div>
      ) : (
        <div className="medicine-list">
          {medicines.map((med) => (
            <MedicineCard 
              key={med.id} 
              medicine={med} 
              onMarkTaken={handleMarkTaken}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Warning Card */}
      <div className="warning-alert-card">
        <span className="warning-icon" role="img" aria-label="Warning">⚠️</span>
        <div className="warning-content">
          <h4 className="warning-title">{t.medWarningTitle}</h4>
          <p className="warning-text">{t.medWarningText}</p>
        </div>
      </div>

      {/* Modal for Adding New Medicine */}
      <Modal
        isOpen={showAddModal}
        title={t.addMedTitle}
        icon="💊"
        onClose={() => setShowAddModal(false)}
        confirmText={t.saveMedBtn}
        cancelText={t.emergencyCancel}
        onConfirm={handleSaveMedicine}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginTop: '10px' }}>
          <div>
            <label style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medNameLabel}
            </label>
            <input 
              type="text" 
              placeholder="e.g. Medicine D"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '18px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medTimeLabel}
            </label>
            <input 
              type="text" 
              placeholder="e.g. 8:00 AM / 9:00 PM"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '18px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medDosageLabel}
            </label>
            <input 
              type="text" 
              placeholder="e.g. 1 tablet"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '18px' }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Medicines;
