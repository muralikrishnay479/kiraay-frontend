import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://kiraay-backend.onrender.com";

// Styled Components
const GlassCard = styled(MuiCard)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(12px)",
  border: `1px solid ${
    theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"
  }`,
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderRadius: 16,
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 450,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh", // Changed to full height for consistency with SignIn
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  background: theme.palette.background.default,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: alpha(theme.palette.common.white, 0.05),
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 12,
  background: alpha(theme.palette.common.white, 0.05),
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiSelect-select": {
    color: theme.palette.text.primary,
  },
}));

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+91");
  const [fullNameError, setFullNameError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // Added loading state

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation Functions
  const validateFullName = (value) => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(value) ? "" : "Full name must be at least 2 letters (no numbers)";
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/; // Stricter validation for exactly 10 digits
    return phoneRegex.test(value) ? "" : "Phone number must be exactly 10 digits";
  };

  const validatePassword = (value) => {
    return value.length >= 6 ? "" : "Password must be at least 6 characters";
  };

  const validateConfirmPassword = (value, pass) => {
    return value === pass ? "" : "Passwords do not match";
  };

  // Real-time validation
  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setFullNameError(validateFullName(value));
  };

  const handlePhoneKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneError(validatePhoneNumber(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, password));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullNameValidation = validateFullName(fullName);
    const phoneValidation = validatePhoneNumber(phoneNumber);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password);

    setFullNameError(fullNameValidation);
    setPhoneError(phoneValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);
    setFormError("");

    if (
      !fullNameValidation &&
      !phoneValidation &&
      !passwordValidation &&
      !confirmPasswordValidation &&
      agreeTerms
    ) {
      setIsLoading(true);
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const response = await axios.post(
          `${BASE_URL}/api/users/register`, // Updated to match your backend route
          {
            username: fullName, // Matches backend registerUser field
            phone: fullPhoneNumber, // Matches backend registerUser field
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Sign-up successful:", response.data);
        navigate("/sign-in"); // Redirect to sign-in page
      } catch (error) {
        let errorMessage = "Sign-up failed. Please try again.";
        if (error.response) {
          if (error.response.status === 400 && error.response.data?.message === "User already registered!") {
            errorMessage = "An account with this phone number already exists.";
          } else {
            errorMessage = error.response.data?.message || errorMessage;
          }
        } else {
          errorMessage = "Network error. Please check your connection.";
        }
        setFormError(errorMessage);
        console.error("Sign-up error:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (!agreeTerms) {
      setFormError("Please agree to the terms and conditions.");
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <GlassCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Typography>

          {formError && (
            <Typography variant="body2" align="center" sx={{ color: "error.main", mb: 2 }}>
              {formError}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel sx={{ color: "text.secondary" }}>Full Name</FormLabel>
              <StyledTextField
                error={!!fullNameError}
                helperText={fullNameError}
                id="full-name"
                name="full-name"
                placeholder="John Doe"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={fullName}
                onChange={handleFullNameChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: "text.secondary" }}>Phone Number</FormLabel>
              <Box sx={{ display: "flex", gap: 2 }}>
                <StyledSelect
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  sx={{ width: "100px" }}
                >
                  <MenuItem value="+91">+91</MenuItem>
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+44">+44</MenuItem>
                </StyledSelect>
                <StyledTextField
                  error={!!phoneError}
                  helperText={phoneError}
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  autoComplete="tel"
                  required
                  fullWidth
                  variant="outlined"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    maxLength: 10,
                    inputMode: "numeric",
                    pattern: "[0-9]{10}",
                  }}
                  onKeyPress={handlePhoneKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: "text.secondary" }} /> {/* Fixed typo */}
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: "text.secondary" }}>Password</FormLabel>
              <StyledTextField
                error={!!passwordError}
                helperText={passwordError}
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{ color: "text.secondary" }}>Confirm Password</FormLabel>
              <StyledTextField
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                name="confirm-password"
                placeholder="••••••"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  value="agree"
                  color="primary"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              }
              label={
                <Typography sx={{ color: "text.secondary" }}>
                  I agree to the{" "}
                  <Link
                    href="#"
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading} // Disable button while loading
              sx={{
                py: 1.5,
                borderRadius: 12,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                background: "primary.main",
                "&:hover": {
                  background: "primary.dark",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <Typography align="center" sx={{ color: "text.secondary" }}>
              Already have an account?{" "}
              <RouterLink
                to="/sign-in"
                style={{ color: "#007bff", textDecoration: "none" }}
                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Sign In
              </RouterLink>
            </Typography>
          </Box>
        </GlassCard>
      </SignUpContainer>
    </>
  );
}

export default SignUp;