// Dashboard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import healthnet from './img/healthnet.png';
import robologo from "./img/robologo.jpg";
import periodIcon from "./img/periodIcon.jpg";
import AcneIcon from "./img/acneIcon.jpg";
import AllergyIcon from "./img/allergy.png";
import coldIcon from "./img/coldIcon.jpg";
import childIcon from "./img/childIcon.png";
import depressionIcon from "./img/depressionIcon.jpg";
import BookAnAppointment from "./BookAnAppointment";

const UserDashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    "Book an appointment",
    "24x7 ambulance",
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src={healthnet} alt="HealthNet" className="logo" /> 
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search for disease and symptoms"
            className="search-bar"
          />
        </div>

        <nav>
          <ul className="menu">
            <li><Link to="/">Logout</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/find-doctor">Find A Doctor</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/admin-login">Admin Login</Link></li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-content">
        <div className="grid">
          <div>
            <BookAnAppointment />
          </div>
          <div className="grid-item">FIND A DOCTOR</div>
          <div className="grid-item">EMERGENCY</div>
          <div className="grid-item">PATIENT'S PORTAL</div>
        </div>

        <div className="consult-section">
          <ConsultItem
            icon={periodIcon}
            title="Period doubts or Pregnancy"
            link="/consult/period"
          />
          <ConsultItem
            icon={AcneIcon}
            title="Acne, pimple or skin issues"
            link="/consult/acne"
          />
          <ConsultItem
            icon={AllergyIcon}
            title="Allergy or Irritation"
            link="/consult/performance"
          />
          <ConsultItem
            icon={coldIcon}
            title="Cold, cough or fever"
            link="/consult/cold"
          />
          <ConsultItem
            icon={childIcon}
            title="Child not feeling well"
            link="/consult/child"
          />
          <ConsultItem
            icon={depressionIcon}
            title="Depression or anxiety"
            link="/consult/depression"
          />
        </div>
      </div>

      <div className="chatbox-container">
        <Chatbox
          isChatOpen={isChatOpen}
          toggleChat={toggleChat}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          robologo={robologo}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

const ConsultItem = ({ icon, title, link }) => (
  <div className="consult-now-item">
    <img src={icon} alt={title} />
    <h4>{title}</h4>
    <Link to={link}>
      <button className="consult-button">CONSULT NOW</button>
    </Link>
  </div>
);

const Chatbox = ({
  isChatOpen,
  toggleChat,
  isHovered,
  setIsHovered,
  robologo,
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
}) => (
  <>
    <button
      className="chatbox-toggle"
      onClick={toggleChat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={robologo} alt="AI Chatbot" className="chatbox-logo" />
      {isHovered && (
        <div className="chatbox-hover-popup">How can I help you?</div>
      )}
    </button>
    {isChatOpen && (
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>HealthNet AI Assistant</h3>
          <button className="chatbox-close" onClick={toggleChat}>
            X
          </button>
        </div>
        <div className="chatbox-body">
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="chatbox-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    )}
  </>
);

export default UserDashboard;
