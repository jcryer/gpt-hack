import React, { useContext, useEffect, useState } from 'react';
import './BottomRight.css'; // Make sure to create a corresponding CSS file for this component
import TableModal from './TableModal';
import { downloadTSV } from '../utils/downloadUtils';
import { createTableRows, parseTSV } from '../utils/tableUtils';
import { useOutgoing } from '../context/OutgoingContext';

function BottomRight() {
  // Using placeholder data initially
  const initialPlaceholderData = [
    { date: '2024-02-01', description: 'Item 1', total: '$100' },
    { date: '2024-02-02', description: 'Item 2', total: '$200' },
    { date: '2024-02-03', description: 'Item 3', total: '$300' },
  ];

  const { outgoingData } = useOutgoing();
  const [data, setData] = useState(initialPlaceholderData);

  useEffect(() => {
    if (outgoingData && outgoingData.success && typeof outgoingData.tsv === 'string') {
      const parsedData = parseTSV(outgoingData.tsv);
      setData(parsedData);
    }
  }, [outgoingData]);

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCellClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Define columns for the table
  const columns = ['date', 'description','category','to/from' ,'total']; // Adjust columns as needed

  const rowsToRender = createTableRows(data, handleCellClick, columns);

  return (
    <div className="component4">
      <div className="component4-header">
        <h3>Outgoing</h3>
        <div className="component4-buttons">
          <button onClick={() => downloadTSV(data)}>Download</button>
        </div>
      </div>

      <div className="component4-table-container">
        <table className="component4-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>To/From</th>
              <th>Total</th>
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
      <TableModal content={modalContent} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default BottomRight;
