import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../index.css'

const FAQ = () => {
  const navigate = useNavigate()
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "How do I register for an event?",
      answer: "Click on the event category (Technical or Non-Technical), select your event, and fill in the registration form with your details. Complete the payment, accept the terms & conditions, and you're registered!"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept two payment methods: (1) Razorpay online payment for technical events, and (2) Manual UPI payment with screenshot upload for gaming events (Free Fire & BGMI)."
    },
    {
      id: 3,
      question: "How much is the registration fee?",
      answer: "Fees vary by event: Technical events (Tech Quiz, Bug Hunters, etc.) - ₹70 each, Gaming events (Free Fire, BGMI) - ₹200 each, Entertainment events (cineQuest, Balloon Spirit, etc.) - ₹50 each."
    },
    {
      id: 4,
      question: "Can I get a refund?",
      answer: "Yes! We have a comprehensive refund policy. Full refunds are available if requested 7+ days before the event, 50% refund for 3-6 days before. Check our Refund Policy page for complete details and the refund process."
    },
    {
      id: 5,
      question: "How do I download my permission letter?",
      answer: "After successful registration, visit the Permission Letter section (available from the home page), enter your roll number and event name, and download your PDF permission letter instantly."
    },
    {
      id: 6,
      question: "What happens after I register?",
      answer: "You'll receive a confirmation email. For Razorpay payments, registration is immediate. For manual UPI payments, you'll receive confirmation once your screenshot is verified by our team."
    },
    {
      id: 7,
      question: "Can I register for multiple events?",
      answer: "Yes! You can register for multiple events. Each event requires a separate registration and payment. You'll receive separate confirmation emails and can download individual permission letters."
    },
    {
      id: 8,
      question: "What if I face payment issues?",
      answer: "For Razorpay issues, check your internet connection and try again. For UPI payments, verify your UPI ID and ensure sufficient balance. Contact support at eclectica2k26@gmail.com or +91 8125035960 for help."
    },
    {
      id: 9,
      question: "Is my personal information safe?",
      answer: "Yes! We follow strict data protection protocols. Your information is encrypted, stored securely, and used only for registration and event management. See our Privacy Policy for complete details."
    },
    {
      id: 10,
      question: "What are the system requirements?",
      answer: "You just need a working internet connection and a modern web browser (Chrome, Firefox, Safari, Edge). For UPI payments, ensure you have the UPI app installed on your phone."
    },
    {
      id: 11,
      question: "How can I track my payment status?",
      answer: "Check your confirmation email for payment details. For Razorpay payments, status updates are immediate. For manual UPI payments, you'll be notified via email once your screenshot is verified."
    },
    {
      id: 12,
      question: "Who do I contact for support?",
      answer: "Contact us via email at eclectica2k26@gmail.com or call +91 8125035960. We respond within 24 hours on business days. Office hours: Monday-Friday, 10:00 AM - 5:00 PM IST."
    }
  ]

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

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
        <h2>Frequently Asked Questions</h2>
      </section>

      <section className="policy-section" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="faq-container">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${expandedFAQ === faq.id ? 'expanded' : ''}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">{expandedFAQ === faq.id ? '−' : '+'}</span>
              </button>
              {expandedFAQ === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '40px',
          padding: '25px',
          background: 'rgba(232, 197, 43, 0.1)',
          border: '2px solid #e8c52b',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#e8c52b', marginBottom: '15px' }}>Need More Help?</h3>
          <p style={{ marginBottom: '15px' }}>Check out our detailed policies:</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/terms-and-conditions" style={{
              padding: '10px 20px',
              background: '#e8c52b',
              color: '#000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Terms & Conditions
            </a>
            <a href="/privacy-policy" style={{
              padding: '10px 20px',
              background: '#e8c52b',
              color: '#000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Privacy Policy
            </a>
            <a href="/refund-policy" style={{
              padding: '10px 20px',
              background: '#e8c52b',
              color: '#000',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Refund Policy
            </a>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#ccc' }}>
            📧 Email: eclectica2k26@gmail.com<br/>
            📱 Phone: +91 8125035960
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQ
