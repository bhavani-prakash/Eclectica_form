import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const EventSelection = () => {
  const navigate = useNavigate()

  return (
    <div>
      <section className="hero">
        <h1 className="fest-name">
          <span className="big-letter">E</span>CLECTIC
          <span className="big-letter">A</span>
        </h1>
        <div className="year">2k26</div>
        <div>
          <h2>Welcome to ECLECTICA 2K26</h2>
          <p>Choose an event category and register for an amazing experience! 🎉</p>
        </div>
        <p className="note-form">If you face any issues during registration, please contact us Phone : +91 8125035960</p>
      </section>

      <section className="events-section">
        <div className="events-container">
          <div className="event-card category-card">
            <h3>🔧 Technical Events</h3>
            <p className="event-description">Showcase your technical skills in competitions like Paper Presentation, Tech Quiz, Project Expo, and Circuit Debugging.</p>
            <button 
              className="register-btn"
              onClick={() => navigate('/tech')}
            >
              View Technical Events
            </button>
          </div>

          <div className="event-card category-card">
            <h3>🎨 Non-Technical Events</h3>
            <p className="event-description">Participate in Photography, Gaming, Treasure Hunt, Debate and more exciting non-technical events.</p>
            <button 
              className="register-btn"
              onClick={() => navigate('/nontech')}
            >
              View Non-Technical Events
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventSelection
