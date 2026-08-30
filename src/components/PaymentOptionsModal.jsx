import React, { useState } from 'react';
import Modal from './Modal';
import { voiceService } from '../services/voiceService';

export function PaymentOptionsModal({ isOpen, onClose, lang = 'en', t, onAddNotification }) {
  const [activeTab, setActiveTab] = useState('upi');
  const [selectedAmount, setSelectedAmount] = useState('500');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  if (!isOpen) return null;

  const paymentTabs = [
    { id: 'upi', labelEn: '📱 UPI & QR', labelHi: '📱 UPI व जीपे/फ़ोनपे', icon: '📱' },
    { id: 'cards', labelEn: '💳 Cards (RuPay/Visa)', labelHi: '💳 डेबिट/क्रेडिट कार्ड', icon: '💳' },
    { id: 'netbanking', labelEn: '🏛️ Net Banking', labelHi: '🏛️ नेट बैंकिंग', icon: '🏛️' },
    { id: 'insurance', labelEn: '🏥 Ayushman & Insurance', labelHi: '🏥 आयुष्मान व बीमा', icon: '🏥' },
    { id: 'counter', labelEn: '💵 Pay at Hospital', labelHi: '💵 अस्पताल काउंटर भुगतान', icon: '💵' },
  ];

  const upiApps = [
    { name: 'Google Pay (GPay)', icon: '🟢', color: '#1A73E8' },
    { name: 'PhonePe', icon: '🟣', color: '#5F259F' },
    { name: 'Paytm UPI', icon: '🔵', color: '#1a4552ff' },
    { name: 'BHIM UPI', icon: '🟠', color: '#FF7A00' },
    { name: 'Scan Hospital QR Code', icon: '📷', color: '#1B4D3E' },
  ];

  const netBanks = [
    { name: 'State Bank of India (SBI)', code: 'sbi' },
    { name: 'HDFC Bank', code: 'hdfc' },
    { name: 'ICICI Bank', code: 'icici' },
    { name: 'Axis Bank', code: 'axis' },
    { name: 'Punjab National Bank (PNB)', code: 'pnb' },
    { name: 'Bank of Baroda', code: 'bob' },
  ];

  const insuranceOptions = [
    { name: 'Ayushman Bharat (PM-JAY) Cashless', desc: 'Govt. 5 Lakh Free Health Coverage' },
    { name: 'Senior Citizen Health Insurance Policy', desc: 'Mediclaim Cashless Admission' },
    { name: 'CGHS / EHS Employee Scheme', desc: 'Central Govt Health Card' },
  ];

  const handleSimulatePayment = (methodName) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const details = {
        txnId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: selectedAmount,
        method: methodName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSuccessDetails(details);

      // Voice readout in patient's language
      let voiceText = '';
      if (lang === 'hi') {
        voiceText = `भुगतान सफल रहा! ${selectedAmount} रुपये का भुगतान ${methodName} द्वारा पूरा हुआ। ट्रांजैक्शन आईडी है ${details.txnId}।`;
      } else if (lang === 'bn') {
        voiceText = `পেমেন্ট সফল হয়েছে! ${selectedAmount} টাকা ${methodName} দিয়ে পরিশোধ করা হয়েছে।`;
      } else if (lang === 'as') {
        voiceText = `পেমেন্ট সফল হ'ল! ${selectedAmount} টকা ${methodName} ৰ দ্বাৰা পৰিশোধ কৰা হ'ল।`;
      } else {
        voiceText = `Payment successful! Amount rupees ${selectedAmount} paid via ${methodName}. Transaction ID is ${details.txnId}.`;
      }

      voiceService.speak(voiceText, lang);

      if (onAddNotification) {
        onAddNotification({
          title: lang === 'hi' ? `💳 भुगतान सफल: ₹${selectedAmount}` : `💳 Payment Successful: ₹${selectedAmount}`,
          message: `${methodName} - Txn ID: ${details.txnId}`,
          icon: '✅',
          type: 'success'
        });
      }
    }, 1800);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    setSuccessDetails(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={lang === 'hi' ? '💳 अस्पताल व इलाज भुगतान के विकल्प' : '💳 Hospital Bill & Appointment Payment Options'}
      icon="💳"
      cancelText={lang === 'hi' ? 'बंद करें' : 'Close'}
    >
      <div className="payment-modal-container">
        {paymentSuccess && successDetails ? (
          /* Payment Success Confirmation View */
          <div style={{ textAlign: 'center', padding: '20px 10px' }} className="animate-fadeIn">
            <div style={{ fontSize: '56px', marginBottom: '10px' }}>✅</div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--green-success)', marginBottom: '8px' }}>
              {lang === 'hi' ? 'भुगतान सफल रहा!' : 'Payment Successful!'}
            </h3>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>
              Amount Paid: <span style={{ color: 'var(--primary-forest)', fontSize: '24px' }}>₹{successDetails.amount}</span>
            </p>

            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid var(--border-dark)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              <p style={{ margin: '4px 0', fontSize: '15px' }}><strong>Method:</strong> {successDetails.method}</p>
              <p style={{ margin: '4px 0', fontSize: '15px' }}><strong>Transaction ID:</strong> {successDetails.txnId}</p>
              <p style={{ margin: '4px 0', fontSize: '15px' }}><strong>Time:</strong> {successDetails.time}</p>
              <p style={{ margin: '4px 0', fontSize: '15px', color: 'var(--green-success)' }}><strong>Status:</strong> Completed & Verified ✓</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleClose}
              style={{ width: '100%', fontSize: '18px' }}
            >
              ✓ {lang === 'hi' ? 'रसीद देखें व मुख्य पृष्ठ पर जाएं' : 'Done / Back to App'}
            </button>
          </div>
        ) : (
          /* Payment Selection View */
          <div>
            {/* Amount Selector Row */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '15px', fontWeight: '800', display: 'block', marginBottom: '6px', color: 'var(--text-main)' }}>
                💰 {lang === 'hi' ? 'भुगतान राशि चुनें (Select Payment Amount):' : 'Select Payment Amount:'}
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['500', '1200', '2500', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    style={{
                      flex: 1,
                      minWidth: '75px',
                      padding: '10px',
                      borderRadius: '12px',
                      border: selectedAmount === amt ? '2px solid var(--primary-forest)' : '1px solid var(--border-dark)',
                      backgroundColor: selectedAmount === amt ? 'var(--primary-forest)' : 'var(--bg-secondary)',
                      color: selectedAmount === amt ? '#FFFFFF' : 'var(--text-main)',
                      fontWeight: '800',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Category Scroll Tabs */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
              {paymentTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '16px',
                    border: activeTab === tab.id ? '2px solid var(--primary-forest)' : '1px solid var(--border-dark)',
                    backgroundColor: activeTab === tab.id ? 'var(--primary-forest)' : 'var(--bg-secondary)',
                    color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-main)',
                    fontWeight: '800',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {lang === 'hi' ? tab.labelHi : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Processing Indicator */}
            {isProcessing ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div className="pulsing-heart-icon fast-pulse" style={{ fontSize: '48px', marginBottom: '12px' }}>🔄</div>
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-forest)' }}>
                  {lang === 'hi' ? 'भुगतान सुरक्षित रूप से संसाधित हो रहा है...' : 'Processing Secure Payment...'}
                </h4>
                <p style={{ fontSize: '15px', color: 'var(--text-sub)' }}>
                  Please do not refresh or close window.
                </p>
              </div>
            ) : (
              <div>
                {/* 1. UPI & QR Code Tab */}
                {activeTab === 'upi' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: 'var(--text-sub)' }}>
                      {lang === 'hi' ? 'अपने पसंदीदा UPI ऐप द्वारा भुगतान करें:' : 'Pay instantly via your favorite UPI app:'}
                    </p>
                    {upiApps.map((app, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSimulatePayment(app.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '14px',
                          border: '1.5px solid var(--border-dark)',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-main)',
                          fontWeight: '800',
                          fontSize: '16px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>{app.icon}</span>
                          <span>{app.name}</span>
                        </span>
                        <span style={{ color: app.color, fontWeight: '800' }}>Pay ₹{selectedAmount} →</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Cards Tab */}
                {activeTab === 'cards' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['RuPay (India)', 'Visa', 'Mastercard'].map((cardType, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSimulatePayment(`${cardType} Card`)}
                          style={{
                            flex: 1,
                            padding: '14px 10px',
                            borderRadius: '14px',
                            border: '1.5px solid var(--border-dark)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-main)',
                            fontWeight: '800',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          💳 {cardType}
                        </button>
                      ))}
                    </div>

                    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-dark)' }}>
                      <label style={{ fontSize: '13px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Card Number Demo:</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8890"
                        readOnly
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '15px', fontWeight: '700' }}
                      />
                      <button
                        onClick={() => handleSimulatePayment('Debit / Credit Card')}
                        style={{
                          width: '100%',
                          marginTop: '12px',
                          padding: '12px',
                          backgroundColor: 'var(--primary-forest)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '800',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        Pay ₹{selectedAmount} with Saved Card
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Net Banking Tab */}
                {activeTab === 'netbanking' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {netBanks.map((bank, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSimulatePayment(`${bank.name} NetBanking`)}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1.5px solid var(--border-dark)',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-main)',
                          fontWeight: '800',
                          fontSize: '14px',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        🏛️ {bank.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* 4. Insurance Tab */}
                {activeTab === 'insurance' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {insuranceOptions.map((ins, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSimulatePayment(ins.name)}
                        style={{
                          padding: '14px',
                          borderRadius: '14px',
                          border: '1.5px solid var(--green-success)',
                          backgroundColor: 'var(--green-success-bg)',
                          color: 'var(--primary-forest)',
                          fontWeight: '800',
                          fontSize: '15px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: '16px' }}>🏥 {ins.name}</strong>
                          <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.9 }}>{ins.desc}</span>
                        </div>
                        <span style={{ fontSize: '14px', backgroundColor: 'var(--primary-forest)', color: '#FFFFFF', padding: '6px 12px', borderRadius: '10px' }}>
                          Claim Cashless →
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 5. Pay at Hospital Counter Tab */}
                {activeTab === 'counter' && (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontSize: '42px', marginBottom: '8px' }}>💵</div>
                    <h4 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--primary-forest)', marginBottom: '8px' }}>
                      {lang === 'hi' ? 'अस्पताल काउंटर पर 0% एडवांस शुल्क भुगतान' : 'Pay at Hospital Counter (0% Advance Fee)'}
                    </h4>
                    <p style={{ fontSize: '15px', color: 'var(--text-sub)', marginBottom: '16px', lineHeight: '1.4' }}>
                      Book your doctor slot now and pay ₹{selectedAmount} directly at the hospital OPD registration desk.
                    </p>
                    <button
                      onClick={() => handleSimulatePayment('Pay at Hospital Counter')}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: 'var(--gold-accent)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '18px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      🤝 Confirm Booking & Pay at Counter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default PaymentOptionsModal;
