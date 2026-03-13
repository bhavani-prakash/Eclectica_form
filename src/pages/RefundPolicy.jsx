import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../index.css'

const RefundPolicy = () => {
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
        <h2>Refund Policy</h2>
      </section>

      <section className="policy-section" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="policy-content">
          <h3>1. Refund Eligibility</h3>
          <p>
            Refund requests for ECLECTICA 2K26 registration fees are considered on a case-by-case basis. 
            To be eligible for a refund, the following conditions must be met:<br/><br/>
            • Refund request must be submitted before the event date.<br/>
            • Valid reason must be provided (illness, emergency, schedule conflict, etc.).<br/>
            • Proof of circumstances (if applicable) may be requested.<br/>
            • Refund amounts vary based on when the request is made.
          </p>

          <h3>2. Refund Timeline</h3>
          <p>
            <strong>Full Refund (100%):</strong><br/>
            • Refund requests received 7 or more days before the event date are eligible for full refund of the registration fee.<br/><br/>
            
            <strong>Partial Refund (50%):</strong><br/>
            • Refund requests received 3-6 days before the event date are eligible for 50% refund.<br/>
            • A processing fee of ₹50 will be deducted.<br/><br/>
            
            <strong>No Refund:</strong><br/>
            • Refund requests received less than 3 days before the event date are not eligible for refund.<br/>
            • Requests after the event date cannot be entertained.
          </p>

          <h3>3. Refund Process</h3>
          <p>
            <strong>For Razorpay Payments (Technical Events):</strong><br/>
            • Submit refund request via email or contact form with your roll number and event name.<br/>
            • Your request will be reviewed within 2 business days.<br/>
            • Upon approval, refund will be initiated to the original payment method.<br/>
            • Refund processing by Razorpay typically takes 5-7 business days.<br/><br/>
            
            <strong>For Manual UPI Payments (Gaming Events - Free Fire, BGMI):</strong><br/>
            • Submit refund request via email with your roll number, event name, and UPI transaction ID.<br/>
            • Screenshots of payment and transaction should be attached.<br/>
            • Your request will be reviewed within 3 business days.<br/>
            • Upon approval, refund will be initiated to the provided UPI ID.<br/>
            • UPI refunds typically complete within 2-3 business days.
          </p>

          <h3>4. Special Circumstances</h3>
          <p>
            The following circumstances may be considered for full refund regardless of timing:<br/><br/>
            • Medical emergency with proper documentation.<br/>
            • Death or serious illness in immediate family.<br/>
            • University-organized events or exams conflicting with the event.<br/>
            • Event cancellation by organizers.<br/>
            • Technical issues with payment processing.<br/><br/>
            
            In such cases, please contact the organizers immediately with proper documentation 
            for special consideration.
          </p>

          <h3>5. Non-Refundable Items</h3>
          <p>
            The following are non-refundable:<br/><br/>
            • Merchandise or certificates already distributed during the event.<br/>
            • Permission letters already generated and issued.<br/>
            • Event materials or resources provided.<br/>
            • Any benefits or prizes won during the event.
          </p>

          <h3>6. Duplicate Payment</h3>
          <p>
            In case of accidental duplicate payment or technical error:<br/><br/>
            • Contact us immediately with transaction IDs and screenshots.<br/>
            • Duplicate payments will be refunded within 2 business days.<br/>
            • No processing fees will be deducted for duplicate payment refunds.<br/>
            • Only one registration per participant will be maintained in our system.
          </p>

          <h3>7. How to Request a Refund</h3>
          <p>
            To request a refund, please contact us with the following information:<br/><br/>
            <strong>Email:</strong> eclectica2k26@gmail.com<br/>
            <strong>Subject:</strong> Refund Request - Your Name - Event Name<br/><br/>
            
            <strong>Required Information:</strong><br/>
            • Full Name<br/>
            • Roll Number<br/>
            • Event Name<br/>
            • Registration Email<br/>
            • Transaction ID (for Razorpay) or UPI Transaction ID (for manual payments)<br/>
            • Reason for Refund Request<br/>
            • Preferred Refund Method<br/><br/>
            
            <strong>Phone Support:</strong><br/>
            📱 +91 8125035960<br/>
            (Available: Monday-Friday, 10:00 AM - 5:00 PM IST)
          </p>

          <h3>8. Refund Status Tracking</h3>
          <p>
            You can track your refund status by:<br/><br/>
            • Checking your email for refund status updates.<br/>
            • Contacting the organizers with your transaction ID.<br/>
            • Checking your bank account or UPI app for credited amount.<br/>
            • The refund may appear as "ECLECTICA 2K26 REFUND" on your bank statement.
          </p>

          <h3>9. Bank/Payment Delays</h3>
          <p>
            In case of delays in receiving refund after approval:<br/><br/>
            • Check your bank account and UPI app transaction history first.<br/>
            • Contact your bank to verify if refund is in processing.<br/>
            • Provide bank details or UPI ID again for verification.<br/>
            • We will escalate to payment gateway support if needed.<br/>
            • Maximum delay: 10 business days from refund initiate date.
          </p>

          <h3>10. Cancellations by Organizers</h3>
          <p>
            If ECLECTICA 2K26 is cancelled or an event is postponed:<br/><br/>
            • Full refund will be issued to all registered participants automatically.<br/>
            • Refund will be processed within 7 business days of cancellation.<br/>
            • An email notification will be sent to all registrants immediately.<br/>
            • No further action is required from participants.
          </p>

          <h3>11. Disputes & Appeals</h3>
          <p>
            If you disagree with our refund decision:<br/><br/>
            • Submit a formal appeal with additional documentation within 5 days.<br/>
            • Appeals will be reviewed by the event organizing committee.<br/>
            • A decision will be communicated within 3 business days.<br/>
            • The decision of the organizing committee will be final.
          </p>

          <h3>12. Contact Information</h3>
          <p>
            For any refund-related queries, contact:<br/><br/>
            📧 Email: eclectica2k26@gmail.com<br/>
            📱 Phone: +91 8125035960<br/>
            📍 Address: Department of ECE, MITS Deemed to be University, Madanapalle<br/>
            ⏰ Response Time: Within 24 hours (business days)
          </p>

          <h3>13. Policy Updates</h3>
          <p>
            ECLECTICA 2K26 reserves the right to modify this Refund Policy at any time. 
            Any changes will be communicated through official channels. Participants are advised 
            to review this policy periodically.
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

export default RefundPolicy
