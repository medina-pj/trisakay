import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// hooks
import useAuthContext from '../hooks/useAuthContext';
import useAdmin from '../hooks/useAdmin';

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAdmin();
  const { dispatch } = useAuthContext();

  const onLogout = async () => {
    try {
      const res = await logout();
      dispatch({ type: 'LOGOUT', payload: res });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ zIndex: 1400 }}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon onClick={() => toggleSidebar(prevState => !prevState)} />
          </IconButton>
          <Typography component='div' sx={{ flexGrow: 1 }}></Typography>
          <Button color='inherit' onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
