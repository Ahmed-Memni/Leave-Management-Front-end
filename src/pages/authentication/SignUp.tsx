import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { rootPaths } from 'routes/paths';
import Image from 'components/base/Image';
import logoWithText from '/Logo-with-text.png';

const SignUp = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // New states
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');

  const handleSubmit = () => {
    // you can send birthdate, phone, school here as needed
    console.log({ birthdate, phone, school });
    navigate(`/${rootPaths.createProfRoot}`);
  };

  const sharedStyles = {
    '.MuiFilledInput-root': {
      bgcolor: 'grey.A100',
      ':hover': { bgcolor: 'background.default' },
      ':focus': { bgcolor: 'background.default' },
      ':focus-within': { bgcolor: 'background.default' },
    },
    borderRadius: 2,
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <>
      <Box component="figure" mb={5} mx="auto" textAlign="center">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={300} />
        </Link>
      </Box>
      <Paper sx={{ py: 6, px: { xs: 5, sm: 7.5 } }}>
        <Stack justifyContent="center" gap={5}>
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Create New Account
          </Typography>
          <Typography variant="h6" fontWeight={500} textAlign="center" color="text.primary">
            Have an account?{' '}
            <Link href="/authentication/login" underline="none">
              Log In
            </Link>
          </Typography>

          <TextField variant="filled" label="Name" type="text" sx={sharedStyles} />
          <TextField variant="filled" label="Email" type="email" sx={sharedStyles} />

          {/* New: Birthdate */}
          <TextField
            variant="filled"
            label="Date of Birth"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={sharedStyles}
          />

          {/* New: Phone */}
          <TextField
            variant="filled"
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={sharedStyles}
          />

          {/* New: School Name */}
          <TextField
            variant="filled"
            label="School Name"
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            sx={sharedStyles}
          />

          <TextField
            variant="filled"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            sx={sharedStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} size="small" edge="end" sx={{ mr: 2 }}>
                    <IconifyIcon
                      icon={showPassword ? 'el:eye-open' : 'el:eye-close'}
                      color={showPassword ? 'text.secondary' : 'text.primary'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="filled"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            sx={sharedStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfirmPassword} size="small" edge="end" sx={{ mr: 2 }}>
                    <IconifyIcon
                      icon={showConfirmPassword ? 'el:eye-open' : 'el:eye-close'}
                      color={showConfirmPassword ? 'text.secondary' : 'text.primary'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button onClick={handleSubmit} sx={{ fontWeight: 'fontWeightRegular' }}>
            Sign Up
          </Button>
          <Typography variant="body1" textAlign="center">
            By creating account, you agree to our{' '}
            <Link href="#!" underline="none">
              Terms of Service
            </Link>
          </Typography>
          <Divider />
          <Typography textAlign="center" color="text.secondary" variant="body1">
            Or sign in using:
          </Typography>
          <Stack gap={1.5} direction="row" justifyContent="space-between">
            <Button
              startIcon={<IconifyIcon icon="flat-color-icons:google" />}
              variant="outlined"
              fullWidth
              sx={{ fontSize: 'subtitle2.fontSize', fontWeight: 'fontWeightRegular' }}
            >
              Google
            </Button>
            <Button
              startIcon={<IconifyIcon icon="logos:facebook" />}
              variant="outlined"
              fullWidth
              sx={{ fontSize: 'subtitle2.fontSize', fontWeight: 'fontWeightRegular' }}
            >
              Facebook
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default SignUp;
