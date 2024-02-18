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
            <div className="text one">R</div>
            <div className="text two">e</div>
            <div className="text three">c</div>
            <div className="text four">o</div>
            <div className="text five">n</div>
            <div className="text six">c</div>
            <div className="text seven">i</div>
            <div className="text eight">l</div>
            <div className="text nine">A</div>
            <div className="text ten">i</div>
        </div>
            <div className="navbar-buttons">
                <button onClick={() => setCurrentPage('ToolPage')}>ToolPage</button>
                <button onClick={() => setCurrentPage('About')}>About</button>
                
            </div>
        </nav>
    );
};

export default NavBar;
