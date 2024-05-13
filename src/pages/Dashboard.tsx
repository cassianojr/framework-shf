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
import { useTranslation } from "react-i18next";
import NewProjectModal from '../components/Dashboard/NewProjectModal';
import { FirebaseService } from '../services/FirebaseService';
import { Framework } from '../types/Framework.type';
import { EcosProject } from '../types/EcosProject.type';
import EcosProjectService from '../services/EcosProjectService';
import i18next from 'i18next';

const btnStyle = {
  p: 1.5
}

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [userEcos, setUserEcos] = React.useState([] as EcosProject[]);
  const [addEcosModalState, setAddEcosModalState] = React.useState(false);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const user = getUser();
  const [frameworkData, setFrameworkData] = React.useState([] as Framework[]);

  React.useEffect(() => {

    if (loading) return;

    if (!signed) navigate('/sign-in');
    if (signed) setAppLoading(false);

    EcosProjectService.getEcosProjects(user.uid, (ecos) => {
      setUserEcos(ecos);
    });

    const sortFrameworkItems = (data: Framework[]) => {
      data.forEach((item) => {
        item.items.sort((a, b) => (a.names[i18next.language] < b.names[i18next.language]) ? -1 : 1)
      })
      
      return data;
    }

    const getFrameworkData = async () => {
      const localStorageData = localStorage.getItem('frameworkData');

      if (localStorageData) {
        if (frameworkData.length === 0) {
          const newData = sortFrameworkItems(JSON.parse(localStorageData) as Framework[]);
          
          setFrameworkData(newData)
        }
        return;
      }

      FirebaseService.getFrameworkData((data: Framework[]) => {
        localStorage.setItem('frameworkData', JSON.stringify(data));
        if (frameworkData.length === 0) {
          const newData = sortFrameworkItems(data);

          setFrameworkData(newData)
        }
      });
    }

    getFrameworkData();

  }, [signed, navigate, loading, user.uid, frameworkData, setFrameworkData]);

  return (
    !appLoading &&
    <>
      <NewProjectModal frameworkData={frameworkData} user={user} setState={setAddEcosModalState} state={addEcosModalState} />
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
                        <Button component={Link} variant='outlined' key={ecos.id} href={`/ecos-dashboard/${ecos.id}`} sx={btnStyle}>{ecos.name}</Button>
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