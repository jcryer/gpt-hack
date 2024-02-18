import React, { useState } from 'react';
import './TopRight.css'; // Make sure the CSS file is updated accordingly

function TopRight() {
  const [activeTab, setActiveTab] = useState('Settings');
  const [settingsText, setSettingsText] = useState(''); // For storing settings input

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSettingsTextChange = (event) => {
    setSettingsText(event.target.value); // Update settings text state on change
  };

  // Functionality for handling actions on the Alerts tab can be added later

  return (
    <div className="component1">
      <div className="button-container">
        <div className="tab-switcher">
          <button 
            className={`tab ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('Settings')}
          >
            Settings
          </button>
          <button 
            className={`tab ${activeTab === 'Alerts' ? 'active' : ''}`}
            onClick={() => handleTabClick('Alerts')}
          >
            Alerts
          </button>
        </div>
      </div>
      
      {activeTab === 'Settings' ? (
        <div className="text-input-container">
          <textarea id="settings-input" className="text-input" placeholder="Context here e.g. builder..." value={settingsText}
            onChange={handleSettingsTextChange}></textarea>
        </div>
      ) : (
        <div className="alerts-container">
          {/* This space is reserved for displaying alerts messages */}
          <p>No alerts at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default TopRight;
