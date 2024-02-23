import React, { useState } from 'react';
import './LoggedIn.css';
import TopLeft from './LoggedInComps/TopLeft';
import TopRight from './LoggedInComps/TopRight';
import Bottom from './LoggedInComps/Bottom';
import { SettingsProvider } from './context/SettingsContext';

const LoggedIn = ({ onLogout }) => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);

  
  return (
      <SettingsProvider>
        
    <div className="container">
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopLeft setData={setData}/>
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <TopRight alerts={data.unmatched}/>
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <Bottom title="Incoming" data={data.all?.filter(x => x.totalAmount > 0)}/>
    </div>
    <div className='contentWrapper quarter'> {/* Add 'quarter' class here */}
      <Bottom title="Outgoing" data={data.all?.filter(x => x.totalAmount < 0)}/>
    </div>
  </div>
  </SettingsProvider>
  );
};

export default LoggedIn;
