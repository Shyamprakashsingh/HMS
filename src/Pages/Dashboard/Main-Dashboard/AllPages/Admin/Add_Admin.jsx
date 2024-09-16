import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import admin from "../../../../../img/admin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import FrontPage from "../../GlobalFiles/FrontPage";

// Notification utility function
const notify = (text, type = "info") => toast[type](text);

const Add_Admin = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  // Initial admin form data
  const InitData = {
    adminName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    education: "",
    adminID: Date.now(),  // You might want to use a unique ID generator here
    password: "",
  };

  const [AdminValue, setAdminValue] = useState(InitData);

  const HandleChange = (e) => {
    setAdminValue({ ...AdminValue, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation to ensure no empty fields
    for (let key in AdminValue) {
      if (!AdminValue[key]) {
        notify(`${key} cannot be empty`, "error");
        setLoading(false);
        return;
      }
    }

    dispatch(AdminRegister(AdminValue)).then((res) => {
      if (res.message === "Admin already exists") {
        setLoading(false);
        return notify("Admin Already Exists", "error");
      }

      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again", "error");
      }

      notify("Admin Added Successfully", "success");

      const emailData = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.adminID,
      };

      dispatch(SendPassword(emailData)).then(() =>
        notify("Account Details Sent", "success")
      );

      setLoading(false);
      setAdminValue(InitData);  // Reset form after successful submission
    });
  };

  // Check if user is authenticated and is an admin
  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user?.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />

      <div className="container">
        <Sidebar />

        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Admin</h1>
            <img src={admin} alt="admin" className="avatarimg" />

            <form onSubmit={HandleSubmit}>
              {/* Admin Name */}
              <div>
                <label>Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="adminName"
                    value={AdminValue.adminName}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={AdminValue.age}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={AdminValue.mobile}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={AdminValue.email}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AdminValue.gender}
                    onChange={HandleChange}
                    required
                  >
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Birthdate */}
              <div>
                <label>Birthdate</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    name="DOB"
                    value={AdminValue.DOB}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label>Address</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={AdminValue.address}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Education"
                    name="education"
                    value={AdminValue.education}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={AdminValue.password}
                    onChange={HandleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Admin;
