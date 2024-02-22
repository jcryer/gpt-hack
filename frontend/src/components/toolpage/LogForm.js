import React, { useState } from 'react';
import './LogForm.css';


const LogForm = ({ onLogin }) => {
  const [view, setView] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you would typically handle the login logic,
    // such as calling an API to authenticate the user.
    // For demonstration, we're simulating a successful login.
    console.log('Logging in with', email, password);
    
    // Assuming onLoginSuccess is a prop function passed from the parent component
    // to handle login state management.
    onLogin(true); // Simulate passing loginTrue prop upwards.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This function is a placeholder for both sign up and forgot password forms.
    // You would handle form submission here, such as sending data to an API.
    console.log('Form submitted');
  };
 

  return (
    <div className="formWrapper">
      {view === 'login' && (
        <form onSubmit={handleLogin} className="form">
          <h2>Log In</h2>
          <input type="email" placeholder="Email" required className="inputField" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" required className="inputField" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="submitButton">Log In</button>
          <p className="switchText">Don't have an account? <span onClick={() => setView('signup')}>Sign Up</span></p>
          <p className="switchText">Forgot Password? <span onClick={() => setView('forgotpassword')}>Click here</span></p>
        </form>
      )}

      {view === 'signup' && (
        <form onSubmit={handleSubmit} className="form">
          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" required className="inputField" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email" required className="inputField" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" required className="inputField" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="submitButton">Sign Up</button>
          <p className="switchText">Already have an account? <span onClick={() => setView('login')}>Log In</span></p>
        </form>
      )}

      {view === 'forgotpassword' && (
        <form onSubmit={handleSubmit} className="form">
          <h2>Forgot Password</h2>
          <input type="email" placeholder="Email" required className="inputField"/>
          <button type="submit" className="submitButton">Reset Password</button>
          <p className="switchText">Remember your password? <span onClick={() => setView('login')}>Log In</span></p>
        </form>
      )}
    </div>
  );
};

export default LogForm;
