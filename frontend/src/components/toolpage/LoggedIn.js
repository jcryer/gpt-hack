import React, { useState } from 'react';
import './LoggedIn.css';
import TopLeft from './LoggedInComps/TopLeft';
import TopRight from './LoggedInComps/TopRight';
import BottomLeft from './LoggedInComps/BottomLeft';
import BottomRight from './LoggedInComps/BottomRight';

const LoggedIn = ({ onLogout }) => {
  const [username, setUsername] = useState('');

  return (
    <div className="container">
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopLeft />
    </div>
    <div className='quarter'> {/* Add 'quarter' class here */}
      <TopRight />
    </div>
    <div className='quarter'> {/* Add 'quarter' class here */}
      <BottomLeft />
    </div>
    <div className='quarter'> {/* Add 'quarter' class here */}
      <BottomRight />
    </div>
  </div>
  );
};

export default LoggedIn;