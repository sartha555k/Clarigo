import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="header-brand">Clarigo Dashboard</Link>
      <nav className="header-nav">
        {user ? (
          <>
            <div className="user-badge">
              <span>{user.name}</span>
              <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
