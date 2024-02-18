import React from 'react';
import './TableModal.css'; // Make sure to create the corresponding CSS file

function TableModal({ content, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="table-modal-backdrop">
      <div className="table-modal">
        <button className="table-modal-close" onClick={onClose}>×</button>
        <div className="table-modal-content">
          {content}
        </div>
      </div>
    </div>
  );
}

export default TableModal;
