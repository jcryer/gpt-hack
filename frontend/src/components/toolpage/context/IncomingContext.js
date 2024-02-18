import React, { createContext, useContext, useState } from 'react';

const FileDataContext = createContext();

export const useFileData = () => useContext(FileDataContext);

export const FileDataProvider = ({ children }) => {
  const [tsvData, setTsvData] = useState(null);

  return (
    <FileDataContext.Provider value={{ tsvData, setTsvData }}>
      {children}
    </FileDataContext.Provider>
  );
};
export { FileDataContext };