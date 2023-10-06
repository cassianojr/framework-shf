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
import CorrelateComponent from './CorrelateComponent';
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '../Modal';
import { Grid, TextField } from '@mui/material';
import { Question, QuestionType } from '../../types/Question.type';
import i18next from 'i18next';

interface StepData {
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}

export default function StepperComponent(props: StepData) {
  const { t } = useTranslation('ecos_survey');

  const { questions, setQuestions } = props;
  
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = React.useState(questions[activeStep].listItems);
  const [suggestNewModalState, setSuggestNewModalState] = React.useState(false);


  const [selectedItems, setSelectedItems] = React.useState(questions.map((question: Question) => {
    return {
      id: question.framework_items?.id,
      question: question.id,
      selectedItemsInQuestion: (question.listItems) ? question.listItems.filter((listItem) => listItem.selected) : []
    }
  }));

  const maxSteps = questions.length;

  const handleSelectedItems = () => {
    const selectedItemsInQuestion = questions.map((question: Question) => {
      const selectedItemsInQuestion = question.listItems.filter((listItem) => listItem.selected);

      return {
        id: question.framework_items?.id,
        question: question.id,
        selectedItemsInQuestion
      };
    });

    questions.map((question: Question) => {
      if (question.type != QuestionType.correlate) {
        return question;
      }

      selectedItemsInQuestion.map((selectedItems) => {
        if (selectedItems.id == question?.correlateWithId) {
          question.correlateWith = selectedItems.selectedItemsInQuestion;
        }

        if (selectedItems.id == question?.correlateToId) {
          question.itemsToCorrelate = selectedItems.selectedItemsInQuestion;
        }
      });
      return question;
    });

    setSelectedItems(selectedItemsInQuestion);
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setItems(questions[activeStep + 1].listItems);

    handleSelectedItems();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setItems(questions[activeStep - 1].listItems);

    handleSelectedItems();
  };

  const handleToggle = (id: string) => () => {
    const newListItems = items?.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setItems(newListItems);
    setQuestions((prevQuestions: Question[]) => {
      const newQuestion = prevQuestions.map((question: Question) => {
        if (question.title[i18next.language] === questions[activeStep].title[i18next.language]) {
          return { ...question, listItems: newListItems };
        }
        return question;
      });
      return newQuestion;
    });
  }

  const handleSuggestNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const SuggestNewModal = () => {
    return (
      <Modal.Root state={suggestNewModalState} id="suggestNew" title={t('add_ecos_btn')} handleClose={() => setSuggestNewModalState(false)}>
        <form onSubmit={handleSuggestNew}>
          <Modal.Text>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <Typography>
                  {t('modal_text.txt1')}
                </Typography>
                <Typography>
                  {t('modal_text.txt2')}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <TextField
                  fullWidth
                  required
                  id="orgName"
                  name="orgName"
                  label={t('modal_text.label_name')}
                  autoFocus
                />
              </Grid>

            </Grid>
          </Modal.Text>
          <Divider />
          <Modal.Actions handleClose={() => setSuggestNewModalState(false)}>
            <Button variant="contained" type="submit"><AddIcon /> {t('add_ecos_btn')}</Button>
            <Button variant="outlined" onClick={() => setSuggestNewModalState(false)}>{t('modal_text.cancel_btn')}</Button>
          </Modal.Actions>
        </form>
      </Modal.Root>
    );

  }

  return (
    <>
      <SuggestNewModal />
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
          <Typography variant='h4' sx={{ textAlign: 'center', width: '100%' }}>{questions[activeStep].title[i18next.language]}</Typography>
        </Paper>
        <Divider sx={{ marginTop: '1.5rem' }} />
        <Box sx={{ width: '100%', p: 2 }} >
          {(activeStep === maxSteps) ? (
            <Typography>{selectedItems[0].id}</Typography>
          ) : (
            ((questions[activeStep].type == QuestionType.select) ? <ListCheckbox listItems={items} handleToggle={handleToggle} /> : <CorrelateComponent items={questions[activeStep]} />)
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ margin: 'auto', marginTop: '1.3rem' }} onClick={()=>setSuggestNewModalState(true)}><AddIcon /> {t('suggest_new_btn')}</Button>
          </Box>
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
    </>
  );
}