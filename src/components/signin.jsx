import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link'; // MUI Link
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Styled Components
const GlassCard = styled(MuiCard)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 450,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', // Full height for centering
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  background: theme.palette.background.default,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: alpha(theme.palette.common.white, 0.05),
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 12,
  background: alpha(theme.palette.common.white, 0.05),
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-select': {
    color: theme.palette.text.primary,
  },
}));

function SignIn() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+91');
  const [phoneError, setPhoneError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value) ? '' : 'Please enter a valid 10-digit phone number';
  };

  const validatePassword = (value) => {
    return value.length >= 6 ? '' : 'Password must be at least 6 characters';
  };

  const handlePhoneKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phoneValidation = validatePhoneNumber(phoneNumber);
    const passwordValidation = validatePassword(password);

    setPhoneError(phoneValidation);
    setPasswordError(passwordValidation);
    setFormError('');

    if (!phoneValidation && !passwordValidation) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const response = await axios.post(
          `${BASE_URL}/api/users/login`, // Backend URL
          {
            phone: fullPhoneNumber, // Matches backend expected field
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { access_token } = response.data; // Backend returns "access_token"
        localStorage.setItem('access_token', access_token);

        console.log('Sign-in successful:', { access_token });
        navigate('/'); // Redirect to home or dashboard
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data?.message || 'Invalid phone number or password';
          setFormError(errorMessage);
        } else {
          setFormError('Network error. Please check your connection.');
        }
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <GlassCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', textAlign: 'center', color: 'text.primary', fontWeight: 600 }}
          >
            Sign In
          </Typography>

          {formError && (
            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'error.main', mb: 2 }}
            >
              {formError}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ color: 'text.secondary' }}>Phone Number</FormLabel>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <StyledSelect
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  sx={{ width: '100px' }}
                >
                  <MenuItem value="+91">+91</MenuItem>
                  {/* Add more country codes if needed */}
                </StyledSelect>
                <StyledTextField
                  error={!!phoneError}
                  helperText={phoneError}
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  autoComplete="tel"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneError(validatePhoneNumber(e.target.value));
                  }}
                  inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]{10}' }}
                  onKeyPress={handlePhoneKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: 'text.secondary' }}>Password</FormLabel>
              <StyledTextField
                error={!!passwordError}
                helperText={passwordError}
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ color: 'text.secondary' }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 12,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                background: 'primary.main',
                '&:hover': {
                  background: 'primary.dark',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign In
            </Button>

            <Link
              href="#"
              variant="body2"
              sx={{ alignSelf: 'center', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Forgot your password?
            </Link>

            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Don’t have an account?{' '}
              <RouterLink
                to="/sign-up"
                style={{ color: '#007bff', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign Up
              </RouterLink>
            </Typography>
          </Box>
        </GlassCard>
      </SignInContainer>
    </>
  );
}

export default SignIn;