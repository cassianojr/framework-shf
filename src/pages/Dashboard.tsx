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
import { Button, Divider, Link, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '../components/Modal';
import EcosystemService from '../services/EcosystemService';
import { Ecosystem } from '../types/Ecosystem.type';

const btnStyle = {
  p: 1.5
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [addEcosModalState, setAddEcosModalState] = React.useState(false);
  const [userEcos, setUserEcos] = React.useState([] as Ecosystem[]);

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

  const handleAddEcosSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const organization_name = e.currentTarget.orgName.value as string;
    const ecosystem = {
      organization_name,
      admin_id: user.uid,
      responses: 0,
    } as Ecosystem;

    setAddEcosModalState(false);
    EcosystemService.createEcosystem(ecosystem, (ecos) => {
      navigate(`/ecos-dashboard/${ecos.id}`);
    }, () => {
      console.log('error');
    });
  }

  const AddNewEcosModal = () => {
    return (
      <Modal.Root state={addEcosModalState} id="addNewEcos" title="Add new ECOS" handleClose={() => setAddEcosModalState(false)}>
        <form onSubmit={handleAddEcosSubmit}>
          <Modal.Text>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <Typography>
                  The parsing function can be very useful for instantiating your custom version of the framework.
                  Allowing you to select which factors appear in your organization, suggesting new factors and
                  mainly correlating barriers to improvement with social human factors. Adding a new perspective on your organization's SHFs.
                </Typography>
                <Typography>
                  To start, please type the name of your organization:
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <TextField
                  fullWidth
                  required
                  id="orgName"
                  name="orgName"
                  label="Organization Name"
                  autoFocus
                />
              </Grid>

            </Grid>
          </Modal.Text>
          <Divider />
          <Modal.Actions handleClose={() => setAddEcosModalState(false)}>
            <Button variant="contained" type="submit"><AddIcon /> Add new ECOS</Button>
            <Button variant="outlined" onClick={() => setAddEcosModalState(false)}>Cancel</Button>
          </Modal.Actions>
        </form>
      </Modal.Root >
    );
  }

  return (
    !appLoading &&
    <>
      <AddNewEcosModal />
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

                    <Button variant='contained' onClick={() => setAddEcosModalState(true)} sx={btnStyle}><AddIcon /> Add new ECOS</Button>
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