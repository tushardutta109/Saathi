import React, { useState, useEffect } from 'react';
import MedicineCard from '../components/MedicineCard';
import Modal from '../components/Modal';
import { api } from '../services/api';

export function Medicines({ medicines: externalMeds, setMedicines: setExternalMeds, t, lang = 'en' }) {
  const [localMedicines, setLocalMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '1 tablet' });

  const medicines = externalMeds || localMedicines;
  const setMedicines = setExternalMeds || setLocalMedicines;

  useEffect(() => {
    if (!externalMeds || externalMeds.length === 0) loadMedicines();
  }, []);

  const loadMedicines = async () => {
    setLoading(true);
    const data = await api.getMedicines();
    setMedicines(data);
    setLoading(false);
  };

  const handleMarkTaken = async (id) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'taken' } : m)));
    await api.markMedicineTaken(id);
  };

  const handleSaveMedicine = async () => {
    if (!newMed.name || !newMed.time) return;
    const added = {
      name: newMed.name,
      time: newMed.time,
      dosage: newMed.dosage || '1 tablet',
      status: 'upcoming',
      icon: '💊',
    };
    try {
      const saved = await api.addMedicine(added);
      setMedicines((prev) => [...prev, saved || { ...added, id: `med-${Date.now()}` }]);
    } catch {
      setMedicines((prev) => [...prev, { ...added, id: `med-${Date.now()}` }]);
    }
    setShowAddModal(false);
    setNewMed({ name: '', time: '', dosage: '1 tablet' });
  };

  // Progress ring stats
  const takenCount = medicines.filter((m) => m.status === 'taken').length;
  const totalCount = medicines.length;
  const pct = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;
  // SVG ring
  const R = 38;
  const C = 2 * Math.PI * R;
  const dash = (pct / 100) * C;

  return (
    <div className="medicines-page animate-fadeIn">

      {/* Page Header */}
      <div className="med-page-header">
        <div>
          <h2 className="med-page-title">
            <span>💊</span>
            <span>{t.medicinesTitle}</span>
          </h2>
          <p className="med-page-sub">{t.medicinesSub}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          {t.addMedicineBtn}
        </button>
      </div>

      {/* ── PROGRESS RING CARD ── */}
      {!loading && totalCount > 0 && (
        <div className="med-progress-card">
          <div className="med-progress-ring-wrap">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r={R} fill="none" stroke="var(--border-color)" strokeWidth="8" />
              <circle
                cx="48" cy="48" r={R}
                fill="none"
                stroke={pct === 100 ? '#27AE60' : 'var(--primary-forest)'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`}
                strokeDashoffset={C / 4}
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
              <text x="48" y="53" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--primary-forest)">{pct}%</text>
            </svg>
          </div>
          <div className="med-progress-text">
            <h3 className="med-progress-heading">
              <span style={{ color: 'var(--primary-forest)', fontSize: '36px', fontWeight: '900' }}>{takenCount}</span>
              <span style={{ fontSize: '24px', color: 'var(--text-sub)', fontWeight: '600' }}> / {totalCount}</span>
            </h3>
            <p className="med-progress-sub">
              {lang === 'hi' ? 'दवाइयाँ आज ली गई' :
               lang === 'bn' ? 'আজকের ওষুধ খাওয়া হয়েছে' :
               lang === 'as' ? "???? ??? ???? ?'?" :
               'medicines taken today'}
            </p>
            {pct === 100 && (
              <span className="med-all-done-badge">🎉 All done for today!</span>
            )}
          </div>
        </div>
      )}

      {/* Medicine List */}
      {loading ? (
        <div className="loading-box">
          <div className="spinner" />
          <span>Loading medicine schedule...</span>
        </div>
      ) : (
        <div className="medicine-list">
          {medicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onMarkTaken={handleMarkTaken}
              t={{ ...t, _lang: lang }}
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

      {/* Add Medicine Modal */}
      <Modal
        isOpen={showAddModal}
        title={t.addMedTitle}
        icon="💊"
        onClose={() => setShowAddModal(false)}
        confirmText={t.saveMedBtn}
        cancelText={t.emergencyCancel}
        onConfirm={handleSaveMedicine}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medNameLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. Metformin 500mg"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '17px', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medTimeLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. 8:00 AM / 9:00 PM"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '17px', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary-forest)', display: 'block', marginBottom: '6px' }}>
              {t.medDosageLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. 1 tablet"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', border: '2px solid var(--border-dark)', fontSize: '17px', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Medicines;
