import React from 'react';
import backgroundImage from '@/assets/vethomepage.jpg';

const HomePage = () => {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', padding: '20px' }}>
      <div style={{ color: 'black', fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
        <h1>AnimalClinicPro: The most advanced solution for your clinic!</h1>
        <p> Meet the Veterinary Tracking System designed to suit the needs of your clinic. 
            Our system, which is a fast, easy and powerful veterinary software, allows you 
            to manage your clinical processes from start to finish.</p>
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px' }}>
        <h2>Application Features</h2>
          <li>Appointment Management</li>
          <li>Patient Records</li>
          <li>Vacine and Recovery Reminders</li>
          <li>Purchase History</li>
          <li>Mobile Application</li>
        
      </div>

      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Contact Info</h2>
        <p>Address: 1234 Street, City, Country</p>
        <p>Phone: 123-456-7890</p>
        <p>E-mail: info@example.com</p>
      </div>

      <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px', marginRight: '20px', marginBottom: '20px' }}>
        <p style={{ textAlign: 'right' }}>
          <a href="/privacy-policy" style={{ color: '#6c9286', textDecoration: 'underline' }}>Privacy Policy</a>
        </p>
        </div>
    </div>
  );
};

export default HomePage;


