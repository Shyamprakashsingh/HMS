import React, { useState } from "react";
import "./BookingForm.css";

function BookingForm({ triggerLabel }) {
  const [isVisible, setIsVisible] = useState(false);

  // Function to show the modal
  const showModal = () => setIsVisible(true);

  // Function to hide the modal
  const hideModal = () => {
    setIsVisible(false);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle the form submission, e.g., sending data to a server
    // For now, just close the modal after submitting
    alert("Form submitted!"); // Placeholder feedback
    setIsVisible(false); // Close modal after submission
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button onClick={showModal} className="trigger-button">
        {triggerLabel}
      </button>
      {/* Modal content that appears conditionally */}
      {isVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={hideModal}>
              ×
            </span>
            <form onSubmit={handleSubmit}>
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
                <input type="tel" name="phone" required pattern="\d*" title="Please enter a valid phone number." />
              </label>
              <label>
                Date:
                <input type="date" name="date" required />
              </label>
              <label>
                Time:
                <input type="time" name="time" required />
              </label>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingForm;
