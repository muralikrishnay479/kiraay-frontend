import React from 'react';
import { Box, createTheme, ThemeProvider, alpha } from '@mui/material';
import Products from './components/Products.jsx';
import Navbar from './components/navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Rightbar from './components/Rightbar.jsx';
import SignIn from './components/signin.jsx';
import SignUp from './components/SignUp.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Profile from './components/Profile.jsx'; // Imported Profile component
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';

// Theme Context
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#007bff',
          },
          ...(mode === 'light'
            ? {
                background: {
                  default: '#f0f2f5',
                  paper: 'rgba(255, 255, 255, 0.9)',
                },
                text: {
                  primary: '#333',
                  secondary: '#666',
                },
              }
            : {
                background: {
                  default: '#1a1a2e',
                  paper: 'rgba(26, 26, 46, 0.9)',
                },
                text: {
                  primary: '#fff',
                  secondary: '#bbb',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '100vh' }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/sidebar" element={<Sidebar />}>
                <Route path="profile" element={<Profile />} /> {/* Relative path */}
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;