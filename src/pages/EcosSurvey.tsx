import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepperComponent from '../components/Stepper/StepperComponent';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { QuestionService } from '../services/QuestionService';
import { Question } from '../types/Question.type';


export default function EcosSurvey() {

  const { t } = useTranslation('ecos_survey');

  const [questions, setQuestions] = React.useState([] as Question[]);
  
  const [appLoading, setAppLoading] = React.useState(true);
  const navigate = useNavigate();

  const { signed, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  React.useEffect(() => {

    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    QuestionService.getQuestions((data) => {
      setQuestions(data);
    });

    setAppLoading(false);

  }, [loading, navigate, signed, setAppLoading, t]);

  questions.sort((a, b) => a.order - b.order);
  

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container component="main" style={{ marginBottom: '1rem', minHeight: '75vh' }}>
        <CssBaseline />
        <Box sx={{ marginTop: 8 }}>
          {(!appLoading && questions.length != 0) && <StepperComponent questions={questions} setQuestions={setQuestions} />}
        </Box>
      </Container>
      <Footer />
    </>
  );
}