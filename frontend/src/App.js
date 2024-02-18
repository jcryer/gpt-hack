import React, { useState } from 'react';
import ToolPage from './components/toolpage/ToolPage';
import About from './components/about/About';
import './App.css';
import NavBar from './components/navbar/NavBar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('ToolPage');

  const renderPage = () => {
    switch (currentPage) {
      case 'ToolPage':
        return <ToolPage />;
      case 'About':
        return <About />;
      
      default:
        return <ToolPage />;
    }
  };

  return (
    <div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
