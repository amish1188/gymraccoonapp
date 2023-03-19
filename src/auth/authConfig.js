export const msalConfig = {
 auth: {
  clientId: '1813dd11-14f3-4fd3-a309-f3f0d78ce825',
  authority:
   'https://login.microsoftonline.com/3c8fef4a-d209-45a9-9810-18c2004dbb0d',
  redirectUri: 'https://green-field-062c7d403.2.azurestaticapps.net'
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
