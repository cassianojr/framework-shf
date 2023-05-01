import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListCheckbox from './ListCheckbox';

interface StepData {
  steps: {
    label: string,
    listItems: {
      id: number,
      name: string,
      description: string,
      selected: boolean,
    }[]
  }[],
  suggestions: {
    id: number,
    name: string,
    description: string,
    selected: boolean,
  }[],
  copingMecanisms: {
    id: number,
    name: string,
    description: string,
    selected: boolean,
  }[],

}

export default function StepperComponent(props: StepData) {
  const { steps } = props;


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper elevation={3} sx={{p: 3, mb: 3}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Último passo</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>

              <ListCheckbox title={step.label} listItems={step.listItems} />

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finalizar!' : 'Continuar'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Voltar
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography variant='h5'>Sugestões e mecanismos de enfrentamento:</Typography>

          <ListCheckbox title='Sugestões' listItems={props.suggestions} />
          <ListCheckbox title='Mecanismos de enfrentamento' listItems={props.copingMecanisms} />


          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Resetar
          </Button>
        </Paper>
      )}
    </Paper>
  );
}