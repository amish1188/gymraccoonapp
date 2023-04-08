import {
 AuthenticatedTemplate,
 UnauthenticatedTemplate,
 useMsal
} from '@azure/msal-react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../auth/authConfig';

export const SignInButton = () => {
 const { instance } = useMsal();
 const handleLogin = async () => {
  await instance.loginRedirect(loginRequest).catch((e: any) => {
   console.log(e);
  });
 };
 return <Button onClick={handleLogin}>Sign in</Button>;
};

export const SignOutButton = () => {
 const { instance } = useMsal();
 const handlLogout = async () => {
  await instance
   .logoutRedirect({
    postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI
   })
   .catch((e: any) => {
    console.log(e);
   });
 };
 return <Button onClick={handlLogout}>Sign out</Button>;
};

export const UserPage = () => {
 const navigate = useNavigate();

 const redirectTo = (path: string) => {
  navigate(path);
 };
 return (
  <div>
   <AuthenticatedTemplate>
    <Grid
     style={{
      maxWidth: '700px',
      margin: 'auto',
      height: '100vh'
     }}
     container
     display='flex'
     justifyContent='center'
     alignItems='center'
     spacing={2}
     direction='column'
    >
     <Grid item>
      <Button
       style={{ width: '300px' }}
       onClick={() => redirectTo('/current')}
       variant='outlined'
      >
       Go to current plan
      </Button>
     </Grid>
     <Grid item>
      <Button
       style={{ width: '300px' }}
       onClick={() => redirectTo('/trainings')}
       variant='outlined'
      >
       See all plans
      </Button>
     </Grid>
     <Grid item>
      <SignOutButton />
     </Grid>
    </Grid>
   </AuthenticatedTemplate>
   <UnauthenticatedTemplate>
    <SignInButton />
   </UnauthenticatedTemplate>
  </div>
 );
};
