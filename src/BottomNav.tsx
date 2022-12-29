import React from 'react';
import './BottomNav.css';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <nav className="wrapper">
      <div>
        <Link to="/record" className="nav-link">
          기록 <br></br>record
        </Link>
      </div>
      <div>
        <Link to="/statistics" className="nav-link">
          통계<br></br>statistics
        </Link>
      </div>
      <div>
        <Link to="/settings" className="nav-link">
          설정 <br></br>settings
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
