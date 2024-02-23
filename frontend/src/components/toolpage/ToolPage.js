import React from 'react';
import './ToolPage.css';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const ToolPage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = (log) => {
    setIsLoggedIn(log);
  };

  return (
    <div className='main'>
      {isLoggedIn ? <LoggedIn onLogout={() => handleLogin(false)}/> : <LoggedOut onLogin={() => handleLogin(true)} />}
    </div>
  );
};

export default ToolPage;
