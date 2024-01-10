import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import React from "react";
import { Button, Link, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EcosystemService from '../services/EcosystemService';
import { Ecosystem } from '../types/Ecosystem.type';
import { useTranslation } from "react-i18next";
import NewProjectModal from '../components/Dashboard/NewProjectModal';

const btnStyle = {
  p: 1.5
}

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [userEcos, setUserEcos] = React.useState([] as Ecosystem[]);
  const [addEcosModalState, setAddEcosModalState] = React.useState(false);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const user = getUser();

  React.useEffect(() => {

    if (loading) return;

    if (!signed) navigate('/sign-in');
    if (signed) setAppLoading(false);

    EcosystemService.getEcosystems(user.uid, (ecos) => {
      setUserEcos(ecos);
    });

  }, [signed, navigate, loading, user.uid]);

  return (
    !appLoading &&
    <>
      <NewProjectModal user={user} setState={setAddEcosModalState} state={addEcosModalState} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppbar displayName={user.displayName} handleSignOut={signOutFromApp} photoURL={user.photoURL} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '79vh' }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '75vh',
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    {userEcos.map((ecos) => {
                      return (
                        <Button component={Link} variant='outlined' key={ecos.id} href={`/ecos-dashboard/${ecos.id}`} sx={btnStyle}>{ecos.organization_name}</Button>
                      );
                    })}

                    <Button variant='contained' onClick={() => setAddEcosModalState(true)} sx={btnStyle}><AddIcon /> {t('add_ecos_btn')}</Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </Box>
    </>
  );
}