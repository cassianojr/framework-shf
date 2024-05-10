import { Autocomplete, Button, Grid, MobileStepper, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { FrameworkItem } from '../../types/Framework.type';
import { Box, Container } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { QuestionService } from '../../services/QuestionService';
import { DemoagraphicData, NewAnswers } from '../../types/Answer.type';
import { useNavigate } from 'react-router-dom';
import { SurveyOptionsDataTable } from './SurveyOptionsDataTable';
import { v4 as uuid } from 'uuid';
import { EcosProject, Participant } from '../../types/EcosProject.type';
import EcosProjectService from '../../services/EcosProjectService';
import SurveyOptionalDataComponent from './SurveyOptionalDataComponent';
import { SurveyViewOnly } from './SurveyViewOnly';
import ViewAnswersComponent from './ViewAnswersComponent';


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
  user_id: string,
  user_email: string,
  ecos: EcosProject,
  setFeedBackSnackBar: (value: { severity: "success" | "error", text: string }) => void,
  setFeedBackSnackbarState: (value: boolean) => void
}

export default function SurveyStepper({ stepsVote, ecos, user_id, user_email, setFeedBackSnackBar, setFeedBackSnackbarState }: SurveyStepperProps) {
  const { t } = useTranslation('ecos_survey');
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<NewAnswers | undefined>(undefined);

  const [refresh, setRefresh] = React.useState(false);

  const [reqTimeError, setReqTimeError] = React.useState(false);
  const [timeOnReqManagmentError, setTimeOnReqManagmentError] = React.useState(false);
  const [roleError, setRoleError] = React.useState(false);

  const timeOptions = [
    'Selecione',
    "Menos de 1 ano",
    "De 1 a 2 anos",
    "De 2 a 5 anos",
    "De 5 a 10 anos",
    "Mais de 10 anos"
  ]

  const ecosRoles = [
    'Selecione',
    'Desenvolvedor',
    'Gerente de Projeto',
    'Gerente de Requisitos',
    'Arquiteto de Software',
    'Analista de Requisitos',
    'Testador',
    'Outro'
  ]

  const [demographicData, setDemographicData] = React.useState({timeOnEcos: timeOptions[0], timeOnReqManagment: timeOptions[0], role: ecosRoles[0]} as DemoagraphicData);

  const createAnswersObject = () => {
    const answers = {
      user_id,
      user_email,
      ecossystem_id: ecos.id,
      demographicData,
      answers: stepsVote.filter(item => !item.viewOnly).map((stepVoteItem) => {
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
      }),
      optionalAnswers: stepsVote.filter((stepVoteItem) => stepVoteItem.optionalItems && stepVoteItem.changeOptionalItems).map((stepVoteItem) => {
        return {
          framework_item: stepVoteItem.id,
          question: stepVoteItem.optionalTitle ?? '',
          items: stepVoteItem.optionalItems?.current.filter(item => item.comment !== undefined && item.comment !== '').map((item) => {
            return {
              id: item.id,
              ids: item.ids,
              names: item.names,
              answer: 1,
              comment: item.comment
            }
          }) ?? []
        }
      }),
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

    if (activeStep === 2){
      setReqTimeError(demographicData.timeOnEcos === timeOptions[0]);
      setTimeOnReqManagmentError(demographicData.timeOnReqManagment === timeOptions[0]);
      setRoleError(demographicData.role === ecosRoles[0]);
      if (demographicData.timeOnEcos === timeOptions[0] || demographicData.timeOnReqManagment === timeOptions[0] || demographicData.role === ecosRoles[0]){
        noErrors = false;
      }
      return noErrors;
    }

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

    const [timeOnEcosInputValue, setTimeOnEcosInputValue] = React.useState(timeOptions[0]);
    const [timeOnReqManagmentInputValue, setTimeOnReqManagmentInputValue] = React.useState(timeOptions[0]);
    const [roleInputValue, setRoleInputValue] = React.useState(ecosRoles[0]);

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <Autocomplete
            disablePortal
            id="reqTime"
            options={timeOptions}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.timeOnEcos}
            onChange={(_, newValue: string | null) => {
              setReqTimeError(false);
              setDemographicData({ ...demographicData, timeOnEcos: newValue ?? '' });
            }}
            inputValue={timeOnEcosInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnEcosInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={'Quanto tempo trabalha no ecossistema de software?'} InputLabelProps={{shrink: true}} error={reqTimeError} />}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <Autocomplete
            disablePortal
            id="reqTime"
            options={timeOptions}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.timeOnReqManagment}
            onChange={(_, newValue: string | null) => {
              setTimeOnReqManagmentError(false);
              setDemographicData({ ...demographicData, timeOnReqManagment: newValue ?? '' });
            }}
            inputValue={timeOnReqManagmentInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnReqManagmentInputValue(newInputValue);
            }}
            
            renderInput={(params) => <TextField {...params} label={'Quanto tempo trabalha com gerência de requisitos?'} InputLabelProps={{shrink: true}} error={timeOnReqManagmentError}/>}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <Autocomplete
            disablePortal
            id="role"
            options={ecosRoles}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.role}
            onChange={(_, newValue: string | null) => {
              setRoleError(false);
              setDemographicData({ ...demographicData, role: newValue ?? '' });
            }}
            inputValue={roleInputValue}
            onInputChange={(_, newInputValue) => {
              setRoleInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={'Qual o seu papel no ecossistema?'} InputLabelProps={{shrink: true}} error={roleError} />}
          />

        </Grid>
      </Grid>
    )
  }

  const stepperContents = stepsVote.map((step) => {
    return {
      id: step.id,
      title: t(step.title, { ecos_name: ecos.name }),
      component:
        <>
          {step.viewOnly ? <SurveyViewOnly items={step.items} /> : <SurveyOptionsDataTable key={step.id} items={step.items} changeItems={step.changeItems} />}
          {step.optionalItems && step.changeOptionalItems ? <SurveyOptionalDataComponent key={`optional-${step.id}`} title={t(step.optionalTitle ?? '', { ecos_name: ecos.name })} items={step.optionalItems} changeItems={step.changeOptionalItems} /> : <></>}
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
            {answers && <ViewAnswersComponent answers={answers} />}
          </Box>)
          : <></>}

        {steps[activeStep] && (
          <>
            <Typography variant='h6' sx={{ textAlign: 'justify' }}>{steps[activeStep]?.title ?? ''}</Typography>
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