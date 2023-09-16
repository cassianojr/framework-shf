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
import Navbar from '../components/Navbar';
import { Toolbar } from '@mui/material';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


export default function SignUp() {

  const navigate = useNavigate();

  const { signed, createUserEmailPassword } = React.useContext(AuthenticationContext) as AuthenticationContextType;


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get('name')?.toString();
    if (!name) return alert('Name is required');

    const email = data.get('email')?.toString();
    if (!email) return alert('Email is required');

    const password = data.get('password')?.toString();
    if (!password) return alert('Password is required');

    const success = await createUserEmailPassword(email, password, name);
    if (!success) {
      alert('Error creating user');
    }
  };

  if (signed) navigate('/dashboard');

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="sign-in" variant="body2">
                  Already have an account? Sign in
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