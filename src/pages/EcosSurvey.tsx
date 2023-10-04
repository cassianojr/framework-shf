import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepperComponent from '../components/Stepper/StepperComponent';
import { Framework } from '../types/Framework.type';
import { FirebaseService } from '../services/FirebaseService';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import { useNavigate } from 'react-router-dom';
import { Step, StepType } from '../types/Step.type';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';


export default function EcosSurvey() {

  const { t } = useTranslation('ecos_survey');

  const [steps, setSteps] = React.useState([] as Step[]);
  const [appLoading, setAppLoading] = React.useState(true);
  const navigate = useNavigate();

  const { signed, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  React.useEffect(() => {

    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    const questions = [
      {
        questionId: 'contextual-characteristics',
        label: t('questions.contextual_characteristics'),
        order: 0,
      },
      {
        questionId: 'social-human-factors',
        label: t('questions.shf'),
        order: 1,
      },
      {
        questionId: 'barriers-to-improving',
        label:  t('questions.barriers'),
        order: 2,
      },
      {
        questionId: 'strategies',
        label: t('questions.strategies'),
        order: 4,
      },
      {
        questionId: 'coping-mechanisms',
        label: t('questions.copy_mechanisms'),
        order: 6,
      }
    ]

    FirebaseService.getFrameworkData((data: Framework[]) => {
      const correlateBarriersWithSHF = {
        id: 'correlate-barriers-with-shf',
        label: t('questions.correlate_barriers_with_shf'),
        order: 3,
        type: StepType.correlate,
        correlateId: 'social-human-factors',
        correlatedToId: 'barriers-to-improving',
        listItems: [],
        correlateWith: [],
        itemsToCorrelate: []
      }


      const correlateBarriersWithStrategies = {
        id: 'correlate-barriers-with-strategies',
        label: t('questions.correlate_barriers_with_strategies'),
        order: 5,
        type: StepType.correlate,
        correlateId: 'barriers-to-improving',
        correlatedToId: 'strategies',
        listItems: [],
        correlateWith: [],
        itemsToCorrelate: []
      }

      const correlateCopingMechanismsWithBarriers = {
        id: 'correlate-coping-mechanisms-with-barriers',
        label: t('questions.correlate_coping_mechanisms_with_barriers'),
        order: 7,
        type: StepType.correlate,
        correlateId: 'coping-mechanisms',
        correlatedToId: 'barriers-to-improving',
        listItems: [],
        correlateWith: [],
        itemsToCorrelate: []
      }



      setSteps(data.map((item) => {
        const questionStep = questions.filter((q) => q.questionId == item.id)[0];
        return {
          id: item.id,
          label: questionStep.label,
          order: questionStep.order,
          type: StepType.listSelect,
          listItems: item.items?.map((listItem) => {
            return {
              id: listItem.id,
              name: listItem.names[i18next.language],
              selected: false,
              description: listItem.descriptions[i18next.language],
            }
          }) ?? []
        }
      }).concat(correlateBarriersWithSHF, correlateBarriersWithStrategies, correlateCopingMechanismsWithBarriers));

    });

    setAppLoading(false);

  }, [loading, navigate, signed, setAppLoading, setSteps, t]);

  steps.sort((a, b) => a.order - b.order);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container component="main" style={{ marginBottom: '1rem', minHeight: '75vh' }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8 }}>
          {(!appLoading && steps.length != 0) && <StepperComponent steps={steps} setSteps={setSteps} />}
        </Box>
      </Container>
      <Footer />
    </>
  );
}