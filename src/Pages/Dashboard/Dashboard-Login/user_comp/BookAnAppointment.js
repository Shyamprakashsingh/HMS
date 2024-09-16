import React, { useState } from "react";
import "./BookAnAppointment.css";

const BookAnAppointment = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="appointment-button" onClick={handleButtonClick}>
        BOOK AN APPOINTMENT
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Book an Appointment </h2>
            <form>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Phone:
                <input type="tel" name="phone" required />
              </label>
              <label>
                Date:
                <input type="date" name="date" required />
              </label>
              <label>
                Time:
                <input type="time" name="time" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAnAppointment;
