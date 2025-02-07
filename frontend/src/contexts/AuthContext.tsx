import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  nickname: string; // Changed from name
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nickname: string, email: string, password: string) => Promise<void>; // Changed parameter name
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
});

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    nickname: 'John Doe',
    email: 'user@example.com',
    password: 'user123', // In real app, passwords would be hashed
    role: 'user'
  },
  {
    id: '2',
    nickname: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '3',
    nickname: 'Test User',
    email: 'test@example.com',
    password: 'test123',
    role: 'user'
  }
];

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

  const register = useCallback(async (nickname: string, email: string, password: string) => {
    try {
      // Here you would normally make an API call to your backend
      // For now, we'll simulate a successful registration
      const mockUser = {
        id: '1',
        nickname: nickname, // Changed from name
        email: email
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setError(null);
      // Store auth token in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Registration failed');
      throw new Error('Registration failed');
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
