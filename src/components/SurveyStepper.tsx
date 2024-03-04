import { Button, MobileStepper, Paper, Typography } from '@mui/material';
import React from 'react'
import { Framework, FrameworkItem } from '../types/Framework.type';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import FrameworkComponent from './FrameworkComponent';
import { QuestionService } from '../services/QuestionService';
import { NewAnswers } from '../types/Answer.type';
import { useNavigate } from 'react-router-dom';
import { SurveyOptionsDataTable } from './SurveyOptionsDataTable';
import { Ecosystem, Participant } from '../types/Ecosystem.type';
import EcosystemService from '../services/EcosystemService';
import { v4 as uuid } from 'uuid';


interface SurveyStepperProps {
  stepsVote: {
    id: string,
    title: string,
    items: React.MutableRefObject<FrameworkItem[]>,
    changeItems: (value: FrameworkItem[]) => void,
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
  user_name: string,
  user_email: string,
  ecos: Ecosystem,
  setFeedBackSnackBar: (value: { severity: "success" | "error", text: string }) => void,
  setFeedBackSnackbarState: (value: boolean) => void
}

export default function SurveyStepper({ stepsVote, frameworkItems, ecos, user_id, user_email, user_name, setFeedBackSnackBar, setFeedBackSnackbarState }: SurveyStepperProps) {
  const { t } = useTranslation('ecos_survey');
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<NewAnswers | undefined>(undefined);


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
      round: ecos.current_round,
      answers: stepsVote.map((stepVoteItem) => {
        return {
          framework_item: stepVoteItem.id,
          question: stepVoteItem.title,
          items: stepVoteItem.items.current.map((item) => {
            return {
              id: item.id,
              ids: item.ids,
              names: item.names,
              answer: item.ratio
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
      name: user_name,
      email: user_email
    } as Participant;

    const newParticipants = ecos.participants ? [...ecos.participants, newParticipant] : [newParticipant];
    const newEcos = { ...ecos, participants: newParticipants };
    EcosystemService.updateEcosystem(newEcos);
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

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setAnswersToFrameworkComponent();
      setAnswers(createAnswersObject());
    }
    if (activeStep === steps.length) {
      handleSaveAnswers();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepperContents = stepsVote.map((step) => {
    return {
      id: step.id,
      title: step.title,
      items: step.items,
      changeItems: step.changeItems,
      order: step.order,
      type: 'vote',
      texts: [],
      lists: [],
      dataTable: <SurveyOptionsDataTable key={step.id} items={step.items} changeItems={step.changeItems} />
    }
  });

  const steps = [
    {
      title: t('welcome_text'),
      texts: [
        t('instructions.p1'),
        t('instructions.p2')
      ],
      lists: [
        t('instructions.i1'),
        t('instructions.i2'),
        t('instructions.i3'),
        t('instructions.i4')
      ],
      dataTable: <></>,
      type: 'text'
    },
    {
      title: t('consent_term.title'),
      texts: [
        t('consent_term.p1'),
        t('consent_term.p2'),
        t('consent_term.p3'),
        t('consent_term.p4')
      ],
      lists: [],
      dataTable: <></>,
      type: 'text'
    },
    ...stepperContents
  ];

  return (
    <Paper elevation={3} sx={{ padding: '2rem', width: (activeStep === steps.length) ? '85%' : '55%', margin: 'auto' }}>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <FrameworkComponent
              copingMechanisms={frameworkItems.copingMechanisms}
              contextualCharacteristics={frameworkItems.contextualCharacteristics}
              socialHumanFactors={frameworkItems.socialHumanFactors}
              barriersToImproving={frameworkItems.barriersToImproving}
              strategies={frameworkItems.strategies}
              showSuggestions={false}
            />
          </Box>)
          : <></>}

        {steps[activeStep] && (
          <>
            <Typography variant='h6'>{steps[activeStep]?.title ?? ''}</Typography>

            {(steps[activeStep].type === 'text' && activeStep < steps.length) ? (
              <>
                {steps[activeStep].texts.map((text, index) => (
                  <Typography key={index} sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>{text}</Typography>
                ))}
                <ul>

                  {steps[activeStep].lists.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </>

            ) : (
              <Box height={'70vh'}>
                {steps[activeStep]?.dataTable ?? <></>}
              </Box>
            )}
          </>
        )}
      </Box>
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

