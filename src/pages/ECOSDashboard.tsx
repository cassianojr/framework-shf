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
import SnackBarComponent from '../components/SnackBarComponent';
import EcosystemService from '../services/EcosystemService';
import { Ecosystem } from '../types/Ecosystem.type';
import { useTranslation } from "react-i18next";
import FrameworkComponent from '../components/FrameworkComponent';
import Title from '../components/Dashboard/Title';
import { QuestionService } from '../services/QuestionService';
import { Answer, Answers } from '../types/Answer.type';
import { FirebaseService } from '../services/FirebaseService';
import { Framework } from '../types/Framework.type';

export default function ECOSDashboard() {
  const { t } = useTranslation('ecos_dashboard');
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [copySnackBarState, setCopySnackBarState] = React.useState(false);
  const [ecos, setEcos] = React.useState({} as Ecosystem);
  const [answers, setAnswers] = React.useState([] as Answers[]);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);


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

    const countAnswers = (answer: Answer, itemToCount: Framework) => {
      if (answer.questionName === itemToCount.id) {
        answer.selectedItems?.forEach((item) => {

          itemToCount.items?.forEach((itemToCount) => {
            if (item.id == itemToCount.id) {
              itemToCount.votes = itemToCount.votes ? itemToCount.votes + 1 : 1;
            } else {
              itemToCount.votes = itemToCount.votes ? itemToCount.votes : 0;
            }
          });
        });
      }
    }

    const setFrameworkData = (data: Framework[]) => {
      const copingMechanisms = data.filter((item) => item.id === "coping-mechanisms")[0]
      setCopingMechanisms(copingMechanisms);
      
      const contextualCharacteristics = data.filter((item) => item.id === "contextual-characteristics")[0];
      setContextualCharacteristics(contextualCharacteristics);

      const socialHumanFactors = data.filter((item) => item.id === "social-human-factors")[0];
      setSocialHumanFactors(socialHumanFactors);

      const barriersToImproving = data.filter((item) => item.id === "barriers-to-improving")[0];
      setBarriersToImproving(barriersToImproving);

      const strategies = data.filter((item) => item.id === "strategies")[0];
      setStrategies(strategies);
    }

    const handleFrameworkData = (answersData: Answers[], data: Framework[]) => {
      answersData.forEach((answers) => {
        answers.answers.forEach((answer) => {
          data.forEach((itemToCount) => {
            countAnswers(answer, itemToCount);
            if(itemToCount.id !== "social-human-factors") itemToCount.items?.sort((a, b) => (a.votes ?? 0) < (b.votes ?? 0) ? 1 : -1);
          });
        });
      });

      setFrameworkData(data);
    }

    const fetchData = async () => {
      const ecosData = await EcosystemService.getEcosystem(ecosId ?? "");
      setEcos(ecosData);

      if (ecosData.id === undefined) return;
      try{
        const answersData = await QuestionService.getEcosAnswers(ecosData.id);
        setAnswers(answersData);
        
        FirebaseService.getFrameworkData((data) => handleFrameworkData(answersData, data));
      }catch{
        FirebaseService.getFrameworkData(setFrameworkData);
      }
    }

    fetchData();

  }, [signed, navigate, loading, user.uid, ecosId, setAnswers]);


  return (
    !appLoading &&
    <>
      <SnackBarComponent snackBarState={copySnackBarState} setSnackBarState={setCopySnackBarState} text={t('snackbar_link_copied')} severity='success' />
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
                  <Typography sx={{ fontWeight: 'bold' }}>{t('ecos_link')}<Link href={frameworkLink} target='_blank'>{frameworkLink}</Link></Typography>
                  <Button variant='outlined' startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>{t('copy_link_btn')}</Button>
                </Paper>
              </Grid>

              <Grid item sm={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Typography sx={{ fontWeight: 'bold' }}>{t('responses_label')} {answers.length}</Typography>
                </Paper>
              </Grid>
              <Grid item lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Title>Resultados no Framework</Title>
                  <FrameworkComponent
                    showSuggestions={false}
                    copingMechanisms={copingMechanisms}
                    contextualCharacteristics={contextualCharacteristics}
                    socialHumanFactors={socialHumanFactors}
                    barriersToImproving={barriersToImproving}
                    strategies={strategies}
                  />
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}