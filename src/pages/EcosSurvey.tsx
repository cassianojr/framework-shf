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
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import { useNavigate } from 'react-router-dom';

export default function EcosSurvey() {

  const [steps, setSteps] = React.useState([] as any[]);
  const [appLoading, setAppLoading] = React.useState(true);
  const navigate = useNavigate();

  const { signed, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  React.useEffect(() => {

    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

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

    });

    setAppLoading(false);

  },[loading, navigate, signed, setAppLoading, setSteps]);

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