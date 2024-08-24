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
import { Button, Divider, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import NewProjectModal from '../components/Dashboard/NewProjectModal';
import { FirebaseService } from '../services/FirebaseService';
import { Framework } from '../types/Framework.type';
import { EcosProject } from '../types/EcosProject.type';
import EcosProjectService from '../services/EcosProjectService';
import i18next from 'i18next';
import EcosCard from '../components/Dashboard/EcosCard';
import { QuestionService } from '../services/QuestionService';

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
      
      const promises = ecos.map(async (ecos) => {

        if(ecos.id === undefined) return;

        try{
          const answers = await QuestionService.getEcosAnswers(ecos.id);
          
          ecos.answers = answers.length;
        }catch(e){
          ecos.answers = 0;
        }
      });
      
      Promise.all(promises).then(() => {
        setUserEcos(ecos);
      });
      
    });

    const sortFrameworkItems = (data: Framework[]) => {
      data.forEach((item) => {
        item.items.sort((a, b) => (a.names[i18next.language].localeCompare(b.names[i18next.language])));
      })

      return data;
    }

    const getFrameworkData = async () => {
      const localStorageData = localStorage.getItem('frameworkData');

      if (localStorageData) {
        if (frameworkData.length === 0) {
          const sortedData = sortFrameworkItems(JSON.parse(localStorageData) as Framework[]);

          setFrameworkData(sortedData)
        }
        return;
      }

      FirebaseService.getFrameworkData((data: Framework[]) => {
        localStorage.setItem('frameworkData', JSON.stringify(data));
        if (frameworkData.length === 0) {
          const sortedData = sortFrameworkItems(data);

          setFrameworkData(sortedData)
        }
      });
    }

    getFrameworkData();

  }, [signed, navigate, loading, user.uid, frameworkData, setFrameworkData]);

  return (
    !appLoading &&
    <>
      {frameworkData.length!==0&&<NewProjectModal frameworkData={frameworkData} user={user} setState={setAddEcosModalState} state={addEcosModalState} />}
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
                  <Grid container spacing={3} justifyContent={'space-between'}>
                    <Grid item xs sx={{ display: 'flex' }} >
                      <Typography component="h1" sx={{ fontSize: '1.5rem' }} variant="h6" color="primary" gutterBottom>{t('my_searchs')}</Typography>
                    </Grid>
                    <Grid item xs sx={{ display: 'flex' }} justifyContent={'flex-end'}>
                      <Button variant='contained' onClick={() => setAddEcosModalState(true)} sx={btnStyle}><AddIcon /> {t('add_ecos_btn')}</Button>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                  <Grid container spacing={2} alignItems={'stretch'} mt={1}>
                    {userEcos.map((ecos) => {
                      return ((ecos.id)  &&
                        <Grid key={ecos.id} item xs sx={{ display: 'flex' }}>
                          <EcosCard ecosName={ecos.name} ecosStatus={ecos.status} ecosId={ecos.id} ecosAnswers={ecos.answers} endDate={ecos.end_date}/>
                        </Grid>
                      );
                    })}
                  </Grid>
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