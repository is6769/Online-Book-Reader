import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const { login, isAuthenticated, isInitialized } = useAuth();
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Store redirect location
  useEffect(() => {
    if (from && from !== '/login') {
      sessionStorage.setItem('authRedirect', from);
    }
  }, [from]);

  // Handle authentication state
  useEffect(() => {
    // Only proceed if Keycloak is initialized
    if (!isInitialized) return;
    
    // If already authenticated, redirect to target page
    if (isAuthenticated) {
      const redirectTo = sessionStorage.getItem('authRedirect') || '/';
      console.log("Already authenticated, redirecting to:", redirectTo);
      navigate(redirectTo, { replace: true });
      return;
    }

    // If not authenticated and we haven't attempted login yet, do it once
    if (!loginAttempted) {
      console.log("Not authenticated, attempting login");
      setLoginAttempted(true);
      login().catch(err => {
        console.error("Login failed:", err);
      });
    }
  }, [isAuthenticated, isInitialized, loginAttempted, login, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Redirecting to login...</h1>
        <p>Please wait while we redirect you to the login page.</p>
      </div>
    </div>
  );
};

export default LoginPage;
