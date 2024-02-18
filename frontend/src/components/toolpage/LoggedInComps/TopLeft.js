import React, { useState } from 'react';
import './TopLeft.css'; // Make sure you create a corresponding CSS file
import { uploadFiles } from '../utils/uploadUtils';
import { useFileData } from '../context/IncomingContext';
import { useSettings } from '../context/SettingsContext';

function TopLeft() {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [files, setFiles] = useState([]); // Files for Invoices
  const [statementsFiles, setStatementsFiles] = useState([]); // Files for Statements
  const [text, setText] = useState('');
  const { setTsvData } = useFileData();
  const { settings } = useSettings();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Converts FileList to Array
    if (activeTab === 'Invoices') {
        setFiles(selectedFiles);
    } else if (activeTab === 'Statements') {
        setStatementsFiles(selectedFiles);
    }
};

  

  const handleReconcileClick = async () => {
    if (files.length === 0 || statementsFiles.length === 0) {
        alert("Please upload at least one file in both the 'Invoices' and 'Statements' tabs before proceeding.");
        return;
    }

    setIsLoading(true); // Start loading
    try {
        const filesToUpload = {
            invoicesFiles: files,
            statementsFiles: statementsFiles
        };

        //await uploadFiles(filesToUpload, settings);
        alert('Files have been successfully uploaded.');
    } catch (error) {
        console.error('An error occurred during file upload:', error);
        alert('An error occurred during the upload process. Please try again.');
    } finally {
        setIsLoading(false); // Stop loading regardless of the outcome
    }
};

return (
  <div className={`component1 ${isLoading ? 'loading' : ''}`}>
      <div className="button-container">
          <div className="tab-switcher">
              <button 
                  className={`tab ${activeTab === 'Invoices' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Invoices')}
                  disabled={isLoading}
              >
                  Invoices {files.length > 0 ? `(${files.length})` : ''}
              </button>
              <button 
                  className={`tab ${activeTab === 'Statements' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Statements')}
                  disabled={isLoading}
              >
                  Statements {statementsFiles.length > 0 ? `(${statementsFiles.length})` : ''}
              </button>
          </div>
          <button className="check-button" onClick={handleReconcileClick} disabled={isLoading}>Reconcile!</button>
      </div>
      
      {isLoading ? (
          <div className="loading-overlay">
              <div className="loading-circle"></div>
          </div>
      ) : activeTab === 'Invoices' || activeTab === 'Statements' ? (
          <div className="file-input-container">
              <input 
                  type="file" 
                  id="file-upload" 
                  className="file-input" 
                  multiple 
                  onChange={handleFileChange} 
                  accept={activeTab === 'Statements' ? ".csv" : ""} // Only accept .csv files for Statements tab
                  disabled={isLoading}
              /> 
              <label htmlFor="file-upload" className="file-label">
                  Choose Files {((activeTab === 'Invoices' && files.length > 0) || (activeTab === 'Statements' && statementsFiles.length > 0)) ? '✅' : ''}
              </label>
          </div>
      ) : null}
  </div>
);
}

export default TopLeft;
