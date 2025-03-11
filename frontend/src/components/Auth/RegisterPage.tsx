import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const RegisterPage = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
    
    // Redirect to Keycloak registration
    register();
  }, [isAuthenticated, register, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Redirecting to registration...</h1>
      </div>
    </div>
  );
};

export default RegisterPage;
