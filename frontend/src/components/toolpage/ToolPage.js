import React from 'react';
import './ToolPage.css';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const ToolPage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div class='main'>
      {isLoggedIn ? <LoggedIn onLogout={handleLogout}/> : <LoggedOut onLogin={handleLogin} />}
    </div>
  );
};

export default ToolPage;
