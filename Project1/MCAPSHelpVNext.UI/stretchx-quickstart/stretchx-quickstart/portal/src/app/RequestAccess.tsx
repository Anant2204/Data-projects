import React, { useState } from 'react';
import './RequestAccessStyles.css';

function RequestAccess() {

  const [reason, setReason] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const handleApiRequest = async () => {
    try {
      // Make an API request using the fetch function
      const response = await fetch('', {
        method: 'POST', // Use the appropriate HTTP method (GET, POST, etc.)
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type
        },
      });

      if (response.ok) {
        // The request was successful
        // console.log('Access request submitted successfully.');
        // You can add additional logic here, such as showing a success message to the user.
        setRequestSent(true); // Set the requestSent state to true to display the success message.
      } else {
        // Handle error responses here
        console.error('Request failed:', response.status, response.statusText);
        // You can add error handling and display an error message to the user.
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Request failed:', error);
      // You can add error handling and display an error message to the user.
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission here, e.g., send a request to the server
    // console.log(`Name: ${name}, Email: ${email}, Reason: ${reason}`);

    // Call the API request function when the form is submitted
    handleApiRequest();
  };

  return (
    <div>
      <div className="page-container">
        <div className="ms-core-pageTitle">
          <h1>You need permission to access this site.</h1>
        </div>
        {requestSent ? (
          <div className="success-message">
            Your request has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="textarea-button-container">
              <textarea
                name="permissionMsg"
                className="textarea-font"
                placeholder="I'd like access, please."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <button className="request-access" type="submit">
                Request Access
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RequestAccess;
