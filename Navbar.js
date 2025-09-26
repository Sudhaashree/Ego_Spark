import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to leave?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🎆 EcoSpark</h1>
      <div className="nav-buttons">
        <Link className="nav-btn" to="/log">Log Crackers</Link>
        <Link className="nav-btn" to="/dashboard">Dashboard</Link>
        <Link className="nav-btn" to="/challenges">Challenges</Link>
        <Link className="nav-btn" to="/leaderboard">Leaderboard</Link>
        <Link className="nav-btn" to="/tips">Tips</Link>

        {/* Profile / Logout menu */}
        <div className="profile-menu">
          <button
            className="profile-icon"
            onClick={() => setShowMenu(!showMenu)}
          >
            👤
          </button>
          {showMenu && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
