// tableUtils.js

export const createTableRows = (data, handleRowClick, columns, fillRows = 100) => {
  const rows = data.map((item, index) => {

    return (
      <tr className={item.invoice ? 'matched' : 'unmatched'} key={item.id || index} onClick={() => handleRowClick(item)}>
        {columns.map(column => (
          <td key={column}>
            {column === 'totalAmount' ? item[column].toFixed(2) : item[column]}
          </td>
        ))}
      </tr>
    );
  });

  // Add empty rows to reach the specified number
  for (let i = data.length; i < fillRows; i++) {
    rows.push(
      <tr key={`empty-${i}`}>
        {columns.map((x, i) => (<td key={`td-${i}`}>&nbsp;</td>))}
      </tr>
    );
  }

  return rows;
};
  