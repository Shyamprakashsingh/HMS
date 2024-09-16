import React from "react";
import { useNavigate } from 'react-router-dom';
//import Doctor from '../../../images/Doctor.png'; // Correct relative path
import './Home.css';
import HealthNetBanner from "../user_comp/img/Doctor.png";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login'); // Redirect to the User Login page
  };

  const goToAdminLogin = () => {
    navigate('/admin-login'); // Redirect to the Admin Login page
  };

  return (
    <React.Fragment>
      <div className="home-container">
        <nav className="navbar">
          <div className="logo">HealthNet</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><button onClick={goToLogin} className="nav-button">User Login</button></li>
            <li><button onClick={goToAdminLogin} className="nav-button">Admin Login</button></li>
            <li><a href="#about-us">About Us</a></li>
          </ul>
        </nav>
        
        <div className="content">
          <img 
            src={HealthNetBanner} // Using the imported image
            alt="HealthNet Banner" 
            style={{ width: '30%', height: 'auto', marginBottom: '05px' }}
          />
          <h1>Seamless Care, Anytime, Anywhere.</h1>
          <button className="about-btn">About Us</button>
        </div>
      </div>

      <div className="services" id="services" style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 id="services-head">Best in Town</h1>
        <div className="container1">
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fa fa-bed fa-3x" style={{ color: '#007bff' }}></i>
            <h4>Emergencies</h4>
          </div>
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fa fa-ambulance fa-3x" style={{ color: '#007bff' }}></i>
            <h4>Ambulance</h4>
          </div>
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fa fa-medkit fa-3x" style={{ color: '#007bff' }}></i>
            <h4>Medical Kit</h4>
          </div>
        </div>
        <div className="container2">
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fa fa-wheelchair fa-3x" style={{ color: '#007bff' }}></i>
            <h4>Wheelchair</h4>
          </div>
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fas fa-flask fa-3x" style={{ color: '#007bff' }}></i>
            <h4>Laboratory</h4>
          </div>
          <div className="service" style={{ margin: '20px', display: 'inline-block' }}>
            <i className="fas fa-phone fa-3x" style={{ color: '#007bff' }}></i>
            <h4>24x7 Helpline</h4>
          </div>
        </div>
      </div>

      <div id="book-appointment" style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center' }}>
        <h4 id="book-apt-head">Empowering Health, One Click at a Time!</h4>
      </div>
    </React.Fragment>
  );
};

export default Home;
