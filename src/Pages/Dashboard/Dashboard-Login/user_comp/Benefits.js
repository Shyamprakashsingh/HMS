import React from 'react';
import './Benefits.css';  // Import the CSS file

const Benefits = () => {
  return (
    <div className="benefits-container">
      <h2 className="benefits-heading">Benefits of Online Doctor Consultation</h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <h3 className="benefit-title">✔ Consult Top Doctors 24x7</h3>
          <p className="benefit-description">
            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
          </p>
        </div>
        <div className="benefit-item">
          <h3 className="benefit-title">✔ Convenient and Easy</h3>
          <p className="benefit-description">
            Start an instant consultation within 2 minutes or do a video consultation at the scheduled time.
          </p>
        </div>
        <div className="benefit-item">
          <h3 className="benefit-title">✔ 100% Safe Consultations</h3>
          <p className="benefit-description">
            Be assured that your online doctor consultation will be fully private and secured.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
