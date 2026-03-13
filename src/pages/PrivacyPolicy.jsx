import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../index.css'

const PrivacyPolicy = () => {
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
        <h2>Privacy Policy</h2>
      </section>

      <section className="policy-section" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="policy-content">
          <h3>1. Introduction</h3>
          <p>
            Welcome to ECLECTICA 2K26 Registration Portal. We are committed to protecting your privacy and ensuring 
            transparency in how we collect, use, and process your personal data. This Privacy Policy explains our practices 
            and your rights regarding your personal information.
          </p>

          <h3>2. Information We Collect</h3>
          <p>
            We collect the following personal information during registration:<br/>
            • Full Name<br/>
            • Email Address<br/>
            • College/University Name<br/>
            • Roll Number/Registration ID<br/>
            • Contact Number & WhatsApp Number<br/>
            • Year of Study<br/>
            • Department<br/>
            • Event Selection<br/>
            • Payment Information (processed securely through Razorpay)
          </p>

          <h3>3. How We Use Your Information</h3>
          <p>
            Your information is used for:<br/>
            • Event registration and confirmation<br/>
            • Sending registration confirmations and event updates via email<br/>
            • Generating permission letters and participation certificates<br/>
            • Communication regarding event schedules and results<br/>
            • Statistical analysis and event management<br/>
            • Emergency contact in case of incidents during the event
          </p>

          <h3>4. Data Security</h3>
          <p>
            • All personal data is stored securely on encrypted servers.<br/>
            • Payment information is never stored on our servers; Razorpay handles all payment processing.<br/>
            • We implement industry-standard security measures to protect against unauthorized access.<br/>
            • Our backend API uses CORS restrictions and JWT authentication for data protection.
          </p>

          <h3>5. Sharing of Information</h3>
          <p>
            • We do NOT share your personal information with third parties without consent.<br/>
            • Payment information is handled exclusively by Razorpay Payment Gateway.<br/>
            • Your data may be shared with department coordinators for event management purposes only.<br/>
            • In case of emergency, contact information may be used to reach you.
          </p>

          <h3>6. Third-Party Services</h3>
          <p>
            Our platform uses the following third-party services:<br/>
            • <strong>Razorpay</strong>: Payment gateway (See their privacy policy at razorpay.com)<br/>
            • <strong>SendGrid</strong>: Email service provider<br/>
            • <strong>Cloudinary</strong>: Media storage service<br/>
            • <strong>Railway & Netlify</strong>: Hosting providers<br/>
            Each service maintains its own privacy policy. Please review them if needed.
          </p>

          <h3>7. Cookies & Tracking</h3>
          <p>
            • We use session storage to maintain login states and form data.<br/>
            • We do NOT use third-party tracking cookies or analytics for personal identification.<br/>
            • You can control cookies through your browser settings.
          </p>

          <h3>8. Your Rights</h3>
          <p>
            You have the right to:<br/>
            • Access your personal information<br/>
            • Correct inaccurate data<br/>
            • Request deletion of your data after the event period (subject to legal requirements)<br/>
            • Opt-out of promotional communications at any time
          </p>

          <h3>9. Data Retention</h3>
          <p>
            • Participant data will be retained for 2 years following the event for record-keeping and verification purposes.<br/>
            • Payment records are maintained as per financial compliance requirements.<br/>
            • You may request data deletion at any time by contacting us.
          </p>

          <h3>10. Contact Us</h3>
          <p>
            If you have concerns or questions about this Privacy Policy, please contact us at:<br/>
            📧 Email: eclectica2k26@gmail.com<br/>
            📱 Phone: +91 8125035960<br/>
            📍 Address: Department of ECE, MITS Deemed to be University, Madanapalle
          </p>

          <h3>11. Policy Updates</h3>
          <p>
            We may update this Privacy Policy from time to time. We recommend reviewing this page periodically to stay 
            informed about how we protect your information.
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

export default PrivacyPolicy
