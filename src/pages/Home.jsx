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
  const [paymentAmount, setPaymentAmount] = useState(100); // Payment amount in INR

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

    const rzp = new window.Razorpay(options);
    rzp.open();
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

          <label> Collage Email Address</label>
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
            <p>Click the button below to complete payment via Razorpay</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${paymentAmount} & Register`}
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
