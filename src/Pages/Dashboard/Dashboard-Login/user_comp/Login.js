import React, { useState } from 'react'; // Import useState
import HealthInsurance from "../user_comp/img/logo.png"
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { signInWithEmailAndPassword } from 'firebase/auth';  // Firebase Auth function
import { auth, db } from '../../../../Routes/firebaseConfig'; // Import Firebase Auth and Firestore instance
import { doc, getDoc } from 'firebase/firestore';  // Firestore functions
import './Login.css'; // Import CSS for styling

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state for more details
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false); // Reset error state
    setErrorMessage(''); // Reset error message state

    try {
      // Sign in user with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

      // Get the user's document from Firestore
      const userDocRef = doc(db, 'users', credentials.email);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the user exists in the Firestore "users" collection, redirect to dashboard
        navigate('/user-dashboard');
      } else {
        // If the email is not found in the "users" collection, show an error
        setShowError(true);
        setErrorMessage('Access denied. Your account is not authorized.');
      }
    } catch (error) {
      // Show error if login fails or user is not in Firestore collection
      setShowError(true);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMessage('Incorrect Email or Password!');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
      console.error("Login error: ", error);
    }
  };

  const toSignUp = () => {
    navigate('/UserSignup'); // Redirect to the signup page
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={HealthInsurance} alt="Health Insurance" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              className="logininput"
              type="email"
              placeholder="Email *"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="input-field">
            <span className="icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              className="logininput"
              type="password"
              placeholder="Password *"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          {showError && (
            <div id="Incorrect-credentials">
              {errorMessage}
            </div>
          )}
          <button id="submit" type="submit">
            Login
          </button>
          <span className="spantext">Don't have an account? Create one here.</span>
          <button id="lastbtn" type="button" onClick={toSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
