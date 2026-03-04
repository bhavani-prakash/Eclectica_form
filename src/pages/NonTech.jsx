import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const NonTech = () => {
  const navigate = useNavigate()

  const nonTechEvents = [
    { name: 'Photography', fee: 80 },
    { name: 'Gaming', fee: 100 },
    { name: 'Treasure Hunt', fee: 90 },
    { name: 'Debate', fee: 70 }
  ];

  const handleRegister = (eventName, eventFee) => {
    navigate(`/register?event=${encodeURIComponent(eventName)}&type=non-technical&fee=${eventFee}`);
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
          <h2>Non-Technical Events</h2>
          <p>Register for amazing non-technical events at Eclectic 2k26! 🎉</p>
        </div>
        <p className="note-form">If you face any issues during registration, please contact us Phone : +91 8125035960</p>
      </section>

      <section className="events-section">
        <div className="events-container">
          {nonTechEvents.map((event, index) => (
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
  )
}

export default NonTech
