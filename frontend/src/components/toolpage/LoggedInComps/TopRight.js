import React, { useState } from 'react';
import './TopRight.css'; // Make sure the CSS file is updated accordingly
import { useSettings } from '../context/SettingsContext';

function TopRight({alerts}) {
  const [activeTab, setActiveTab] = useState('Alerts');
  const { settings, setSettings } = useSettings();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSettingsTextChange = (event) => {
    setSettings(event.target.value); // Update shared settings text in context
  };

  // Functionality for handling actions on the Alerts tab can be added later

  return (
    <div className="component2">
      <div className="button-container">
        <div className="tab-switcher">
          <button 
            className={`tab ${activeTab === 'Alerts' ? 'active' : ''}`}
            onClick={() => handleTabClick('Alerts')}
          >
            Alerts
          </button>
          <button 
            className={`tab ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('Settings')}
          >
            Settings
          </button>
        </div>
      </div>
      
      {activeTab === 'Settings' ? (
        <div className="text-input-container">
          <textarea id="settings-input" className="text-input" placeholder="Context here e.g. builder..." value={settings}
            onChange={handleSettingsTextChange}></textarea>
        </div>
      ) : (
        <div className="alerts-container">
          {/* This space is reserved for displaying alerts messages */}
          {alerts ? <>
            <b>Failed files:</b>
            <br></br><br></br>
            {alerts.map((a, i) => (<div key={i}>{a.invoiceName}</div>))}</>
           : <p>No alerts at the moment.</p>}
        </div>
      )}
    </div>
  );
}

export default TopRight;
