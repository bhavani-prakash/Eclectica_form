import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../index.css'

const TermsAndConditions = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
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
        <h2>Terms & Conditions</h2>
      </section>

      <section className="policy-section" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="policy-content">
          <h3>1. General Terms</h3>
          <p>
            By registering for ECLECTICA 2K26, you agree to abide by all the rules and regulations set by the 
            Department of Electronics and Communication Engineering, MITS Deemed to be University. The event is organized 
            solely for educational and entertainment purposes.
          </p>

          <h3>2. Registration & Payment</h3>
          <p>
            • Event registration is open to all students of recognized educational institutions.<br/>
            • Payment must be completed to confirm your registration.<br/>
            • Only successful payments will be considered as valid registrations.<br/>
            • For gaming events (Free Fire, BGMI): Payment via UPI with screenshot upload is required.<br/>
            • For technical events: Online payment via Razorpay is required.<br/>
            • All refunds are subject to review and must be requested before the event date.
          </p>

          <h3>3. Code of Conduct</h3>
          <p>
            • Participants must maintain discipline and respect the organizers' decisions at all times.<br/>
            • Any form of harassment, misconduct, or disruptive behavior will result in immediate disqualification.<br/>
            • Participants must follow all COVID-19 or health safety guidelines if applicable.<br/>
            • Use of unfair means or cheating in competitions will lead to disqualification.
          </p>

          <h3>4. Intellectual Property</h3>
          <p>
            • All materials, content, and event management systems are proprietary to MITS ECE Department.<br/>
            • Participants grant ECLECTICA 2K26 the right to use photos/videos of the event for promotional purposes.
          </p>

          <h3>5. Liability & Disclaimer</h3>
          <p>
            ECLECTICA 2K26 and MITS shall not be responsible for:<br/>
            • Any loss, injury, or damage during the event.<br/>
            • Any technical issues or server failures during online registrations or events.<br/>
            • Any third-party claims or disputes arising from participant participation.<br/>
            • Loss of personal belongings or valuables during the event.
          </p>

          <h3>6. Age & Eligibility</h3>
          <p>
            • Participants must be at least 18 years old or have parental consent if under 18.<br/>
            • Students from any college or university are eligible to participate.<br/>
            • Professional gamers are not eligible to participate in gaming events.
          </p>

          <h3>7. Modifications</h3>
          <p>
            ECLECTICA 2K26 reserves the right to modify, postpone, or cancel the event without prior notice due to 
            unforeseen circumstances. Any changes will be communicated through official channels.
          </p>

          <h3>8. Contact & Support</h3>
          <p>
            For any queries or issues, contact us at:<br/>
            📧 Email: eclectica2k26@gmail.com<br/>
            📱 Phone: +91 8125035960<br/>
            📍 Location: MITS Deemed to be University, Madanapalle
          </p>

          <h3>9. Acceptance</h3>
          <p>
            By clicking "I Accept" during registration, you acknowledge that you have read, understood, and agreed to 
            these Terms & Conditions.
          </p>

          <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#e8c52b' }}>
            Last Updated: March 2026<br/>
            © 2026 Department of ECE, MITS. All rights reserved.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TermsAndConditions
