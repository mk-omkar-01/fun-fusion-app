import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-text">
        We're here to help with any questions or issues you may have. Please feel free to reach out to us using the information below.
      </p>
      <div className="contact-details">
        <div className="contact-item">
          <h2>General Inquiries</h2>
          <p>Phone: +91 83103 32847</p>
          <p>Email: omkarkokatnoor2006@gmail.com</p>
          <p>Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
          <p>Contact us for general questions about the FunFusion website, services, and more.</p>
        </div>
        <div className="contact-item">
          <h2>Technical Support</h2>
          <p>Phone: +91 901980 23225</p>
          <p>Email: prajwalhajeri2006@gmail.com</p>
          <p>Hours: 24/7</p>
          <p>Reach out to our support team for help with technical issues or troubleshooting.</p>
        </div>
        <div className="contact-item">
          <h2>Feedback and Suggestions</h2>
          <p>Email: yatirajkulkarni2006@gmail.com</p>
          <p>We value your feedback! Send us your suggestions to help us improve our services.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
