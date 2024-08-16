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
import { useTranslation } from "react-i18next";
import Title from '../components/Dashboard/Title';
import { QuestionService } from '../services/QuestionService';
import { NewAnswer, NewAnswers } from '../types/Answer.type';
import { FirebaseService } from '../services/FirebaseService';
import { Framework } from '../types/Framework.type';
import SurveyStatus from '../components/EcosDashboard/SurveyStatus';
import EmailService from '../services/EmailService';
import i18next from 'i18next';
import EditIcon from '@mui/icons-material/Edit';

import AddIcon from '@mui/icons-material/Add';

import ManageParticipantsModal from '../components/EcosDashboard/ManageParticipantsModal';
import { EcosProject, MandatoryItems } from '../types/EcosProject.type';
import EcosProjectService from '../services/EcosProjectService';
import EditEcosProject from '../components/EcosDashboard/EditEcosProject';
import ResultDataDisplay from '../components/EcosDashboard/ResultDataDisplay';

export default function ECOSDashboard() {

  const { t } = useTranslation(['ecos_dashboard', 'ecos_survey']);
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);
  const [copySnackBarState, setCopySnackBarState] = React.useState(false);
  const [ecos, setEcos] = React.useState({} as EcosProject);
  const [answers, setAnswers] = React.useState([] as NewAnswers[]);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);

  const [manageParticipantsModalState, setManageParticipantsModalState] = React.useState(false);
  const [addParticipantModalState, setAddParticipantModalState] = React.useState(false);
  const [editEcosProjectModalState, setEditEcosProjectModalState] = React.useState(false);

  const [feedbackSnackBarState, setFeedbackSnackBarState] = React.useState(false);
  const [feedbackSnackBarText, setFeedbackSnackBarText] = React.useState('' as string);
  const [feedbackSnackBarSeverity, setFeedbackSnackBarSeverity] = React.useState('info' as 'success' | 'info' | 'warning' | 'error');

  const [frameworkDataState, setFrameworkDataState] = React.useState([] as Framework[]);

  const ecosId = useParams().ecosId;

  const user = getUser();

  const surveyLink = `${window.location.origin}/ecos-survey/${ecosId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyLink);
    setCopySnackBarState(true);
  }

  const defaultPaperStyle = {
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  }

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate('/sign-in');

    const getMandatoryFrameworkItems = (data: Framework[], mandatory_items: MandatoryItems) => {
      data.forEach((item) => {
        if (item.id === 'social-human-factors') {
          item.items.map((item) => {
            mandatory_items.shf.forEach((mandatoryItem) => {
              if (item.id === mandatoryItem.id) {
                item.selected = true;
              }
            });
          });
        }

        if (item.id === 'contextual-characteristics') {
          item.items.map((item) => {
            mandatory_items.cc.forEach((mandatoryItem) => {
              if (item.id === mandatoryItem.id) {
                item.selected = true;
              }
            });
          });
        }

        if (item.id === 'barriers-to-improving') {
          item.items.map((item) => {
            mandatory_items.barriers.forEach((mandatoryItem) => {
              if (item.id === mandatoryItem.id) {
                item.selected = true;
              }
            });
          });
        }

        if (item.id === 'strategies') {
          item.items.map((item) => {
            mandatory_items.strategies.forEach((mandatoryItem) => {
              if (item.id === mandatoryItem.id) {
                item.selected = true;
              }
            });
          });
        }
      });

      return data;
    }

    const countAnswers = (item: NewAnswer, frameworkComponentToCount: Framework, optionalAnswer?: boolean) => {
      item.items.forEach((itemAnswer) => {
        frameworkComponentToCount.items?.forEach((frameworkItem) => {
          if (itemAnswer.id !== frameworkItem.id) return;

          if (itemAnswer.sentiment?.score === undefined) return;

          const defaultAnswer = { agree: 0, disagree: 0, positiveSentiment: 0, negativeSentiment: 0, neutralSentiment: 0, comments: [] };

          const frameworkItemAnswer = (optionalAnswer) ? frameworkItem.optionalAnswer ?? defaultAnswer : frameworkItem.answer ?? defaultAnswer;

          if (itemAnswer.answer === 1) frameworkItemAnswer.agree++;
          if (itemAnswer.answer === 2) frameworkItemAnswer.disagree++;
          if (itemAnswer.sentiment?.score > 0.25) frameworkItemAnswer.positiveSentiment++;
          if (itemAnswer.sentiment?.score < -0.25) frameworkItemAnswer.negativeSentiment++;
          if (itemAnswer.sentiment?.score >= -0.25 && itemAnswer.sentiment?.score <= 0.25) frameworkItemAnswer.neutralSentiment++;
          if (itemAnswer.comment !== "" && itemAnswer.comment != undefined) frameworkItemAnswer.comments.push(itemAnswer.comment);

          if (optionalAnswer) {
            frameworkItem.optionalAnswer = frameworkItemAnswer;
            return;
          }
          frameworkItem.answer = frameworkItemAnswer;
        });
      });
    }

    const handleFrameworkData = (answersData: NewAnswers[], frameworkItems: Framework[]) => {
      answersData.forEach((answer) => {
        answer.answers.forEach((item) => {
          frameworkItems.forEach((itemToCount) => {
            if (item.framework_item != itemToCount.id) return;
            countAnswers(item, itemToCount);
          });
        });

        answer.optionalAnswers.forEach((item) => {
          frameworkItems.forEach((itemToCount) => {
            if (item.framework_item != itemToCount.id) return;

            countAnswers(item, itemToCount, true);
          });
        });
      });

      const socialHumanFactors = frameworkItems.filter((item) => item.id === "social-human-factors")[0];
      setSocialHumanFactors(socialHumanFactors);

      const barriersToImproving = frameworkItems.filter((item) => item.id === "barriers-to-improving")[0];
      setBarriersToImproving(barriersToImproving);

      const strategies = frameworkItems.filter((item) => item.id === "strategies")[0];
      setStrategies(strategies);

      setFrameworkDataState(frameworkItems);
    }

    const fetchData = async () => {
      const ecosData = await EcosProjectService.getEcosProject(ecosId ?? "");

      if (ecos.id === undefined) setEcos(ecosData);

      if (!frameworkDataState || frameworkDataState.length == 0) FirebaseService.getFrameworkData((data) => {
        const mandatoryItems = getMandatoryFrameworkItems(data, ecosData.mandatory_items);


        if (ecosData.id === undefined) return;
        if (!answers || answers.length == 0) QuestionService.getEcosAnswers(ecosData.id).then((dbAnswers) => {

          handleFrameworkData(dbAnswers, mandatoryItems);
          setAnswers(dbAnswers);
        });
      });

      setAppLoading(false);
    }

    fetchData();

  }, [signed, navigate, loading, user.uid, ecosId, setAnswers, setFrameworkDataState, ecos, frameworkDataState, answers]);

  console.log(frameworkDataState);


  const handleStartSurvey = () => {

    const email = user.email ?? "";

    const endAt = new Date().getTime();

    const endAtString = new Date(endAt).toISOString();

    if (email === "" || ecosId == null) return;

    if (ecos.participants !== undefined && ecos.participants.length > 0) {
      ecos.participants.forEach((participant) => {
        EmailService.notifyStartSurvey(participant.email, ecos.name, ecosId, i18next.language);
      });
    }

    if(ecos.id) EmailService.scheduleEndRound(email, endAtString, ecos.name, ecosId, i18next.language, ecos.id);
    const newEcosProject = { ...ecos, status: 'waiting-for-answers' } as EcosProject;
    setEcos(newEcosProject);
    EcosProjectService.updateEcosProject(newEcosProject, () => console.log("updated"), () => console.error("error updating"));
  }

  const pushFeedbackSnackbar = (text: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setFeedbackSnackBarText(text);
    setFeedbackSnackBarSeverity(severity);
    setFeedbackSnackBarState(true);
  }

  return (
    !appLoading &&
    <>
      {frameworkDataState.length > 0 && <EditEcosProject onError={() => pushFeedbackSnackbar("Erro ao salvar alterações", 'error')} onSuccess={() => pushFeedbackSnackbar("Alterações salvas com sucesso", 'success')} setEcosProject={setEcos} ecosProject={ecos} frameworkData={frameworkDataState} setState={setEditEcosProjectModalState} state={editEcosProjectModalState} />}
      <ManageParticipantsModal modalState={manageParticipantsModalState} setModalState={setManageParticipantsModalState} ecos={ecos} setEcos={setEcos} addParticipantModalState={addParticipantModalState} setAddParticipantModalState={setAddParticipantModalState} />
      <SnackBarComponent snackBarState={copySnackBarState} setSnackBarState={setCopySnackBarState} text={t('snackbar_link_copied')} severity='success' />
      <SnackBarComponent snackBarState={feedbackSnackBarState} setSnackBarState={setFeedbackSnackBarState} text={feedbackSnackBarText} severity={feedbackSnackBarSeverity} />
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
            <Typography variant='h4' align='center' mb={3}>{ecos.name}</Typography>

            <Grid container spacing={3}>
              <Grid item sm={12} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between"
              }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>

                  <Grid item >{/* Status */}
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
                      <Title>Data de término</Title>
                      <Button variant='contained' color='info' sx={{ cursor: 'default', p: 1.4 }}>{(!loading) ? new Date(ecos.end_date).toLocaleDateString() : ''}</Button>
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

                  <Grid item>{/* Edit survey */}
                    <Paper
                      sx={defaultPaperStyle}
                    >
                      <Title>Editar pesquisa</Title>
                      <Button variant='contained' disabled={ecos.status !== 'not-started'} onClick={() => setEditEcosProjectModalState(true)} color='warning' sx={{ p: 1.4 }} startIcon={<EditIcon />}> Editar Pesquisa</Button>
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

              <Grid item>{/* Start survey */}
                <Paper
                  sx={defaultPaperStyle}
                >
                  <Title>{t('start_survey')}</Title>
                  <Button variant='contained' color='success' disabled={ecos.status !== 'not-started'} sx={{ p: 1.4 }} onClick={handleStartSurvey}>
                    {(ecos.status === 'waiting-for-answers') ? t('survey_started') : (ecos.status === 'finished')?t('survey_status.finished'):t('start_survey')}
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs>{/* Survey Link */}
                <Paper
                  sx={defaultPaperStyle}>
                  <Title>{t('ecos_link')}</Title>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>

                    <Typography sx={{ fontWeight: 'bold' }}><Link href={surveyLink} target='_blank'>{surveyLink}</Link></Typography>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '31%',
                    }}>
                      <Button variant='contained' sx={{ width: '100%' }} startIcon={<ContentCopyIcon />} onClick={handleCopyLink}>{t('copy_link_btn')}</Button>
                      <Button variant='contained' sx={{ width: '100%', mt: 1 }} startIcon={<AddIcon />} onClick={() => setAddParticipantModalState(true)}>{t('manage_participants.add_participant')}</Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {answers.length === 0 ? <></> :
                <Grid item lg={12}>
                  <Title>{t('framework_results')}</Title>
                  <div>
                    {!socialHumanFactors ? <></> : <ResultDataDisplay frameworkComponent={socialHumanFactors} />}
                    {!barriersToImproving ? <></> : <ResultDataDisplay frameworkComponent={barriersToImproving} />}
                    {!strategies ? <></> : <ResultDataDisplay frameworkComponent={strategies} />}
                  </div>
                </Grid>
              }
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}