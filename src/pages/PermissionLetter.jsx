import React, { useState } from 'react';
import axios from 'axios';

const PermissionLetter = () => {
  const [rollnumber, setRollnumber] = useState('');
  const [event, setEvent] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [letter, setLetter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: enter rollnumber, 2: select event

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleRollnumberSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLetter(null);
    setRegisteredEvents([]);
    if (!rollnumber.trim()) {
      setError('Please enter your roll number.');
      return;
    }
    setLoading(true);
    try {
      const endpoint = `${API_URL.replace(/\/$/, '')}/api/registered-events`;
      const response = await axios.post(endpoint, { rollnumber });
      if (response.data.success && response.data.events && response.data.events.length > 0) {
        setRegisteredEvents(response.data.events);
        setStep(2);
      } else {
        setError(response.data.message || 'No events found for this roll number.');
      }
    } catch (err) {
      console.error('Registered events error:', err);
      console.error('Response:', err.response?.data);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLetter(null);
    if (!event.trim()) {
      setError('Please select an event.');
      return;
    }
    setPdfLoading(true);
    try {
      const endpoint = `${API_URL.replace(/\/$/, '')}/api/permission-letter-pdf`;
      const response = await axios.post(endpoint, { rollnumber, event }, { responseType: 'blob' });
      
      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `permission_letter_${rollnumber}_${event.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setLetter('PDF downloaded successfully!');
    } catch (err) {
      console.error('Permission letter PDF error:', err);
      console.error('Response:', err.response?.data);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to generate permission letter PDF.');
      }
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="permission-letter-page" style={{
      maxWidth: 400,
      margin: '40px auto',
      padding: 24,
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      fontFamily: 'inherit',
      minHeight: 350
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Get Permission Letter</h2>
      {step === 1 && (
        <form onSubmit={handleRollnumberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor="rollnumber" style={{ fontWeight: 500 }}>Roll Number</label>
          <input
            id="rollnumber"
            type="text"
            placeholder="Enter your roll number"
            value={rollnumber}
            onChange={(e) => setRollnumber(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              borderRadius: 6,
              background: loading ? '#ccc' : '#007bff',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 8
            }}
          >
            {loading ? 'Checking...' : 'Next'}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handlePermissionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label htmlFor="event" style={{ fontWeight: 500 }}>Select Registered Event</label>
          <select
            id="event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
          >
            <option value="">-- Select Event --</option>
            {registeredEvents.map((ev, idx) => (
              <option key={idx} value={ev}>{ev}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={pdfLoading}
            style={{
              padding: 12,
              borderRadius: 6,
              background: pdfLoading ? '#ccc' : '#007bff',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              cursor: pdfLoading ? 'not-allowed' : 'pointer',
              marginTop: 8
            }}
          >
            {pdfLoading ? 'Generating PDF...' : 'Download Permission Letter (PDF)'}
          </button>
          <button
            type="button"
            onClick={() => { setStep(1); setEvent(''); setLetter(null); setError(''); }}
            style={{
              padding: 8,
              borderRadius: 6,
              background: '#eee',
              color: '#333',
              fontWeight: 500,
              fontSize: 14,
              border: 'none',
              cursor: 'pointer',
              marginTop: 4
            }}
          >
            Back
          </button>
        </form>
      )}
      {error && (
        <div style={{
          color: '#b00020',
          background: '#ffeaea',
          borderRadius: 6,
          padding: '10px 14px',
          marginTop: 18,
          textAlign: 'center',
          fontWeight: 500
        }}>{error}</div>
      )}
      {letter && (
        <div className="letter-box" style={{
          marginTop: 24,
          background: '#e8f5e9',
          borderRadius: 8,
          padding: 18,
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          textAlign: 'center'
        }}>
          <h3 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: 12 }}>Success!</h3>
          <p style={{ color: '#2e7d32', fontWeight: 500 }}>{letter}</p>
          <p style={{ fontSize: 12, color: '#666', marginTop: 12 }}>Your permission letter PDF has been generated with a QR code for verification.</p>
        </div>
      )}
    </div>
  );
};

export default PermissionLetter;
