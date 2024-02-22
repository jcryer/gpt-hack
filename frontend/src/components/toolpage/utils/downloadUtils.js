// downloadUtils.js

// Convert data array to CSV format
export const convertToCsv = (data) => {
    const array = [Object.keys(data[0])].concat(data);

    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n');
  };
  
  // Trigger download of CSV file
  export const downloadCsv = (data, filename = 'data.csv') => {
    const csvString = convertToCsv(data);
    const blob = new Blob([csvString], { type: 'text/csv' });
  
    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  