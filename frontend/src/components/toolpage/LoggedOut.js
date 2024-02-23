import React from 'react';
import './LoggedOut.css';
import LogForm from "./LogForm";


const LoggedOut = ({ onLogin }) => {
  // Function to handle login success from LogForm
  const handleLoginSuccess = (isLoggedIn) => {
    if (isLoggedIn) {
      onLogin(true); // Notify the parent component
    }
  };

  

  return (
    <div className="loggedOutContainer">
      <div className="backgroundSide">
        
        <div className="logo"></div>
      
      </div>
      <div className="formSide">
        <div className="formContainer">
          <button type="submit" className="submitButton" onClick={() => onLogin(true)}>Press to Begin</button>
          {/* <LogForm onLogin={handleLoginSuccess}/> */}
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;
