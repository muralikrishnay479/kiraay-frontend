import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../App.jsx';
import { TextField } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account','Wishlist', 'Rents','Notifications','Addresses', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25), border: '1px solid #007bff' },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: { width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: { width: '14ch', '&:focus': { width: '22ch' } },
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('access_token');

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === 'Products') {
      navigate('/products');
    } else if (page === 'Pricing') {
      navigate('/pricing');
    } else if (page === 'Blog') {
      navigate('/blog');
    }
  };


  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Profile') {
      navigate('/sidebar/profile'); // Absolute path
    } else if (setting === 'Account') {
      navigate('/account');
    } else if (setting === 'Dashboard') {
      navigate('/dashboard');
    } else if (setting === 'Logout') {
      handleLogout();
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    setAnchorElUser(null);
    navigate('/sign-in');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(26, 26, 46, 0.1)',
        backdropFilter: 'blur(12px)',
        borderBottom: (theme) =>
          `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 600,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '.1rem',
              '&:hover': { color: '#007bff', transition: 'color 0.3s ease' },
            }}
          >
            GLASSY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'background.paper',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center" sx={{ color: 'text.primary' }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 600,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '.1rem',
            }}
          >
            GLASSY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  color: 'text.primary',
                  display: 'block',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  mx: 1,
                  '&:hover': {
                    color: '#007bff',
                    transform: 'translateY(-1px)',
                    background: 'none',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: 'text.primary' }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Tooltip
            title={theme.palette.mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary', ml: 2 }}>
              {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 0, ml: 2, display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="User settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
                    <Avatar
                      alt="User"
                      src="/static/images/avatar/2.jpg"
                      sx={{
                        width: 36,
                        height: 36,
                        border: (theme) =>
                          `2px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                      background: 'background.paper',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={() => handleCloseUserMenu(null)}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center" sx={{ color: 'text.primary' }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/sign-in"
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { color: '#007bff', background: 'none' },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;