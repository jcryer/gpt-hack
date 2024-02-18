import React, { createContext, useContext, useState } from 'react';

const OutgoingContext = createContext();

export const useOutgoing = () => useContext(OutgoingContext);

export const OutgoingProvider = ({ children }) => {
  // Assuming you want to manage outgoing file data or similar
  const [outgoingData, setOutgoingData] = useState(null);

  return (
    <OutgoingContext.Provider value={{ outgoingData, setOutgoingData }}>
      {children}
    </OutgoingContext.Provider>
  );
};

export { OutgoingContext };
