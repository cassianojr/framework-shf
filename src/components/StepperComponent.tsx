import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
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
  setSteps:any
}



export default function StepperComponent(props: StepData) {
  const { steps, setSteps } = props;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = steps.length;

  const [items, setItems] = React.useState(steps[activeStep].listItems);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setItems(steps[activeStep + 1].listItems);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setItems(steps[activeStep - 1].listItems);
  };

  const handleToggle = (id: number) => () =>{
    const newListItems = items.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setItems(newListItems);
    setSteps((prevSteps: any) => {
      const newSteps = prevSteps.map((step: any) => {
        if (step.label === steps[activeStep].label) {
          return { ...step, listItems: newListItems };
        }
        return step;
      });
      return newSteps;
    });
  }

  React.useEffect(() => {
    console.log(items);
    
  }, [items]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant='h4'>{steps[activeStep].label}</Typography>
      </Paper>
      <Divider />
      <Box sx={{ width: '100%', p: 2 }} >
        <ListCheckbox listItems={items} handleToggle={handleToggle} />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ width: '50%', margin: 'auto' }}
        nextButton={
          <Button
            size="large"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            variant='contained'
          >
            Próximo
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0} variant='contained'>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Voltar
          </Button>
        }
      />
    </Box>
  );
}