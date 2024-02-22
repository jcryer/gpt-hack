import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFModal = ({ content }) => {
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document
      file={content}
      onLoadSuccess={onDocumentLoadSuccess}
      options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
      ))}
    </Document>
  );
};

export default PDFModal;
