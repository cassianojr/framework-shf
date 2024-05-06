import { Button, Grid, MobileStepper, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { Framework, FrameworkItem } from '../../types/Framework.type';
import { Box, Container } from '@mui/system';
import { useTranslation } from 'react-i18next';
import FrameworkComponent from '../FrameworkComponent';
import { QuestionService } from '../../services/QuestionService';
import { NewAnswers } from '../../types/Answer.type';
import { useNavigate } from 'react-router-dom';
import { SurveyOptionsDataTable } from './SurveyOptionsDataTable';
import { v4 as uuid } from 'uuid';
import { EcosProject, Participant } from '../../types/EcosProject.type';
import EcosProjectService from '../../services/EcosProjectService';
import SurveyOptionalDataComponent from './SurveyOptionalDataComponent';
import { SurveyViewOnly } from './SurveyViewOnly';


interface SurveyStepperProps {
  stepsVote: {
    id: string,
    title: string,
    items: React.MutableRefObject<FrameworkItem[]>,
    changeItems: (value: FrameworkItem[]) => void,
    optionalItems?: React.MutableRefObject<FrameworkItem[]>,
    changeOptionalItems?: (value: FrameworkItem[]) => void,
    viewOnly?: boolean,
    optionalTitle?: string,
    order: number
  }[],
  frameworkItems: {
    socialHumanFactors: Framework | undefined,
    contextualCharacteristics: Framework | undefined,
    barriersToImproving: Framework | undefined,
    strategies: Framework | undefined,
    copingMechanisms: Framework | undefined,
    setSocialHumanFactors: (value: Framework) => void,
    setContextualCharacteristics: (value: Framework) => void,
    setBarriersToImproving: (value: Framework) => void,
    setStrategies: (value: Framework) => void,
    setCopingMechanisms: (value: Framework) => void
  },
  user_id: string,
  user_email: string,
  ecos: EcosProject,
  setFeedBackSnackBar: (value: { severity: "success" | "error", text: string }) => void,
  setFeedBackSnackbarState: (value: boolean) => void
}

export default function SurveyStepper({ stepsVote, frameworkItems, ecos, user_id, user_email, setFeedBackSnackBar, setFeedBackSnackbarState }: SurveyStepperProps) {
  const { t } = useTranslation('ecos_survey');
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<NewAnswers | undefined>(undefined);

  const [refresh, setRefresh] = React.useState(false);

  const setAnswersToFrameworkComponent = () => {
    frameworkItems.setSocialHumanFactors({
      ...frameworkItems.socialHumanFactors,
      items: stepsVote.filter((item) => item.id === "social-human-factors")[0].items.current as FrameworkItem[]
    } as Framework);

    frameworkItems.setContextualCharacteristics({
      ...frameworkItems.contextualCharacteristics,
      items: stepsVote.filter((item) => item.id === "contextual-characteristics")[0].items.current as FrameworkItem[]
    } as Framework);

    frameworkItems.setBarriersToImproving({
      ...frameworkItems.barriersToImproving,
      items: stepsVote.filter((item) => item.id === "barriers-to-improving")[0].items.current as FrameworkItem[]
    } as Framework);

    frameworkItems.setStrategies({
      ...frameworkItems.strategies,
      items: stepsVote.filter((item) => item.id === "strategies")[0].items.current as FrameworkItem[]
    } as Framework);

    frameworkItems.setCopingMechanisms({
      ...frameworkItems.copingMechanisms,
      items: stepsVote.filter((item) => item.id === "coping-mechanisms")[0].items.current as FrameworkItem[]
    } as Framework);
  }


  const createAnswersObject = () => {
    const answers = {
      user_id,
      user_email,
      ecossystem_id: ecos.id,
      answers: stepsVote.map((stepVoteItem) => {
        return {
          framework_item: stepVoteItem.id,
          question: stepVoteItem.title,
          items: stepVoteItem.items.current.map((item) => {
            return {
              id: item.id,
              ids: item.ids,
              names: item.names,
              answer: item.ratio,
              comment: item.comment ?? ''
            }
          })
        }
      })
    } as NewAnswers;

    return answers;
  }

  const handleParticipantOnEcos = () => {
    if (ecos.participants.find((p) => p.email === user_email) !== undefined) {
      return;
    }

    const newParticipant = {
      id: uuid(),
      email: user_email
    } as Participant;

    const newParticipants = ecos.participants ? [...ecos.participants, newParticipant] : [newParticipant];
    const newEcos = { ...ecos, participants: newParticipants };
    EcosProjectService.updateEcosProject(newEcos, () => console.log('ok'), () => console.log('error'));
  }

  const handleSaveAnswers = () => {
    if (!answers) return;

    QuestionService.saveAnswers(answers, () => {

      handleParticipantOnEcos();

      setFeedBackSnackBar({ severity: "success", text: t('answers_saved') });
      setFeedBackSnackbarState(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    }, () => {
      setFeedBackSnackBar({ severity: "error", text: t('answers_not_saved') });
      setFeedBackSnackbarState(true);
    });
  }

  const validateFeedback = () => {
    let noErrors = true;
    if (activeStep <= 2) return true;

    const verifyableItems = ['SHF01', 'ST01']
    const shouldValidateForComments = (verifyableItems.find((verifyableItem) => verifyableItem == stepsVote[activeStep - 3].items.current[0].ids['en']) !== undefined);

    if (!shouldValidateForComments) return noErrors;

    stepsVote[activeStep - 3].items.current.forEach((item) => {

      if (item.selected && (item.comment == '' || item.comment === undefined)) {

        noErrors = false;
        item.feedbackValidationError = true;

      } else {
        if (item.feedbackValidationError) item.feedbackValidationError = false;
      }

    });

    setRefresh(!refresh);

    return noErrors;
  }

  const validateAnswers = () => {
    let noErrors = true;

    if (activeStep <= 1) return true;

    //TODO validation of demographic data
    if (activeStep === 2) return true;

    stepsVote[activeStep - 3].items.current.forEach((item) => {

      if (item.ratio === 0 && item.selected) {
        noErrors = false;
        item.validationError = true;
      } else {
        if (item.validationError) item.validationError = false;
      }
    });

    setRefresh(!refresh);
    return noErrors;
  }

  const handleNext = () => {

    if (activeStep === steps.length - 1) {
      setAnswersToFrameworkComponent();
      setAnswers(createAnswersObject());
    }

    if (activeStep === steps.length) {
      handleSaveAnswers();
      return;
    }

    const errorOnAnswers = !validateAnswers();
    const errorOnFeedback = !validateFeedback();

    if (activeStep > 1 && (errorOnFeedback || errorOnAnswers)) {
      if (errorOnFeedback) setFeedBackSnackBar({ severity: "error", text: t('feedback.error') });
      if (errorOnAnswers) setFeedBackSnackBar({ severity: "error", text: t('validation_error') });

      setFeedBackSnackbarState(true);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const DemographicDataComponent = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="ecosTime"
            name="ecosTime"
            value={''}
            label={'Quanto tempo trabalha no ecossistema de software?'}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="reqTime"
            name="reqTime"
            value={''}
            label={'Quanto tempo trabalha com gerência de requisitos?'}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="role"
            name="role"
            value={''}
            label={'Qual o seu cargo no ecossistema de software?'}
            disabled
          />
        </Grid>
      </Grid>
    )
  }

  const stepperContents = stepsVote.map((step) => {
    return {
      id: step.id,
      title: t(step.title, {ecos_name: ecos.name}),
      component:
        <>
          {step.viewOnly? <SurveyViewOnly items={step.items} /> :<SurveyOptionsDataTable key={step.id} items={step.items} changeItems={step.changeItems} />}
          {step.optionalItems && step.changeOptionalItems ? <SurveyOptionalDataComponent key={`optional-${step.id}`} title={t(step.optionalTitle??'', {ecos_name:ecos.name})} items={step.optionalItems} changeItems={step.changeOptionalItems} /> : <></>}
        </>
    }
  })

  const steps = [
    {
      id: 'welcome',
      title: t('welcome_text'),
      component:
        <>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('instructions.p1')}</Typography>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('instructions.p2')}</Typography>
          <ul>
            <li>{t('instructions.i1')}</li>
            <li>{t('instructions.i2')}</li>
            <li>{t('instructions.i3')}</li>
            <li>{t('instructions.i4')}</li>
          </ul>
        </>
    },
    {
      id: 'consent_term',
      title: t('consent_term.title'),
      component:
        <>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('consent_term.p1')}</Typography>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('consent_term.p2')}</Typography>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('consent_term.p3')}</Typography>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem' }}>{t('consent_term.p4')}</Typography>
        </>
    },
    {
      id: 'demographic_data',
      title: "Dados demográficos",
      component: <DemographicDataComponent />
    },
    ...stepperContents
  ]


  return (
    <Paper elevation={3} sx={{ padding: '2rem', width: (activeStep === steps.length) ? '85%' : '65%', margin: 'auto' }}>
      <Container sx={{ p: '1rem' }}>
        {activeStep === steps.length ? (
          <Box>
            <FrameworkComponent
              copingMechanisms={frameworkItems.copingMechanisms}
              contextualCharacteristics={frameworkItems.contextualCharacteristics}
              socialHumanFactors={frameworkItems.socialHumanFactors}
              barriersToImproving={frameworkItems.barriersToImproving}
              strategies={frameworkItems.strategies}
              showSuggestions={false}
              showSurveyOptions={true}
            />
          </Box>)
          : <></>}

        {steps[activeStep] && (
          <>
            <Typography variant='h6' sx={{textAlign: 'justify'}}>{steps[activeStep]?.title ?? ''}</Typography>
            {steps[activeStep].component}
          </>
        )}
      </Container>
      <MobileStepper
        variant="progress"
        steps={steps.length + 1}
        position="static"
        activeStep={activeStep}
        nextButton={
          (activeStep === 1) ? <Button variant='contained' onClick={handleNext}>{t('agree_btn')}</Button> : (
            <Button variant='contained' onClick={handleNext}>{(activeStep !== steps.length) ? (activeStep !== steps.length - 1) ? t('next_btn') : t('view_answer_btn') : t('save_btn')}</Button>
          )
        }

        backButton={
          <Button variant='outlined' onClick={handleBack}>{t('back_btn')}</Button>
        }
      />
    </Paper>
  )
}