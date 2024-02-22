import React from 'react';
import './TableModal.css'; // Make sure to create the corresponding CSS file
import PDFModal from './PDFModal';

function TableModal({ content, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  console.log(content);
  return (
    <div className="table-modal-backdrop" onClick={onClose}>
      <div className="table-modal">
        <button className="table-modal-close" onClick={onClose}>×</button>
        <div className="table-modal-content">
          <div className='left'>{Object.values(content).map((item) => (
            <div className='row' key={item}>{item}</div>
          ))}</div>
          <div className='right'>
            <PDFModal content="http://localhost:3000/pdf" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableModal;
