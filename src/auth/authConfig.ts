export const msalConfig = {
 auth: {
  clientId: process.env.REACT_APP_CLIENT_ID as string,
  authority: process.env.REACT_APP_AUTHORITY as string,
  redirectUri: 'http://localhost:3000'
 },
 cache: {
  cacheLocation: 'sessionStorage', // This configures where your cache will be stored
  storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
 }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ['User.Read']
};

// process.env.REDIRECT_URI = 'https://green-field-062c7d403.2.azurestaticapps.net'
// process.env.REDIRECT_URI = 'localhost:3000'
