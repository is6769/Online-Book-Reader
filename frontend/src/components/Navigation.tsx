import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useMenu } from '../contexts/MenuContext';
import '../styles/Navigation.css';

function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleMenu, isMenuOpen } = useMenu();

  return (
    <nav className="navbar">
      <div className="nav-section nav-left">
        <button 
          className="nav-icon-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
        <Link to="/" className="nav-icon-btn">
          <i className='bx bx-book-reader'></i>
          <span>BookReader</span>
        </Link>
        <Link to="/library" className="nav-link">
          Library
        </Link>
      </div>

      <div className="nav-section nav-right">
        {isAuthenticated && user ? (
          <>
            <Link to="/profile" className="nav-link">
              {user.username}
            </Link>
            <button onClick={logout} className="nav-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link login-button">
            Login
          </Link>
        )}

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
