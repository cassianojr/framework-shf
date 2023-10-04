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
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  
  const { t } = useTranslation('sign_up');

  const navigate = useNavigate();

  const { signed, createUserEmailPassword, signInGoogle, signInEmailPassword } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get('redirect');

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
      return;
    }

    signInEmailPassword(email, password).then((success) => {
      if (!success) {
        alert('Error signing in');
        return;
      }
      navigate((!redirect)?'/dashboard':redirect);
    });

  };

  React.useEffect(() => {
    if (signed) navigate((!redirect)?'/dashboard':redirect);
  }, [signed, navigate, redirect]);


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
            {t('title')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label={t('name_field')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t('email_field')}
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
                  label={t('password_field')}
                  type="password"
                  id="password"
                  inputProps={{"minLength":6}}
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
             {t('sign_up_button')}
            </Button>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={signInGoogle}>
              <GoogleIcon sx={{ mr: 1 }} />
              {t('google_button')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="sign-in" variant="body2">
                  {t('sign_in_link')}
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