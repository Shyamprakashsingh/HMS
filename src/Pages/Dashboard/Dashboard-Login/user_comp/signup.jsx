import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { auth, db } from '../../../../Routes/firebaseConfig.js';  // Import Firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth";  // Import Firebase Auth functions
import { doc, setDoc } from "firebase/firestore";
import './Signup.css'; // Import CSS for styling

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(''); // Reset notification on form submit

    // Simple validation for password matching
    if (formData.password !== formData.confirmPassword) {
      setNotification('Password and Confirm Password do not match!');
      return;
    }

    try {
      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Save user data to Firebase Firestore
      await setDoc(doc(db, 'users', formData.email), {
        name: formData.name,
        email: formData.email,
        // Do not store passwords in Firestore for security reasons
      });

      // Show success notification
      setNotification('Signup successful! Redirecting to dashboard...');
      
      // Redirect to user dashboard after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 second delay before redirect
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Handle case where the email is already in use
        setNotification('User already exists. Please login or use a different email.');
      } else {
        console.error("Error creating user: ", error);
        setNotification('An error occurred during signup. Please try again.');
      }
    }
  };

  const toLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-user"></i>
            </span>
            <input
              className="signup-input"
              type="text"
              placeholder="Name *"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              className="signup-input"
              type="email"
              placeholder="Email *"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              className="signup-input"
              type="password"
              placeholder="Password *"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              className="signup-input"
              type="password"
              placeholder="Confirm Password *"
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
          
          {/* Show notification (e.g., success or error messages) */}
          {notification && (
            <div id="notification">
              {notification}
            </div>
          )}

          <button id="submit" type="submit">
            Sign Up
          </button>
          <span className="spantext">Already have an account? Log in here.</span>
          <button id="lastbtn" type="button" onClick={toLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
