import { Box, IconButton, Menu, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuLinks from './MenuLinks';

const NavigationBar = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const [locationTitle, setLocationTitle] = useState<string>('');

 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  console.log('opened');
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };

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
   case '/exercises':
    setLocationTitle('Exercises');
    break;
   default:
    setLocationTitle('Home');
  }
 }, [location.pathname]);

 return (
  <Box sx={{ flexGrow: 1 }}>
   <AppBar position='static'>
    <Toolbar style={{ justifyContent: 'space-between' }}>
     {location.pathname !== '/' && (
      <IconButton
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
     <h3>{locationTitle}</h3>
     <div>
      <IconButton
       size='medium'
       color='inherit'
       aria-label='open drawer'
       sx={{ mr: 2 }}
       onClick={handleClick}
      >
       <MenuIcon />
      </IconButton>
      <Menu
       id='long-menu'
       MenuListProps={{
        'aria-labelledby': 'long-button'
       }}
       anchorEl={anchorEl}
       open={open}
       onClose={handleClose}
       PaperProps={{
        style: {
         width: '20ch'
        }
       }}
      >
       <MenuLinks handleClose={handleClose} />
      </Menu>
     </div>
    </Toolbar>
   </AppBar>
  </Box>
 );
};

export default NavigationBar;
