import React, { useState } from 'react';
import './TopLeft.css'; // Make sure you create a corresponding CSS file
import { uploadFiles } from '../utils/checkUtils';
import { useFileData } from '../context/FileDataContext';

function TopLeft() {
  const [activeTab, setActiveTab] = useState('Invoices');
  const [files, setFiles] = useState([]); // Files for Invoices
  const [statementsFiles, setStatementsFiles] = useState([]); // Files for Statements
  const [text, setText] = useState('');
  const { setTsvData } = useFileData();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = (event) => {
    if (activeTab === 'Invoices') {
      setFiles(event.target.files);
    } else if (activeTab === 'Statements') {
      setStatementsFiles(event.target.files); // Set files for statements
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value); // Update text state on change
  };

  const handleCheckClick = async () => {
    if (!text.trim() && activeTab === 'Invoices' || (activeTab === 'Invoices' && files.length === 0) || (activeTab === 'Statements' && statementsFiles.length === 0)) {
      alert("Please enter some requirement text and select files before proceeding.");
      return;
    }
  
    try {
      const uploadFilesList = activeTab === 'Invoices' ? files : statementsFiles;
      const result = await uploadFiles(uploadFilesList, text);
      console.log(result);
      setTsvData(result); // Store the TSV data in the context
      alert('CV analysis complete!')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="component1">
      <div className="button-container">
        <div className="tab-switcher">
          <button 
            className={`tab ${activeTab === 'Invoices' ? 'active' : ''}`}
            onClick={() => handleTabClick('Invoices')}
          >
            Invoices {files.length > 0 ? `(${files.length})` : ''}
          </button>
          <button 
            className={`tab ${activeTab === 'Statements' ? 'active' : ''}`}
            onClick={() => handleTabClick('Statements')}
          >
            Statements {statementsFiles.length > 0 ? `(${statementsFiles.length})` : ''}
          </button>
        </div>
        <button className="check-button" onClick={handleCheckClick}>Reconcile!</button>
      </div>
      
      {activeTab === 'Invoices' || activeTab === 'Statements' ? (
        <div className="file-input-container">
          <input type="file" id="file-upload" className="file-input" multiple onChange={handleFileChange} accept=".pdf" /> 
          <label htmlFor="file-upload" className="file-label">
            Choose Files {((activeTab === 'Invoices' && files.length > 0) || (activeTab === 'Statements' && statementsFiles.length > 0)) ? '✅' : ''}
          </label>
        </div>
      ) : null}
    </div>
  );
}

export default TopLeft;
