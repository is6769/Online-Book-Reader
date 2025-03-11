import Keycloak from 'keycloak-js';

// Create Keycloak instance with explicit redirectUri
const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'react-frontend',
  clientId: 'react-frontend'
});

// Configure initialization options
export const keycloakInitOptions = {
  onLoad: 'check-sso' as const,
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  pkceMethod: 'S256' as const,
  checkLoginIframe: false,
  enableLogging: true, // Enable logging for debugging
  redirectUri: window.location.origin + '/callback' // Explicitly set redirect URI
};

export default keycloak;
