import React from 'react';
import './TableModal.css'; // Make sure to create the corresponding CSS file
import PDFModal from './PDFModal';

function TableModal({ content, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  let fileUrl = `files/${content.invoice}`;
  return (
    <div className="table-modal-backdrop">
      <div className="table-modal">
        <button className="table-modal-close" onClick={onClose}>×</button>
        <div className="table-modal-content">
          <div className='left'>
            <div className='row'><b>Total:</b> {content.totalAmount < 0 ? `-£${Math.abs(content.totalAmount).toFixed(2)}` : `£${content.totalAmount.toFixed(2)}`}</div>
            <div className='row'><b>Date:</b> {content.date}</div>
            <div className='row'><b>Description:</b> {content.description}</div>
            <div className='row'><b>Category:</b> {content.category}</div>
            <div className='row'><b>To/From:</b> {content.toFrom}</div>
            {content.invoice ? (<div className='row'><b>File:</b> <a href={fileUrl}>Download here</a></div>) : null}
          </div>
          {content.invoice ? (<div className='right'>
            <PDFModal content={fileUrl} />
          </div>) : null}
        </div>
      </div>
    </div>
  );
}

export default TableModal;
