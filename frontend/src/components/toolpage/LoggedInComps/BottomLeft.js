import React, { useContext, useEffect, useState } from 'react';
import './BottomLeft.css'; // Make sure to create a corresponding CSS file for this component
import TableModal from './TableModal';
import { downloadTSV } from '../utils/downloadUtils';
import { createTableRows, parseTSV } from '../utils/tableUtils';
import { useFileData } from '../context/IncomingContext';
import PDFModal from './PDFModal';


function BottomLeft() {
  // Using placeholder data initially
  const initialPlaceholderData = [
    { date: '2024-02-01', description: 'Item 1', category:'food',to_from:'kevin', total: '$100',doc:'../../../public/test.pdf' },
    
  ];
  const [pdfFilePath, setPdfFilePath] = useState('');
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const { tsvData } = useFileData();
  const [data, setData] = useState(initialPlaceholderData);

  useEffect(() => {
    if (tsvData && tsvData.success && typeof tsvData.tsv === 'string') {
      const parsedData = parseTSV(tsvData.tsv);
      setData(parsedData);
    }
  }, [tsvData]);

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCellClick = (content, columnName) => {
    if (columnName === 'doc') {
      // Assuming content is the path to the PDF file or an identifier to retrieve it
      console.log('tried to view pdf')
      setPdfFilePath(content); // For now, directly setting the static file path
      setIsPDFModalOpen(true);
    } else {
      // Handle other cell clicks as before
      setModalContent(content);
      setIsModalOpen(true);
    
    }
  };
  const handleClosePDFModal = () => {
    setIsPDFModalOpen(false);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Define columns for the table
  const columns = ['date', 'description','category','to_from' ,'total','doc']; // Adjust columns as needed

  const rowsToRender = createTableRows(data, handleCellClick, columns);

  return (
    <div className="component3">
      <div className="component3-header">
        <h3>Incoming</h3>
        <div className="component3-buttons">
          <button onClick={() => downloadTSV(data)}>Download</button>
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
              <th>Doc</th>
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
      <PDFModal
        content={pdfFilePath}
        isOpen={isPDFModalOpen}
        onClose={handleClosePDFModal}
      />
    </div>
  );
}

export default BottomLeft;
