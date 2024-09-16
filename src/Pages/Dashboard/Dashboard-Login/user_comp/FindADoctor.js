import React, { useState } from "react";
import "./FindADoctor.css";

const FindADoctor = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="find-doctor-container">
      <div className="find-doctor-button">
        <h2>Find a Doctor</h2>
        <button onClick={toggleModal} className="button">
          Search Doctor
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Find a Doctor</h2>
              <button className="close-button" onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              <form>
                <label>Doctor Name:</label>
                <input type="text" placeholder="Enter doctor's name" />

                <label>Specialty:</label>
                <input type="text" placeholder="Enter specialty" />

                <label>Location:</label>
                <input type="text" placeholder="Enter location" />

                <button className="submit-button" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindADoctor;
