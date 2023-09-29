import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import Footer from '../components/Footer';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignIn() {

  const navigate = useNavigate();

  const { signed, signInEmailPassword, signInGoogle } = React.useContext(AuthenticationContext) as AuthenticationContextType;


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString();
    if (!email) return alert('Email is required');

    const password = data.get('password')?.toString();
    if (!password) return alert('Password is required');

    const success = await signInEmailPassword(email, password);
    if (!success) {
      alert('Error signing in');
    }

    navigate('/dashboard');

  };

  React.useEffect(() => {
    if (signed) navigate('/dashboard');
  }, [signed, navigate]);


  return (
    <>
      <Navbar />
      <Toolbar />
      <Container component="main" maxWidth="xs" style={{marginBottom:'1rem', height:'75vh'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type='email'
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={signInGoogle}>
              <GoogleIcon sx={{ mr: 1 }} />
              Sign In with Google
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="sign-up" variant="body2">
                Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}