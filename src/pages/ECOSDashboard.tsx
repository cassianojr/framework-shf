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
import Title from '../components/Dashboard/Title';
import { QuestionService } from '../services/QuestionService';
import { NewAnswer, NewAnswers } from '../types/Answer.type';
import { FirebaseService } from '../services/FirebaseService';
import { Framework } from '../types/Framework.type';
import SurveyStatus from '../components/EcosDashboard/SurveyStatus';
import EmailService from '../services/EmailService';
import i18next from 'i18next';

import ResultDataDisplay from '../components/EcosDashboard/ResultDataDisplay';
import ManageParticipantsModal from '../components/EcosDashboard/ManageParticipantsModal';

export default function ECOSDashboard() {

  const { t } = useTranslation(['ecos_dashboard', 'ecos_survey']);
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [copySnackBarState, setCopySnackBarState] = React.useState(false);
  const [ecos, setEcos] = React.useState({} as Ecosystem);
  const [answers, setAnswers] = React.useState([] as NewAnswers[]);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);
  const [manageParticipantsModalState, setManageParticipantsModalState] = React.useState(false);

  const ecosId = useParams().ecosId;

  const user = getUser();

  const surveyLink = `${window.location.origin}/ecos-survey/${ecosId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyLink);
    setCopySnackBarState(true);
  }

  const defaultPaperStyle = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  }

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate('/sign-in');
    if (signed) setAppLoading(false);

    const countAnswers = (answer: NewAnswer, frameworkComponentToCount: Framework) => {

      answer.items.forEach((itemAnswer) => {

        frameworkComponentToCount.items?.forEach((itemToCount) => {

          if (itemAnswer.id == itemToCount.id) {
            if (itemAnswer.answer === 1) itemToCount.totallyDisagree = itemToCount.totallyDisagree ? itemToCount.totallyDisagree + 1 : 1;
            if (itemAnswer.answer === 2) itemToCount.disagree = itemToCount.disagree ? itemToCount.disagree + 1 : 1;
            if (itemAnswer.answer === 3) itemToCount.neutral = itemToCount.neutral ? itemToCount.neutral + 1 : 1;
            if (itemAnswer.answer === 4) itemToCount.agree = itemToCount.agree ? itemToCount.agree + 1 : 1;
            if (itemAnswer.answer === 5) itemToCount.totallyAgree = itemToCount.totallyAgree ? itemToCount.totallyAgree + 1 : 1;
          }
        });
      });
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

    const handleFrameworkData = (answersData: NewAnswers[], data: Framework[]) => {

      const rounds = answersData.map((answer) => answer.round);
      const uniqueRounds = [...new Set(rounds)];

      uniqueRounds.forEach((round) => {
        const answersPerRound = answersData.filter((answer) => answer.round === round);

        answersPerRound.forEach((answer) => {
          answer.answers.forEach((item) => {

            data.forEach((itemToCount) => {
              if (item.framework_item != itemToCount.id) return;
              countAnswers(item, itemToCount);
            });
          });
        });
      })

      setFrameworkData(data);
    }

    const fetchData = async () => {
      const ecosData = await EcosystemService.getEcosystem(ecosId ?? "");
      setEcos(ecosData);

      if (ecosData.id === undefined) return;
      try {
        const answersData = await QuestionService.getEcosAnswers(ecosData.id);
        setAnswers(answersData);

        FirebaseService.getFrameworkData((data) => handleFrameworkData(answersData, data));
      } catch {
        FirebaseService.getFrameworkData(setFrameworkData);
      }
    }

    fetchData();

  }, [signed, navigate, loading, user.uid, ecosId, setAnswers]);


  const handleStartSurvey = () => {

    const email = user.email ?? "";

    const endAt = new Date().getTime()+ecos.time_window*7*24*60*60*1000;
    // const endAt = new Date().getTime() + 10 * 1000; // 10 seconds TODO change to the line above

    const endAtString = new Date(endAt).toISOString();

    if (email === "" || ecosId == null) return;

    if (ecos.current_round !== 1 && answers.length > 0) {
      answers.forEach((answer) => {
        EmailService.notifyStartSurvey(answer.user_email, ecos.organization_name, ecosId, i18next.language);
      });
    }

    EmailService.scheduleEndRound(email, endAtString, ecos.organization_name, ecosId, i18next.language);
    const newEcos = { ...ecos, status: 'waiting-for-answers', current_round: ecos.current_round + 1 } as Ecosystem;
    setEcos(newEcos);
    EcosystemService.updateEcosystem(newEcos);
  }


  return (
    !appLoading &&
    <>
      <ManageParticipantsModal modalState={manageParticipantsModalState} setModalState={setManageParticipantsModalState} ecos={ecos} setEcos={setEcos} />
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

              <Grid item xs={3}>{/* Start survey */}
                <Paper
                  sx={defaultPaperStyle}
                >
                  <Title>{t('start_survey')}</Title>
                  <Button variant='contained' color='success' sx={{ p: 1.4 }} onClick={handleStartSurvey}>{t('start_survey')}</Button>
                </Paper>
              </Grid>

              <Grid item xs>{/* Survey Link */}
                <Paper
                  sx={defaultPaperStyle}>
                  <Title>{t('ecos_link')}</Title>
                  <Container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>

                    <Typography sx={{ fontWeight: 'bold' }}><Link href={surveyLink} target='_blank'>{surveyLink}</Link></Typography>
                    <Button variant='contained' sx={{ width: '36%', mt: 1 }} startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>{t('copy_link_btn')}</Button>
                  </Container>
                </Paper>
              </Grid>

              <Grid item sm={12} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between"
              }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>

                  <Grid item sm={2.8}>{/* Status */}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>{t('survey_status_label')}</Title>
                      <SurveyStatus status={ecos.status ?? 'not-started'} />
                    </Paper>
                  </Grid>

                  <Grid item>{/* Time window */}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>{t('time_window')}</Title>
                      <Button variant='contained' color='info' sx={{ cursor: 'default', p: 1.4 }}>{ecos.time_window} {t('time_window_unit')}{(ecos.time_window > 1) ? 's' : ''}</Button>
                    </Paper>
                  </Grid>

                  <Grid item>{/* Current round */}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>{t('current_round')}</Title>
                      <Button variant='contained' color='info' sx={{ cursor: 'default', p: 1.4 }}>{ecos.current_round}º {t('current_round_unit')}</Button>
                    </Paper>
                  </Grid>

                  <Grid item>{/*reponses*/}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>{t('responses_label')}</Title>
                      <Button variant='contained' color='info' sx={{ cursor: 'default', p: 1.4 }}>{answers.length}</Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={3}>{/* Manage Participants */}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>{t('manage_participants.title')}</Title>
                      <Button variant='contained' color='info' sx={{ p: 1.4 }} onClick={() => setManageParticipantsModalState(true)}>{t('manage_participants.title')}</Button>
                    </Paper>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item lg={12}>{/* Framework instance*/}
                <Title>{t('framework_results')}</Title>
                <div>
                  <ResultDataDisplay question={t('ecos_survey:fsh_affirmative')} frameworkComponent={socialHumanFactors} expanded={true} />
                  <ResultDataDisplay question={t('ecos_survey:cc_affirmative')} frameworkComponent={contextualCharacteristics} />
                  <ResultDataDisplay question={t('ecos_survey:barriers_affirmative')} frameworkComponent={barriersToImproving} />
                  <ResultDataDisplay question={t('ecos_survey:strategies_affirmative')} frameworkComponent={strategies} />
                  <ResultDataDisplay question={t('ecos_survey:coping_mec_affirmative')} frameworkComponent={copingMechanisms} />
                </div>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}