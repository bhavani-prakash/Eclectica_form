import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import qrImage from '../assets/qr.jpeg';

import '../index.css'

const Home = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [college, setCollege] = useState('')
  const [rollnumber, setRollnumber] = useState('')
  const [contactnumber, setContactnumber] = useState('')
  const [whatsappnumber, setWhatsappnumber] = useState('')
  const [year, setYear] = useState('')
  const [department, setDepartment] = useState('')
  const [eventType, setEventType] = useState('')
  const [event, setEvent] = useState('')
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(100);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');

  const technicalEvents = [
    'Poster Presentation',
    'Paper Presentation',
    'Tech Quiz',
    'Bug Hunters',
    'Circuit Detective'
  ];

  const nonTechEvents = [
    'Free Fire',
    'BGMI',
    'cineQuest',
    'Balloon Spirit',
    'Rope Rumble',
    'Ball Heist'
  ];

  // Event fee mapping
  const eventFees = {
    'Poster Presentation': 70,
    'Paper Presentation': 70,
    'Tech Quiz': 70,
    'Bug Hunters': 70,
    'Circuit Detective': 70,
    'Free Fire': 200,
    'BGMI': 200,
    'cineQuest': 50,
    'Balloon Spirit': 50,
    'Rope Rumble': 50,
    'Ball Heist': 50
  };

  // Handle URL parameters on component mount
  useEffect(() => {
    const eventParam = searchParams.get('event');
    const typeParam = searchParams.get('type');
    
    if (eventParam && typeParam) {
      setEvent(eventParam);
      setEventType(typeParam);
      setPaymentAmount(eventFees[eventParam] || 70);
    }
  }, [searchParams]);

  const API_URL = 'https://eclecticabackend-production-ffd4.up.railway.app' || 'http://localhost:5000';

  // Handle payment submission (for all events - manual payment with screenshot)
  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!name || !email || !college || !rollnumber || !contactnumber || 
        !whatsappnumber || !year || !department || !event) {
      alert('Please fill in all fields');
      return;
    }

    if (!screenshotFile) {
      alert('Please upload payment screenshot');
      return;
    }

    if (!utrNumber || utrNumber.trim() === '') {
      alert('Please enter UTR number');
      console.warn('UTR validation failed. UTR value:', utrNumber);
      return;
    }

    try {
      setLoading(true);

      // Store registration with screenshot
      const endpoint = `${API_URL.replace(/\/$/, '')}/api/manual-registration`;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('college', college);
      formData.append('rollnumber', rollnumber);
      formData.append('contactnumber', contactnumber);
      formData.append('whatsappnumber', whatsappnumber);
      formData.append('year', year);
      formData.append('department', department);
      formData.append('event', event);
      formData.append('screenshot', screenshotFile);
      formData.append('paymentStatus', 'success');
      formData.append('paymentAmount', paymentAmount);
      formData.append('utrNumber', utrNumber);

      console.log('📤 Sending registration with UTR:', utrNumber);

      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert('Registration Successful! 🎉\n\nYour registration has been submitted successfully. Thank you for registering!');
        setName('');
        setEmail('');
        setCollege('');
        setRollnumber('');
        setContactnumber('');
        setWhatsappnumber('');
        setYear('');
        setDepartment('');
        setEvent('');
        setEventType('');
        setScreenshotFile(null);
        setUtrNumber('');
        setLoading(false);
        navigate('/greeting');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error submitting registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1 className="fest-name">
          <span className="big-letter">E</span>CLECTIC
          <span className="big-letter">A</span>
        </h1>
        <div className="year">2k26</div>
        <div>
          <h2>Registration Form</h2>
          <p>Fill in your details and get ready for an unforgettable experience at Eclectica 2k26! 🚀</p>
        </div>

        {/* Display selected event prominently */}
        {event && (
          <div className="selected-event-display">
            <h3 className="event-selection">
              📋 Selected Event: <span className="event-name">{event}</span>
            </h3>
            <p className="event-registration-fee">
              Registration Fee: <span className="fee-amount">₹{paymentAmount}</span>
            </p>
          </div>
        )}

        <p className="note-form"> If you face any issues during registration, please contact us Phone : +91 8125035960</p>
      </section>

      <section className="form">
        <form className="registration-form" onSubmit={handlePayment}>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label> College Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>College Name</label>
          <input
            type="text"
            id="college"
            placeholder="College Name"
            required
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />

          <label>Roll Number</label>
          <input
            type="text"
            id="rollnumber"
            placeholder="Roll Number"
            required
            value={rollnumber}
            onChange={(e) => setRollnumber(e.target.value)}
          />

          <label>Contact Number</label>
          <input
            type="text"
            id="contactnumber"
            placeholder="Contact Number"
            required
            value={contactnumber}
            onChange={(e) => setContactnumber(e.target.value)}
          />

          <label>WhatsApp Number</label>
          <input
            type="text"
            id="whatsappnumber"
            placeholder="WhatsApp Number"
            required
            value={whatsappnumber}
            onChange={(e) => setWhatsappnumber(e.target.value)}
          />

          <label>Year</label>

          <select
            required
            type="text"
            placeholder="Year"
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <label>Department</label>
          <input
            type="text"
            id="department"
            placeholder="Department"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <label>Event Type</label>
          <select
            required
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              setEvent(''); // reset event when type changes
            }}
            disabled={event ? true : false}
            style={event ? { backgroundColor: '#e0e0e0', cursor: 'not-allowed' } : {}}
          >
            <option value="">Select Event Type</option>
            <option value="technical">Technical</option>
            <option value="non-technical">Non-Technical</option>
          </select>

          {eventType && (
            <>
              <label>Event</label>
              <select
                required
                value={event}
                onChange={(e) => {
                  setEvent(e.target.value);
                  setPaymentAmount(eventFees[e.target.value] || 100);
                }}
              >
                <option value="">Select Event</option>

                {(eventType === 'technical'
                  ? technicalEvents
                  : nonTechEvents
                ).map((ev, index) => (
                  <option key={index} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="payment-section">
            <h3>Payment</h3>
            <p>Registration Fee: ₹{paymentAmount}</p>
            <p style={{ marginTop: '15px', color: '#e8c52b', fontWeight: 'bold' }}>
              📱 Pay via UPI/Bank Transfer & Upload Screenshot
            </p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
              Make payment and upload proof of payment to complete registration
            </p>

            {/* QR Code Display */}
            <div style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '8px',
              marginTop: '15px',
              textAlign: 'center'
            }}>
             
              <img 
                src={qrImage} 
                alt="PhonePe QR Code" 
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Munaga Sreeram</p>
            </div>
     
            <label style={{ marginTop: '20px' }}>Upload Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid #e8c52b',
                width: '100%'
              }}
            />

            <label style={{ marginTop: '15px' }}>UTR Number <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="Enter UTR/Reference Number"
              required
              value={utrNumber}
              onChange={(e) => {
                console.log('UTR input changed:', e.target.value);
                setUtrNumber(e.target.value);
              }}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid #e8c52b',
                width: '100%',
                fontSize: '14px',
                backgroundColor: utrNumber ? '#f0f0f0' : '#fff',
                color: '#0f0e0e'
              }}
            />
            <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>Current value: {utrNumber || '(empty)'}</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : `Submit Registration (₹${paymentAmount})`}
          </button>
          
          <p>{loading ? "Please complete the payment to register. Do not refresh the page." : " "}</p>

          <div className="form-footer">
            {/* <button 
              type="button" 
              className="back-btn"
              onClick={() => navigate(event ? '/' : '/')}
            >
              ← Back to Events
            </button> */}
          </div>
        </form>
      </section>
    </div>
  )
}

export default Home
