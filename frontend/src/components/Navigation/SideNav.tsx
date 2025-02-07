import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import './SideNav.css';

const SideNav = () => {
  const { user } = useAuth();
  const { isMenuOpen, closeMenu } = useMenu();
  const location = useLocation();

  return (
    <>
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <nav className="nav-list">
          <div className="nav-section">
            <h3 className="section-title">Menu</h3>
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <i className='bx bx-home'></i>
              <span>Home</span>
            </Link>
            <Link to="/library" className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}>
              <i className='bx bx-library'></i>
              <span>Library</span>
            </Link>
            {user && (
              <>
                <Link to="/original-works" className={`nav-item ${location.pathname === '/original-works' ? 'active' : ''}`}>
                  <i className='bx bx-pen'></i>
                  <span>Original Works</span>
                </Link>
                <Link to="/collections" className={`nav-item ${location.pathname === '/collections' ? 'active' : ''}`}>
                  <i className='bx bx-collection'></i>
                  <span>My Collections</span>
                </Link>
                <Link to="/reading-lists" className={`nav-item ${location.pathname === '/reading-lists' ? 'active' : ''}`}>
                  <i className='bx bx-list-ul'></i>
                  <span>Reading Lists</span>
                </Link>
                <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                  <i className='bx bx-user'></i>
                  <span>Profile</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu} />}
    </>
  );
};

export default SideNav;
