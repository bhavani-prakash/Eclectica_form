import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import Footer from '../components/Footer'

const Tech = () => {
  const navigate = useNavigate()

  const technicalEvents = [
    { name: 'Tech Quiz', fee: 70 },
    { name: 'Bug Hunters', fee: 70 },
    { name: 'Circuit Detective', fee: 70 },
    { name: 'Paper Presentation', fee: 70 },
    { name: 'Poster Presentation', fee: 70 }
    
  ];

  const handleRegister = (eventName, eventFee) => {
    navigate(`/register?event=${encodeURIComponent(eventName)}&type=technical&fee=${eventFee}`);
  };

  return (
    <div>
        <div>
        <button 
          className="back-btn"
          onClick={() => window.location.href = 'https://eclectica2k26.netlify.app/'}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '10px 20px',
            background: '#e8c52b',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 14,
            color: '#000',
            zIndex: 10
          }}
        >
          ← Back
        </button>
      <section className="hero">
        <h1 className="fest-name">
          <span className="big-letter">E</span>CLECTIC
          <span className="big-letter">A</span>
        </h1>
        <div className="year">2k26</div>
        <div>
          <h2>Technical Events</h2>
          <p>Register for exciting technical events at Eclectic 2k26! 🚀</p>
        </div>
        <p className="note-form">If you face any issues during registration, please contact us Phone : +91 8125035960</p>
      </section>

      <section className="events-section">
        <div className="events-container">
          {technicalEvents.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.name}</h3>
              <p className="event-fee">₹{event.fee}</p>
              <button 
                className="register-btn"
                onClick={() => handleRegister(event.name, event.fee)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </section>
      </div>
      <Footer />
    </div>
  )
}

export default Tech
