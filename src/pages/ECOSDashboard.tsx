import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import React from "react";
import { Button, Link, Typography, } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Chart from '../components/Dashboard/Chart';
import SnackBarComponent from '../components/SnackBarComponent';
import EcosystemService from '../services/EcosystemService';
import { Ecosystem } from '../types/Ecosystem.type';

export default function ECOSDashboard() {
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [copySnackBarState, setCopySnackBarState] = React.useState(false);
  const [ecos, setEcos] = React.useState({} as Ecosystem);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const ecosId = useParams().ecosId;

  const user = getUser();

  const frameworkLink = `${window.location.origin}/ecos-survey/${ecosId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(frameworkLink);
    setCopySnackBarState(true);
  }

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate('/sign-in');
    if (signed) setAppLoading(false);

    EcosystemService.getEcosystem(ecosId??"", (ecos) => {
      if(ecos.admin_id !== user.uid) navigate('/');
      setEcos(ecos);
    });

  }, [signed, navigate, loading, user.uid, ecosId]);

  return (
    !appLoading &&
    <>
      <SnackBarComponent snackBarState={copySnackBarState} setSnackBarState={setCopySnackBarState} text='Link Copied' severity='success' />
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
            <Typography variant='h4' align='center' mb={3}>{ecos.organization_name}</Typography>
            <Grid container spacing={3}>
              <Grid item sm={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{ fontWeight: 'bold' }}>ECOS Link: <Link href={frameworkLink} target='_blank'>{frameworkLink}</Link></Typography>
                  <Button variant='outlined' startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>Copy Link</Button>
                </Paper>
              </Grid>

              <Grid item sm={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Responses: {ecos.responses}</Typography>
                </Paper>
              </Grid>
              <Grid item lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '240px',
                  }}
                >
                  <Chart />
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