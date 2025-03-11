import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  // Ensure the URL is correct, spelled "keycloak" and accessible.
  url: 'http://localhost:8080',  // Update if your Keycloak server URL differs
  realm: 'react-frontend',            // Confirm this realm exists on your Keycloak server
  clientId: 'react-frontend'          // Confirm this clientId is properly configured in Keycloak
});
export { keycloak };
