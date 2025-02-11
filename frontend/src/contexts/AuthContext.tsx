import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  username: string; // Changed from nickname
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
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
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

const API_BASE_URL = 'http://localhost:8080/v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find user with matching credentials
      const mockUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!mockUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      setError(null);

      // Store user in localStorage (in real app, store JWT token instead)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
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
