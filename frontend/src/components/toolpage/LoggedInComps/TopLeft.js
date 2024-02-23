import React, { useState } from 'react';
import './TopLeft.css'; // Make sure you create a corresponding CSS file
import { uploadFiles } from '../utils/uploadUtils';
import { useSettings } from '../context/SettingsContext';

function TopLeft({ setData }) {
  const [activeTab, setActiveTab] = useState('Invoices');

  const [files, setFiles] = useState([]); // Files for Invoices
  const [statementsFile, setStatementsFile] = useState(); // Files for Statements
  const { settings } = useSettings();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = (event) => {
    console.log(event);
    const selectedFiles = Array.from(event.target.files); // Converts FileList to Array
    console.log(selectedFiles);
    if (activeTab === 'Invoices') {
      setFiles(selectedFiles);
    } else if (activeTab === 'Statement') {
      setStatementsFile(selectedFiles[0]);
    }

    console.log(files);
  };

  const handleReconcileClick = async () => {
    if (files.length === 0 || statementsFile === null) {
      alert("Please upload at least one file in both the 'Invoices' and 'Statement' tabs before proceeding.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const filesToUpload = {
        invoicesFiles: files,
        statementsFile: statementsFile
      };

      console.log(filesToUpload);

      const res = await uploadFiles(filesToUpload, settings);
      setData(res);
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
            className={`tab ${activeTab === 'Statement' ? 'active' : ''}`}
            onClick={() => handleTabClick('Statement')}
            disabled={isLoading}
          >
            Statement
          </button>
        </div>
        <button className="check-button" onClick={handleReconcileClick} disabled={isLoading}>Reconcile!</button>
      </div>

      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-circle"></div>
        </div>
      ) : activeTab === 'Invoices' || activeTab === 'Statement' ? (
        <div className="file-input-container">
          <input
            type="file"
            id="file-upload"
            className="file-input"
            {...(activeTab === 'Invoices' && {multiple: true})}
            onChange={handleFileChange}
            accept={activeTab === 'Statement' ? ".csv" : ".pdf"} // Only accept .csv files for Statements tab
            disabled={isLoading}
          />
          <label htmlFor="file-upload" className="file-label">
            Choose Files {((activeTab === 'Invoices' && files.length > 0) || (activeTab === 'Statement' && statementsFile != null)) ? '✅' : ''}
          </label>
        </div>
      ) : null}
    </div>
  );
}

export default TopLeft;
