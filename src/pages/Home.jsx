import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import phonepeQR from '../assets/phonepe-qr.png';

import '../index.css'

const Home = () => {
  const navigate = useNavigate()

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
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const [utrnumber, setUtrnumber] = useState('')
  const [loading, setLoading] = useState(false);

  const technicalEvents = [
    'Paper Presentation',
    'Tech Quiz',
    'Project Expo',
    'Circuit Debugging'
  ];

  const nonTechEvents = [
    'Photography',
    'Gaming',
    'Treasure Hunt',
    'Debate'
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("college", college);
    formData.append("rollnumber", rollnumber);
    formData.append("contactnumber", contactnumber);
    formData.append("whatsappnumber", whatsappnumber);
    formData.append("year", year);
    formData.append("department", department);
    formData.append("event", event);
    formData.append("utrnumber", utrnumber);
    formData.append("paymentScreenshot", paymentScreenshot); // 🔥 FILE


    // https://eclecticabackend-production.up.railway.app/api/register
    try {
      setLoading(true);

      await axios.post(
        "https://eclecticabackend-production.up.railway.app/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/greeting");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    } finally {
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
          <p>Fill in your details and get ready for an unforgettable experience at Eclectic 2k26! 🚀</p>
        </div>
        <p className="note-form"> If you face any issues during registration, please contact us Phone : +91 8125035960</p>
      </section>

      <section className="form">
        <form className="registration-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <label> Collage Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="College Email Address  (eg:rollnumber@mits.ac.in) "
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>College Name</label>
          <input
            type="text"
            id="college"
            placeholder="College Name"
            required
            onChange={(e) => setCollege(e.target.value)}
          />

          <label>Roll Number</label>
          <input
            type="text"
            id="rollnumber"
            placeholder="Roll Number"
            required
            onChange={(e) => setRollnumber(e.target.value)}
          />

          <label>Contact Number</label>
          <input
            type="text"
            id="contactnumber"
            placeholder="Contact Number"
            required
            onChange={(e) => setContactnumber(e.target.value)}
          />

          <label>WhatsApp Number</label>
          <input
            type="text"
            id="whatsappnumber"
            placeholder="WhatsApp Number"
            required
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
                onChange={(e) => setEvent(e.target.value)}
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
            <p>Scan the PhonePe QR code to complete the payment</p>

            <img
              // src={phonepeQR}
              alt="PhonePe QR Code"
              className="qr-image"
            />

            <p className="note">
              After payment, enter the <strong>UTR number</strong> below
            </p>
          </div>

          <label>Payment Screenshot</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => {
              const file = e.target.files[0];
              setPaymentScreenshot(file);
            }}
          />

          {paymentScreenshot && (
            <img
              src={URL.createObjectURL(paymentScreenshot)}
              alt="Preview"
              className="preview-image"
            />
          )}


          <label>UTR Number</label>
          <input
            type="text"
            id="utrnumber"
            placeholder="UTR Number"
            required
            onChange={(e) => setUtrnumber(e.target.value)}
          />

          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          
          <p>{loading ? "We are submiting your rigistration so please wait Dont press back ": " "}</p>
        </form>
      </section>
    </div>
  )
}
//  disabled={!screenshotUrl || loading}

export default Home
