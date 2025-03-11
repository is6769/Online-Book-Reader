import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './LoginPage.css';

const Callback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized, isLoading } = useAuth();
  const [processed, setProcessed] = useState(false);
  
  useEffect(() => {
    // Wait for Keycloak initialization and authentication to complete
    if (processed || isLoading || !isInitialized) return;
    
    // Mark as processed to prevent multiple redirects
    setProcessed(true);
    
    // Get redirect URL from storage or default to home
    const redirectTo = sessionStorage.getItem('authRedirect') || '/';
    console.log("Callback - Auth complete, redirecting to:", redirectTo);
    
    // Clean up
    sessionStorage.removeItem('authRedirect');
    
    // Redirect
    navigate(redirectTo, { replace: true });
  }, [isAuthenticated, isInitialized, isLoading, navigate, processed]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Completing authentication...</h1>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Callback;
