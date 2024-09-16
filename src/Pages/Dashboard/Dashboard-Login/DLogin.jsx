import React, { useState } from "react";
import { Radio, Drawer } from "antd";
import banner from "../../../img/banner.png";
import admin from "../../../img/admin.jpg";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app, auth, db } from '../../../Routes/firebaseConfig.js';  // Import Firebase configuration
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";  // Import Firebase Auth functions
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore"; // Import Firestore functions
import {
  AdminLogin,
  DoctorLogin,
  forgetPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
 
const notify = (text) => toast(text);

const DLogin = () => {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placement, setPlacement] = useState("Nurse");
  const [formvalue, setFormvalue] = useState({ ID: "", password: "" });
  const [signupFormValue, setSignupFormValue] = useState({ name: "", email: "", password: "", role: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const showSignupDrawer = () => setSignupOpen(true);
  const onClose = () => {
    setOpen(false);
    setSignupOpen(false);
  };

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const HandleSignupChange = (e) => {
    setSignupFormValue({ ...signupFormValue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { ID, password } = formvalue;
    const role = placement;
    

    if (ID !== "" && password !== "") {
      try {
        // Check if user exists in Firestore
        const userDocRef = doc(db, role, ID.toString()); // Convert ID to string
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const user = userDoc.data();

          // Authenticate user using Firebase Auth
          const email = user.email; // Get email from Firestore document

          // Attempt to sign in with email and password
          await signInWithEmailAndPassword(auth, email, password);

          // Check if the role matches
          if (user.role === role) {
              notify("Login Successful");
              setLoading(false);
            // navigate("/dashboard"); // Redirect based on your application routing
            if (placement === "Nurse") {
              let data = {
                ...formvalue,
                nurseID: formvalue.ID,
              };
              dispatch(NurseLogin(data)).then((res) => {
  
                return navigate("/dashboard");
                
              });
            } else if (placement === "Doctor") {
              let data = {
                ...formvalue,
                docID: formvalue.ID,
              };
              console.log(data);
              dispatch(DoctorLogin(data)).then((res) => {
            
                return navigate("/dashboard");
                
              });
            } else if (placement === "Admin") {
              let data = {
                ...formvalue,
                adminID: formvalue.ID,
              };
              dispatch(AdminLogin(data)).then((res) => {
      
                return navigate("/dashboard");
    
              });
            }
          } else {
            notify("Invalid role");
            setLoading(false);
          }
        } else {
          notify("No user found with this ID and role");
          setLoading(false);
        }
      } catch (error) {
        notify("Error during login: " + error.message);
        setLoading(false);
      }
    } else {
      notify("Please enter both ID and password");
      setLoading(false);
    }
  };

  const HandleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, role } = signupFormValue;

    try {
      // Generate unique ID
      const userCollection = collection(db, role); // e.g., 'admin', 'doctor', 'nurse'
      const userSnapshot = await getDocs(userCollection);
      const newId = userSnapshot.size + 100; // Start ID from 100 and increment

      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Store user details in Firestore
      const userDocRef = doc(db, role, newId.toString()); // Store data with unique ID
      await setDoc(userDocRef, { name, email, role, ID: newId });

      notify(`Sign Up Successful as ${role} with ID: ${newId}`);
      setSignupOpen(false);
    } catch (error) {
      notify("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
          <img src={banner} alt="banner" />
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div>
            <Radio.Group
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className={"radiogroup"}
            >
              <Radio.Button value="Nurse" className={"radiobutton"}>
                Nurse
              </Radio.Button>
              <Radio.Button value="Doctor" className={"radiobutton"}>
                Doctor
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>{placement} ID</h3>
              <input
                type="number"
                name="ID"
                value={formvalue.ID}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formvalue.password}
                onChange={Handlechange}
                required
              />
              <button type="submit">{loading ? "Loading..." : "Submit"}</button>
            </form>
            <p style={{ marginTop: "10px" }}>
              Forget Password?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={showDrawer}
              >
                Get it on Email!
              </span>
            </p>
            <p style={{ marginTop: "10px" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={showSignupDrawer}
              >
                Sign Up here!
              </span>
            </p>

            {/* Drawer for Forget Password */}
            <Drawer
              title="Forget Password"
              placement="left"
              onClose={onClose}
              open={open}
            >
              {/* Forget Password form content */}
            </Drawer>

            {/* Drawer for Sign Up */}
            <Drawer
              title="Sign Up"
              placement="left"
              onClose={onClose}
              open={signupOpen}
            >
              <form onSubmit={HandleSignupSubmit}>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={signupFormValue.name}
                    onChange={HandleSignupChange}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupFormValue.email}
                    onChange={HandleSignupChange}
                    required
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupFormValue.password}
                    onChange={HandleSignupChange}
                    required
                  />
                </div>
                <div>
                  <label>Role</label>
                  <Radio.Group
                    value={signupFormValue.role}
                    onChange={(e) => setSignupFormValue({ ...signupFormValue, role: e.target.value })}
                    className={"radiogroup"}
                  >
                    <Radio.Button value="Nurse" className={"radiobutton"}>
                      Nurse
                    </Radio.Button>
                    <Radio.Button value="Doctor" className={"radiobutton"}>
                      Doctor
                    </Radio.Button>
                    <Radio.Button value="Admin" className={"radiobutton"}>
                      Admin
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <button type="submit">
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </form>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
