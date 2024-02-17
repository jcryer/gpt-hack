import React, { useEffect } from 'react';
import './NavBar.css';
import animateTitle from './animateTitle';

const NavBar = ({currentPage, setCurrentPage}) => {
    useEffect(() => {
        animateTitle();
      }, []);
    
    return (
        <nav>
            <div className="navbar-brand">
            <div className="text one">L</div>
            <div className="text two">y</div>
            <div className="text three">n</div>
            <div className="text four">k</div>
            <div className="text five">S</div>
            <div className="text six">i</div>
            <div className="text one">n</div>
            <div className="text two">c</div>
            
        </div>
            <div className="navbar-buttons">
                <button onClick={() => setCurrentPage('ToolPage')}>ToolPage</button>
                <button onClick={() => setCurrentPage('About')}>About</button>
                
            </div>
        </nav>
    );
};

export default NavBar;
