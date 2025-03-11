import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import keycloak, { keycloakInitOptions } from '../config/keycloak';

// Define user type based on Keycloak token info
interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

// Define the shape of our authentication context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {}
});

// Let's track initialization to prevent multiple init calls
let keycloakInitPromise: Promise<boolean> | null = null;

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Extract user information from Keycloak token
  const updateUserInfo = useCallback(() => {
    console.log("Updating user info, authenticated:", keycloak.authenticated);
    if (keycloak.authenticated && keycloak.tokenParsed) {
      console.log("Token parsed:", keycloak.tokenParsed);
      const keycloakUser: User = {
        id: keycloak.subject || '',
        username: keycloak.tokenParsed.preferred_username || '',
        email: keycloak.tokenParsed.email || '',
        roles: keycloak.tokenParsed.realm_access?.roles || []
      };
      console.log("Setting user:", keycloakUser);
      setUser(keycloakUser);
    } else {
      setUser(null);
    }
  }, []);

  // Initialize Keycloak
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        setIsLoading(true);
        console.log("Starting Keycloak initialization");

        if (!keycloakInitPromise) {
          console.log("Creating new init promise with options:", keycloakInitOptions);
          keycloakInitPromise = keycloak.init(keycloakInitOptions);
        } else {
          console.log("Using existing init promise");
        }

        const authenticated = await keycloakInitPromise;
        console.log("Keycloak initialized, authenticated:", authenticated);

        // Set up token refresh
        keycloak.onTokenExpired = () => {
          console.log("Token expired, refreshing");
          keycloak.updateToken(70)
            .then(refreshed => {
              console.log("Token refreshed:", refreshed);
              if (refreshed) {
                updateUserInfo();
              }
            })
            .catch(err => {
              console.error("Failed to refresh token", err);
              setError("Session expired. Please login again.");
              setUser(null);
            });
        };

        updateUserInfo();
        setIsInitialized(true);
      } catch (err) {
        console.error("Error initializing Keycloak:", err);
        setError("Authentication service initialization failed");
      } finally {
        setIsLoading(false);
      }
    };

    initializeKeycloak();
  }, [updateUserInfo]);

  // Handle login - redirect to Keycloak login page
  const login = useCallback(async (): Promise<void> => {
    console.log("Login called, redirecting to Keycloak login");
    return keycloak.login({
      redirectUri: window.location.origin + '/callback'
    });
  }, []);

  // Handle register - redirect to Keycloak registration page
  const register = useCallback(async (): Promise<void> => {
    console.log("Register called, redirecting to Keycloak register");
    return keycloak.register({
      redirectUri: window.location.origin + '/callback'
    });
  }, []);

  // Handle logout - clear local user and redirect to Keycloak logout
  const logout = useCallback(async (): Promise<void> => {
    console.log("Logout called, redirecting to Keycloak logout");
    setUser(null);
    return keycloak.logout({
      redirectUri: window.location.origin
    });
  }, []);

  // Create context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!keycloak.authenticated && !!user,
    isInitialized,
    isLoading,
    error,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export hook for easy context consumption
export const useAuth = () => useContext(AuthContext);
