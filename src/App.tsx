import { MsalProvider, useIsAuthenticated } from '@azure/msal-react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from './auth/authConfig';

import { UserPage } from './Pages/UserPage';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import CurrentTraining from './Pages/CurrentTraining';
import ProtectedRoute from './Components/ProtectedRoute';
import NavigationBar from './Components/NavigationBar';

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false
  }
 }
});

const Trainings = () => <div>Trainings</div>;

const App = () => {
 const isAuth = useIsAuthenticated();

 return (
  <>
   <MsalProvider instance={msalInstance}>
    <QueryClientProvider client={queryClient}>
     <NavigationBar />
     <Routes>
      <Route path='/' element={<UserPage />} />
      <Route
       path='trainings'
       element={
        <ProtectedRoute isAuth={isAuth}>
         <Trainings />
        </ProtectedRoute>
       }
      />
      <Route path='current' element={<CurrentTraining />} />
      <Route path='*' element={<p>Not found</p>} />
     </Routes>
     <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
   </MsalProvider>
  </>
 );
};

export default App;
