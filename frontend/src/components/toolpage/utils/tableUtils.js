// tableUtils.js

export const createTableRows = (data, handleCellClick, columns, fillRows = 100) => {
  const rows = data.map((item, index) => {
    // Determine the class name based on the Y/N column
    const rowClassName = item.yn === 'Y' ? 'yes-row' : item.yn === 'N' ? 'no-row' : '';

    return (
      <tr key={item.id || index} className={rowClassName}>
        {columns.map(column => (
          <td key={column} onClick={() => handleCellClick(item[column])}>
            {item[column]}
          </td>
        ))}
      </tr>
    );
  });

  // Add empty rows to reach the specified number
  for (let i = data.length; i < fillRows; i++) {
    rows.push(
      <tr key={`empty-${i}`}>
        {Array(columns.length).fill(<td>&nbsp;</td>)}
      </tr>
    );
  }

  return rows;
};
  
  export const parseTSV = (tsv) => {
    const lines = tsv.split('\n');
    const headers = lines[0].split('\t');
    return lines.slice(1).map((line, index) => {
      const values = line.split('\t');
      return headers.reduce((obj, header, idx) => {
        obj[header] = values[idx];
        return obj;
      }, { id: index + 1 }); // Adding an 'id' field
    });
  };
  