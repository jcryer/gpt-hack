// downloadUtils.js

// Convert data array to TSV format
export const convertToTSV = (data) => {
    // Extract headers
    const headers = Object.keys(data[0]);
  
    // Map each row to a TSV string
    const rows = data.map(row => 
      headers.map(header => row[header]).join('\t')
    );
  
    return [headers.join('\t'), ...rows].join('\n');
  };
  
  // Trigger download of TSV file
  export const downloadTSV = (data, filename = 'data.tsv') => {
    const tsvString = convertToTSV(data);
    const blob = new Blob([tsvString], { type: 'text/tab-separated-values' });
  
    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  