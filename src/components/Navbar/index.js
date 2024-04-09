import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#D3D3D3' }}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>MovieDB</Link>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/" className="navbar-link">Popular</Link>
            </li>
            <li>
              <Link to="/top-rated" className="navbar-link">Top Rated</Link>
            </li>
            <li>
              <Link to="/upcoming" className="navbar-link">Upcoming</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Movie Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
