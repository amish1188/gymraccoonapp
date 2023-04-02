import { Box, IconButton, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavigationBar = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const [locationTitle, setLocationTitle] = useState<string>('');

 const goBackHandler = () => {
  navigate(-1);
 };

 useEffect(() => {
  switch (location.pathname) {
   case '/':
    setLocationTitle('User page');
    break;
   case '/training':
    setLocationTitle('Your trainings');
    break;
   case '/current':
    setLocationTitle('Current training');
    break;
   default:
    setLocationTitle('Home');
  }
 }, [location.pathname]);

 return (
  <Box sx={{ flexGrow: 1 }}>
   <AppBar position='static'>
    <Toolbar>
     {location.pathname !== '/' && (
      <IconButton
       style={{ position: 'absolute', zIndex: '100' }}
       size='large'
       edge='start'
       color='inherit'
       aria-label='menu'
       sx={{ mr: 2 }}
       onClick={goBackHandler}
      >
       <ArrowBackIosRoundedIcon />
      </IconButton>
     )}
     <h3
      style={{
       position: 'absolute',
       fontWeight: '500',
       margin: 'auto',
       left: '0',
       width: '100%',
       zIndex: '0',
       textAlign: 'center'
      }}
     >
      {locationTitle}
     </h3>
    </Toolbar>
   </AppBar>
  </Box>
 );
};

export default NavigationBar;
