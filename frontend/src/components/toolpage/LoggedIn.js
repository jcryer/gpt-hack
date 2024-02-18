import React, { useState } from 'react';
import './LoggedIn.css';
import TopLeft from './LoggedInComps/TopLeft';
import TopRight from './LoggedInComps/TopRight';
import BottomLeft from './LoggedInComps/BottomLeft';
import BottomRight from './LoggedInComps/BottomRight';
import { FileDataProvider } from './context/FileDataContext';

const LoggedIn = ({ onLogout }) => {
  const [username, setUsername] = useState('');

  return (
    <FileDataProvider>
    <div className="container">
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopLeft />
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopRight />
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <BottomLeft />
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <BottomRight />
    </div>
  </div>
  </FileDataProvider>
  );
};

export default LoggedIn;