import React, { useEffect } from 'react';
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
          <LogForm onLogin={handleLoginSuccess}/>
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;