
import React ,{useState} from 'react';
import '../components/styles/page.css';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been submitted.");
      setForm({ name: '', email: '', message: '' });
    };
  
    return (
      <div className="info-container">
        <h2 className="info-title">Contact Us</h2>
        <p className="info-text">Have a question, suggestion, or issue? Feel free to reach out to us using the form below.</p>
  
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
      </div>
    );
  }
  
  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
  };
  
  const buttonStyle = {
    backgroundColor: '#1a237e',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  };
  
  export default Contact;