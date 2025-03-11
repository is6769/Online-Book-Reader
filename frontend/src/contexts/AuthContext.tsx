import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initKeycloak, default as keycloak } from '../config/keycloakInit';
import { KeycloakOnLoad } from 'keycloak-js';

interface User {
  id: string;
  username: string; // Changed from nickname
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  register: (username: string, email: string, password: string) => Promise<void>; // Changed parameter name
  logout: () => void;
  error: string | null;
}

interface MockUser extends User {
  password: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  }
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

const API_BASE_URL = 'http://localhost:8080/v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Keycloak once on mount using the cached promise
  useEffect(() => {
    initKeycloak()
      .then((authenticated) => {
        console.log('Keycloak initialized, authenticated:', authenticated);
        if (authenticated) {
          // Handle token from Keycloak
          const token = keycloak.token;
          const tokenParsed = keycloak.tokenParsed;
          if (token && tokenParsed) {
            const keycloakUser: User = {
              id: tokenParsed.sub ?? '',
              username: tokenParsed.preferred_username,
              email: tokenParsed.email
            };
            setUser(keycloakUser);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(keycloakUser));
          }
        }
      })
      .catch((err) => {
        console.error('Failed to initialize Keycloak', err);
      });
  }, []);

  const login = useCallback((): Promise<void> => {
    if (!keycloak.authenticated) {
      return keycloak.login();
    }
    return Promise.resolve();
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Changed from nickname
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      
      // Assuming the backend returns user data and a token
      const user = {
        id: userData.id,
        username: userData.username, // Changed from nickname
        email: userData.email
      };

      // Store the token if your backend provides one
      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }

      setUser(user);
      setError(null);
      localStorage.setItem('user', JSON.stringify(user));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout,
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
