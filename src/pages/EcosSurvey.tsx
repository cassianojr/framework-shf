import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepperComponent from '../components/StepperComponent';
import { Framework } from '../types/Framework.type';
import { FirebaseService } from '../services/FirebaseService';

export default function EcosSurvey() {

  const [loading, setLoading] = React.useState(true);

  const [steps, setSteps] = React.useState([] as any[]);

  React.useEffect(() => {
    const questions = [
      {
        questionId: 'contextual-characteristics',
        label: 'Select the contextual characteristics of your organization',
        order: 0,
      },
      {
        questionId: 'social-human-factors',
        label: 'Select the social and human factors that affects your organization',
        order: 1,
      },
      {
        questionId: 'barriers-to-improving',
        label: 'Select the barriers to improving the SHF on your organization',
        order: 2,
      },
      {
        questionId: 'strategies',
        label: 'Select the Improvement Strategies that you find useful on your organization',
        order: 3,
      },
      {
        questionId: 'coping-mechanisms',
        label: 'Select the coping mechanisms that you find useful on your organization',
        order: 4,
      }
    ]

    FirebaseService.getFrameworkData((data: Framework[]) => {

      setSteps(data.map((item) => {
          const questionStep = questions.filter((q) => q.questionId == item.id)[0];
          return {
            label: questionStep.label,
            order: questionStep.order,
            listItems: item.items?.map((listItem) => {
              return {
                id: listItem.id,
                name: listItem.name,
                selected: false,
                description: listItem.description,
              }
            }) ?? []
          }
      }));

      setLoading(false);
    });

  }, [setLoading, setSteps]);

  steps.sort((a, b) => a.order - b.order);
  return (
    <>
      <Navbar />
      <Toolbar />
      <Container component="main" style={{ marginBottom: '1rem', minHeight: '75vh' }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8 }}>
          {!loading && <StepperComponent steps={steps} setSteps={setSteps} />}
        </Box>
      </Container>
      <Footer />
    </>
  );
}