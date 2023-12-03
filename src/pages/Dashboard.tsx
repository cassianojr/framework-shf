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
import { Button, Divider, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '../components/Modal';
import EcosystemService from '../services/EcosystemService';
import { Ecosystem } from '../types/Ecosystem.type';
import { useTranslation } from "react-i18next";

const btnStyle = {
  p: 1.5
}

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
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
    const time_window = e.currentTarget.time_window.value as number;
    
    const ecosystem = {
      organization_name,
      admin_id: user.uid,
      responses: 0,
      time_window,
    } as Ecosystem;

    setAddEcosModalState(false);
    EcosystemService.createEcosystem(ecosystem, (ecos) => {
      navigate(`/ecos-dashboard/${ecos.id}`);
    }, () => {
      console.log('error');
    });
  }

  const NewProjectModal = () => {

    const [timeWindow, setTimeWindow] = React.useState('1');

    return (
      <Modal.Root state={addEcosModalState} id="addNewEcos" title={t('add_ecos_btn')} handleClose={() => setAddEcosModalState(false)}>
        <form onSubmit={handleAddEcosSubmit}>
          <Modal.Text>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <Typography>
                  {t('modal_text.txt1')}
                </Typography>
                <Typography>
                  {t('modal_text.txt2')}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <TextField
                  fullWidth
                  required
                  id="orgName"
                  name="orgName"
                  label={t('modal_text.label_name')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>

                <FormControl>
                  <FormLabel id="time-window-label">Quanto tempo os participantes terão para responder o questionário?</FormLabel>
                  <FormLabel id="time-window-label-1">Esse tempo varia dependendo da quantidade de pessoas, mais participantes significa mais tempo para a resposta.</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="time-window-label"
                    name="time_window"
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1 Semana" />
                    <FormControlLabel value="2" control={<Radio />} label="2 Semanas" />
                    <FormControlLabel value="3" control={<Radio />} label="3 Semanas" />
                  </RadioGroup>
                </FormControl>

              </Grid>
            </Grid>

          </Modal.Text>
          <Divider />
          <Modal.Actions handleClose={() => setAddEcosModalState(false)}>
            <Button variant="contained" type="submit"><AddIcon /> {t('add_ecos_btn')}</Button>
            <Button variant="outlined" onClick={() => setAddEcosModalState(false)}>{t('modal_text.cancel_btn')}</Button>
          </Modal.Actions>
        </form>
      </Modal.Root >
    );
  }

  return (
    !appLoading &&
    <>
      <NewProjectModal />
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