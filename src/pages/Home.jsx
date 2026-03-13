import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
// import phonepeQR from '../assets/phonepe-qr.png';

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
  const [acceptedTC, setAcceptedTC] = useState(false);

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

    // Ensure Razorpay script is loaded
    if (!window.Razorpay) {
      console.warn('Razorpay script not loaded, loading now...');
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [searchParams]);

  const API_URL = 'https://eclecticabackend-production-ffd4.up.railway.app' || 'http://localhost:5000';

  // Check if event requires manual payment
  const isManualPaymentEvent = (eventName) => {
    return eventName === 'Free Fire' || eventName === 'BGMI';
  };

  // UPI ID for manual payment (You can change this)
  const UPI_ID = 'your-upi-id@bank'; // Update with actual UPI ID
  const upiString = `upi://pay?pa=${UPI_ID}&pn=ECLECTICA&am=${paymentAmount}&tn=RegFee`;

  // Function to create Razorpay order
  const createOrder = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_URL.replace(/\/$/, '')}/api/create-order`;
      
      // Log request details
      console.log('🔵 Creating order with:', { email, name, rollnumber, event, endpoint });
      
      const response = await axios.post(endpoint, {
        email,
        name,
        rollnumber,
        event
      });

      console.log('✅ Order created successfully:', response.data);

      // Set payment amount from backend response
      if (response.data.eventFee) {
        setPaymentAmount(response.data.eventFee);
      }

      return response.data.orderId;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || error.response?.data?.details || error.message || 'Failed to create order. Please try again.';
      alert(`Error: ${errorMessage}`);
      setLoading(false);
      return null;
    }
  };

  // Function to handle Razorpay payment
  const handlePayment = async (e) => {
    e.preventDefault();

    // Check if Razorpay script is loaded
    if (!window.Razorpay) {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      console.error('Razorpay script not loaded');
      return;
    }

    // Validate form
    if (!name || !email || !college || !rollnumber || !contactnumber || 
        !whatsappnumber || !year || !department || !event) {
      alert('Please fill in all fields');
      return;
    }

    // Create order
    const orderId = await createOrder();
    if (!orderId) return;

    // Prepare Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SPTEm2Pm2fOJ1l',
      amount: paymentAmount * 100,
      currency: 'INR',
      name: 'ECLECTICA 2K26',
      description: event,
      order_id: orderId,
      handler: async (response) => {
        try {
          setLoading(true);
          // Verify payment on backend
          const verifyEndpoint = `${API_URL.replace(/\/$/, '')}/api/verify-payment`;
          
          const verifyResponse = await axios.post(verifyEndpoint, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name,
            email,
            college,
            rollnumber,
            contactnumber,
            whatsappnumber,
            year,
            department,
            event
          });

          if (verifyResponse.data.success) {
            console.log('✅ Payment verified successfully');
            // alert('Registration successful! Confirmation email sent.');
            // Clear form
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
            setLoading(false);
            navigate('/greeting');
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function() {
          // User closed the payment modal without completing
          console.log('❌ Payment modal closed by user');
          setLoading(false);
          alert('Payment cancelled. Your registration is incomplete.');
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: contactnumber
      },
      theme: {
        color: '#3399cc'
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay initialization error:', error);
      alert('Failed to open payment gateway. Please try again.');
      setLoading(false);
    }
  };

  // Handle manual payment submission (for Free Fire & BGMI)
  const handleManualPayment = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!name || !email || !college || !rollnumber || !contactnumber || 
        !whatsappnumber || !year || !department || !event) {
      alert('Please fill in all fields');
      return;
    }

    if (!acceptedTC) {
      alert('Please accept Terms & Conditions');
      return;
    }

    if (!screenshotFile) {
      alert('Please upload payment screenshot');
      return;
    }

    try {
      setLoading(true);

      // For manual payment, we store the registration data without payment verification
      // Admin will verify the screenshot later
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
      formData.append('paymentStatus', 'pending');

      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert('Registration submitted! Payment verification pending. You will receive confirmation email once verified.');
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
        setAcceptedTC(false);
        setLoading(false);
        navigate('/greeting');
      }
    } catch (error) {
      console.error('Manual payment error:', error);
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
        <form className="registration-form" onSubmit={isManualPaymentEvent(event) ? handleManualPayment : handlePayment}>
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
            {isManualPaymentEvent(event) ? (
              <>
                <p style={{ marginTop: '15px', color: '#e8c52b', fontWeight: 'bold' }}>
                  📱 Pay via UPI & Upload Screenshot
                </p>
                <p style={{ fontSize: '12px', marginTop: '10px' }}>
                  Scan the QR code or use UPI ID below to make payment
                </p>
                
                {/* QR Code Display - You can replace this with actual QR image */}
                <div style={{
                  background: '#fff',
                  padding: '15px',
                  borderRadius: '8px',
                  marginTop: '15px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    background: '#ddd',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    color: '#333'
                  }}>
                    {/* Replace with actual QR code image */}
                    <span>QR Code Here</span>
                  </div>
                  <p style={{ marginTop: '10px', color: '#333', fontWeight: 'bold' }}>
                    UPI: {UPI_ID}
                  </p>
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
              </>
            ) : (
              <>
                <p>Click the button below to complete payment via Razorpay</p>
              </>
            )}
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="tc-checkbox-container">
            <input
              type="checkbox"
              id="tc-check"
              checked={acceptedTC}
              onChange={(e) => setAcceptedTC(e.target.checked)}
              required
            />
            <label htmlFor="tc-check">
              I have read and agree to the{' '}
              <a href="/terms-and-conditions" target="_blank" rel="noreferrer">
                Terms & Conditions
              </a>
              ,{' '}
              <a href="/privacy-policy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              , and{' '}
              <a href="/refund-policy" target="_blank" rel="noreferrer">
                Refund Policy
              </a>
            </label>
          </div>

          <button type="submit" disabled={loading || !acceptedTC}>
            {loading ? "Processing..." : isManualPaymentEvent(event) ? `Submit Registration (₹${paymentAmount})` : `Pay ₹${paymentAmount} & Register`}
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
