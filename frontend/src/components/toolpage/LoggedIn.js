import React, { useState } from 'react';
import './LoggedIn.css';
import TopLeft from './LoggedInComps/TopLeft';
import TopRight from './LoggedInComps/TopRight';
import Bottom from './LoggedInComps/Bottom';
import { SettingsProvider } from './context/SettingsContext';

const LoggedIn = ({ onLogout }) => {
  const [username, setUsername] = useState('');

  const initialPlaceholderData = [
    { date: '2024-02-01', description: 'Item 1', total: '$100' },
    { date: '2024-02-02', description: 'Item 2', total: '$200' },
    { date: '2024-02-03', description: 'Item 3', total: '$300' },
  ];
  
  return (
      <SettingsProvider>
        
    <div className="container">
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopLeft />
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopRight />
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <Bottom title="Incoming" data={initialPlaceholderData}/>
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <Bottom title="Outgoing"/>
    </div>
  </div>
  </SettingsProvider>
  );
};

export default LoggedIn;
