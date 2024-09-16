import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about-us">
          <h3>HealthNet</h3>
          <p>
            At HealthNet, we're developing a web-based application that enables
            hospitals to efficiently manage their dispensation, inventory, and
            OPD queue systems. Our platform is designed to streamline hospital
            operations, providing a seamless solution for healthcare management
            and enhancing the patient care experience.
          </p>
        </div>

        <div className="footer-section contact-us">
          <h4>Contact Us</h4>
          <p>
            Email: <a href="mailto:ankitrout2005@gmail.com">HealthNet.com</a>
          </p>
          <p>Phone: +91865476351</p>
          <p>Address: Bhubaneswar, Odisha</p>
        </div>

        <div className="footer-section follow-us">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 HealthNet. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |{" "}
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

const Benefits = () => {
  return (
    <div className="benefits-container">
      <h2 className="benefits-heading">
        Benefits of Online Doctor Consultation
      </h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <h3 className="benefit-title">✔ Consult Top Doctors 24x7</h3>
          <p className="benefit-description">
            Connect instantly with a 24x7 specialist or choose to video visit a
            particular doctor.
          </p>
        </div>
        <div className="benefit-item">
          <h3 className="benefit-title">✔ Convenient and Easy</h3>
          <p className="benefit-description">
            Start an instant consultation within 2 minutes or do a video
            consultation at the scheduled time.
          </p>
        </div>
        <div className="benefit-item">
          <h3 className="benefit-title">✔ 100% Safe Consultations</h3>
          <p className="benefit-description">
            Be assured that your online doctor consultation will be fully
            private and secured.
          </p>
        </div>
      </div>
    </div>
  );
};

// export default Benefits;
export default Footer;
