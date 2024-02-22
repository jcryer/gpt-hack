import React, { useState } from 'react';
import './Bottom.css';
import TableModal from './TableModal';
import { downloadCsv } from '../utils/downloadUtils';
import { createTableRows } from '../utils/tableUtils';

function Bottom({ title, data=[] }) {

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (record) => {
    setModalContent(record);
    setIsModalOpen(true);
  }

  const columns = ['date', 'description', 'category', 'to_from', 'total', 'reconciled']; // Adjust columns as needed

  const rowsToRender = createTableRows(data, handleRowClick, columns);

  return (
    <div className="component3">
      <div className="component3-header">
        <h3>{title}</h3>
        <div className="component3-buttons">
          <button onClick={() => downloadCsv(data)}>Download</button>
        </div>
      </div>

      <div className="component3-table-container">
        <table className="component3-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>To/From</th>
              <th>Total</th>
              <th>Reconciled?</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan="3">{data.length} results</td>
            </tr>
          </tfoot>
          <tbody>{rowsToRender}</tbody>
        </table>
      </div>
      <TableModal content={modalContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Bottom;
