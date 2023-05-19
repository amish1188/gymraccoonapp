import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
 handleClose: () => void;
}

const MenuLinks = ({ handleClose }: MenuItemProps) => {
 const navigate = useNavigate();

 return (
  <>
   <MenuItem
    onClick={() => {
     navigate('/exercises');
     handleClose();
    }}
   >
    Exercises
   </MenuItem>
   <MenuItem
    onClick={() => {
     navigate('/current');
     handleClose();
    }}
   >
    Current training
   </MenuItem>
  </>
 );
};

export default MenuLinks;
