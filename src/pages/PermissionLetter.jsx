import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios with timeout
axios.defaults.timeout = 15000; // 15 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

const PermissionLetter = () => {
  const [rollnumber, setRollnumber] = useState('');
  const [event, setEvent] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [letter, setLetter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: enter rollnumber, 2: select event
  const [apiConnected, setApiConnected] = useState(null); // null: checking, true: connected, false: offline

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Check API connectivity on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const testEndpoint = `${API_URL.replace(/\/$/, '')}/test`;
        const response = await axios.get(testEndpoint, { timeout: 5000 });
        console.log('API is reachable:', response.data);
        setApiConnected(true);
      } catch (err) {
        console.error('API health check failed:', err.message);
        setApiConnected(false);
        setError(`⚠️ Cannot connect to API at ${API_URL}. The server may be down.`);
      }
    };
    
    checkApiHealth();
  }, [API_URL]);

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
      console.log('API URL:', API_URL);
      console.log('Full endpoint:', endpoint);
      console.log('Payload:', { rollnumber });
      
      const response = await axios.post(endpoint, { rollnumber });
      console.log('Response received:', response.data);
      
      if (response.data.success && response.data.events && response.data.events.length > 0) {
        setRegisteredEvents(response.data.events);
        setStep(2);
      } else {
        setError(response.data.message || 'No events found for this roll number.');
      }
    } catch (err) {
      console.error('Registered events error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      console.error('Response status:', err.response?.status);
      console.error('Response data:', err.response?.data);
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Server took too long to respond. Please try again.');
      } else if (err.message === 'Network Error') {
        setError(`Network Error: Cannot connect to ${API_URL}. Check that the API URL is correct and the server is running.`);
      } else if (err.response) {
        // Server responded with an error
        if (err.response.status === 404) {
          setError(err.response.data.message || 'No registrations found for this roll number.');
        } else if (err.response.status === 400) {
          setError(err.response.data.message || 'Invalid roll number format.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data.message || `Server error: ${err.response.status}`);
        }
      } else if (err.request) {
        // Request made but no response
        setError(`Cannot reach server at ${API_URL}. Verify the domain is correct.`);
      } else {
        setError(err.message || 'An error occurred while connecting to the server.');
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
      console.log('Requesting PDF from:', endpoint);
      
      const response = await axios.post(endpoint, { rollnumber, event }, { responseType: 'blob' });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response data size:', response.data.size);
      
      // Check if response is empty
      if (!response.data || response.data.size === 0) {
        setError('Received empty response from server.');
        return;
      }
      
      // Check if response is actually a PDF
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/pdf')) {
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
      } else {
        // Response is not a PDF, try to parse as JSON error
        try {
          const text = await response.data.text();
          const errorJson = JSON.parse(text);
          setError(errorJson.message || 'Unexpected response format.');
        } catch (parseErr) {
          setError(`Unexpected content type: ${contentType}`);
        }
      }
    } catch (err) {
      console.error('Permission letter PDF error:', err);
      console.error('Error code:', err.code);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      console.error('Error message:', err.message);
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Server took too long to respond. Please try again.');
      } else if (err.message === 'Network Error') {
        setError(`Network Error: Cannot connect to ${API_URL}. Check that the API URL is correct and the server is running.`);
      } else if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          setError('No registration found for this roll number and event.');
        } else if (err.response.status === 400) {
          setError('Invalid input. Please check your roll number and event.');
        } else if (err.response.status === 500) {
          setError('Server error generating PDF. Please try again later.');
        } else {
          try {
            // Try to parse error message from blob
            const errorText = await err.response.data.text();
            const errorJson = JSON.parse(errorText);
            setError(errorJson.message || `Server error: ${err.response.status}`);
          } catch {
            setError(`Error: ${err.response.status} ${err.response.statusText}`);
          }
        }
      } else if (err.request) {
        // Request made but no response
        setError(`Cannot reach server at ${API_URL}. Verify the domain is correct.`);
      } else {
        setError('Error: ' + (err.message || 'Unknown error'));
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
      
      {/* API Status Indicator */}
      {apiConnected === false && (
        <div style={{
          background: '#ffebee',
          border: '1px solid #e53935',
          borderRadius: 6,
          padding: 12,
          marginBottom: 16,
          textAlign: 'center',
          color: '#b71c1c'
        }}>
          <strong>⚠️ API Offline</strong>
          <p style={{ fontSize: 12, margin: '4px 0 0 0' }}>Backend server is not accessible. Please check the API URL or try again later.</p>
        </div>
      )}
      
      {apiConnected === true && (
        <div style={{
          background: '#e8f5e9',
          border: '1px solid #4caf50',
          borderRadius: 6,
          padding: 10,
          marginBottom: 16,
          textAlign: 'center',
          color: '#2e7d32',
          fontSize: 12
        }}>
          ✅ API Connected
        </div>
      )}
      
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
