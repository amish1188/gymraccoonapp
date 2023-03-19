import {
 AuthenticatedTemplate,
 UnauthenticatedTemplate,
 MsalProvider
} from '@azure/msal-react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from './auth/authConfig';

import { Home, SignInButton } from './Pages/Home';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

const App = () => {
 return (
  <>
   <MsalProvider instance={msalInstance}>
    <QueryClientProvider client={queryClient}>
     <Home />
     <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
   </MsalProvider>
  </>
 );
};

/* <UnauthenticatedTemplate>
     <SignInButton />
     <div>You need to login</div>
    </UnauthenticatedTemplate> */

export default App;
