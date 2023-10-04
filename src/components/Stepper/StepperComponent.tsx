import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
import ListCheckbox from './ListCheckbox';
import { Step, StepType } from '../../types/Step.type';
import CorrelateComponent from './CorrelateComponent';
import { useTranslation } from "react-i18next";

interface StepData {
  steps: Step[],
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>
}

export default function StepperComponent(props: StepData) {
  const { t } = useTranslation('ecos_survey');

  const { steps, setSteps } = props;

  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = React.useState(steps[activeStep].listItems);
  const [selectedItems, setSelectedItems] = React.useState(steps.map((step: Step) => {
    return {
      id: step.id,
      step: step.label,
      selectedItemsInStep: step.listItems.filter((listItem) => listItem.selected)
    }
  }));

  const maxSteps = steps.length;

  const handleSelectedItems = () => {
    const selectedItemsInSteps = steps.map((step: Step) => {
      const selectedItemsInStep = step.listItems.filter((listItem) => listItem.selected);

      return {
        id: step.id,
        step: step.label,
        selectedItemsInStep
      };
    });

    steps.map((step: Step) => {
      if (step.type != StepType.correlate) {
        return step;
      }
      selectedItemsInSteps.map((selectedItemsInStep) => {
        if (selectedItemsInStep.id == step?.correlateId) {
          step.correlateWith = selectedItemsInStep.selectedItemsInStep;
        }

        if (selectedItemsInStep.id == step?.correlatedToId) {
          step.itemsToCorrelate = selectedItemsInStep.selectedItemsInStep;
        }
      });
      return step;
    });

    setSelectedItems(selectedItemsInSteps);
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setItems(steps[activeStep + 1].listItems);

    handleSelectedItems();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setItems(steps[activeStep - 1].listItems);

    handleSelectedItems();
  };

  const handleToggle = (id: string) => () => {
    const newListItems = items.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setItems(newListItems);
    setSteps((prevSteps: Step[]) => {
      const newSteps = prevSteps.map((step: Step) => {
        if (step.label === steps[activeStep].label) {
          return { ...step, listItems: newListItems };
        }
        return step;
      });
      return newSteps;
    });
  }

  return (
    <Box sx={{ flexGrow: 1, padding: '2rem' }} component={Paper} elevation={2} >
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
        }}
      >
        <Typography variant='h4' sx={{ textAlign: 'center', width: '100%' }}>{steps[activeStep].label}</Typography>
      </Paper>
      <Divider sx={{ marginTop: '1.5rem' }} />
      <Box sx={{ width: '100%', p: 2 }} >
        {(activeStep === maxSteps) ? (
          <Typography>{selectedItems[0].id}</Typography>
        ) : (
          ((steps[activeStep].type == StepType.listSelect) ? <ListCheckbox listItems={items} handleToggle={handleToggle} /> : <CorrelateComponent items={steps[activeStep]} />)
        )}
      </Box>
      <MobileStepper
        variant="dots"
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
            {t('next_btn')}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0} variant='contained'>
            <KeyboardArrowLeft />
            {t('back_btn')}
          </Button>
        }
      />
    </Box>
  );
}