import { AppBar, Box, Fab, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../store/authSlice';

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log('isLoggedIn', isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/dashboard', active: isLoggedIn },
    { name: 'About', path: '/about', active: true },
    { name: 'Services', path: '/services', active: true },
    { name: 'Login', path: '/login', active: !isLoggedIn },
    { name: 'Register', path: '/register', active: !isLoggedIn },
   
  ];

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  }

  return (
    <AppBar position="sticky" component="nav" color='transparent' >
      <Toolbar>
        
        <Typography
          variant="h6"
          component="div"
          sx={{  flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          MUI
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ul className="flex space-x-4">
          {navItems
            .filter((item) => item.active)
            .map((item) => (
              <Button
                key={item.name}
                sx={{ color: 'black' }}
                component={Link}
                to={item.path}
              >
                {item.name}
              </Button>
            ))}
            {isLoggedIn && (
              
                <Fab variant='extended' size="small" color="success" aria-label="add" component="button" onClick={handleLogout}>
                Logout
                <LogoutIcon />
             </Fab>
        )
              }</ul>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
