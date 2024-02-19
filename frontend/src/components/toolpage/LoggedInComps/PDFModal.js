import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// Import the default styles - you may need to adjust the import path based on your setup
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// If you're using a custom worker, specify its path. Otherwise, you can use the version from unpkg as shown below.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFModal = ({ content, isOpen, onClose }) => {
  // Set up state for the number of pages in the document
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  if (!isOpen) {
    return null;
  }

  

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '80%',
          maxHeight: '90%',
          backgroundColor: '#fff',
          padding: 20,
          boxSizing: 'border-box',
          overflow: 'auto',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
        <Document
          file={content}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFModal;
