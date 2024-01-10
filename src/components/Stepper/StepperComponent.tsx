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
import CorrelateComponent, { CorrelateItems, CorrelateValues } from './CorrelateComponent';
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '../Modal';
import { Grid, Link } from '@mui/material';
import { Question, QuestionListItems, QuestionType } from '../../types/Question.type';
import i18next from 'i18next';
import SuggestNewModal from './SuggestNewModal';
import { Answer, Answers, Correlation } from '../../types/Answer.type';
import { AuthenticationContext, AuthenticationContextType } from '../../context/authenticationContext';
import { QuestionService } from '../../services/QuestionService';
import SnackBarComponent from '../SnackBarComponent';

interface StepData {
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}

export default function StepperComponent(props: StepData) {
  const { t } = useTranslation(['ecos_survey', 'dashboard', 'common']);
  const { getUser } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const user = getUser();

  const { questions, setQuestions } = props;


  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = React.useState([] as QuestionListItems[]);

  const [suggestNewModalState, setSuggestNewModalState] = React.useState(false);
  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [editSuggestionValues, setEditSuggestionValues] = React.useState({
    name: '',
    description: ''
  });

  const [snackBarState, setSnackBarState] = React.useState(false);

  const [correlateValues, setCorrelateValues] = React.useState<CorrelateValues[]>([]);

  const ecos_id = window.location.pathname.split('/')[2];

  const [answers, setAnswers] = React.useState([] as Answer[]);

  const [selectedItems, setSelectedItems] = React.useState(questions.map((question: Question) => {
    return {
      id: question.framework_items?.id,
      question: question.id,
      selectedItemsInQuestion: (question.listItems) ? question.listItems.filter((listItem) => listItem.selected) : []
    }
  }));

  const maxSteps = questions.length;


  function handleAnswers(selectedItems: { id: string | undefined; question: string; selectedItemsInQuestion: QuestionListItems[]; }[]): Answer[] {
    let newAnswer = {} as Answer;

    if (questions[activeStep].type != QuestionType.correlate) {

      newAnswer = {
        question_id: questions[activeStep].id,
        selectedItems: selectedItems[activeStep].selectedItemsInQuestion as QuestionListItems[],
        questionName: selectedItems[activeStep].id
      } as Answer;

    } else if (questions[activeStep].type == QuestionType.correlate) {

      const correlations = correlateValues.map((correlation) => {
        return {
          item: correlation.correlateWith,
          correlation_to: correlation.itemsToCorrelate
        }
      }) as Correlation[];

      newAnswer = {
        question_id: questions[activeStep].id,
        correlations
      } as Answer;
    }

    if (answers.length == 0) {
      setAnswers([newAnswer]);
    }

    const updatedAnswers = answers.map((answer) => {
      if (answer.question_id == newAnswer.question_id) {
        return newAnswer;
      }
      return answer;
    });

    // If the answer for the current question doesn't exist, add it
    if (!updatedAnswers.some((answer) => answer.question_id === newAnswer.question_id)) {
      updatedAnswers.push(newAnswer);
    }

    setAnswers(updatedAnswers);

    return updatedAnswers;
  }

  const handleSelectedItems = () => {
    const newSelectedItems = questions.map((question: Question) => {
      const selectedItemsInQuestion = question.listItems?.filter((listItem) => listItem.selected);

      return {
        id: question.framework_items?.id,
        question: question.id,
        selectedItemsInQuestion
      };
    });

    const newQuestions = questions.map((question: Question) => {
      if (question.type != QuestionType.correlate) {
        return question;
      }

      newSelectedItems.map((selectedItems) => {
        if (selectedItems.id == question?.correlateWithId) {
          question.correlateWith = selectedItems.selectedItemsInQuestion;
        }

        if (selectedItems.id == question?.correlateToId) {
          question.itemsToCorrelate = selectedItems.selectedItemsInQuestion;
        }
      });
      return question;

    });

    setQuestions(newQuestions);
    setSelectedItems(newSelectedItems);

    handleAnswers(newSelectedItems);

  }

  const handleNext = () => {
    handleSelectedItems();

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setItems(questions[activeStep + 1].listItems);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setItems(questions[activeStep - 1].listItems);

    handleSelectedItems();
  };

  const handleSave = () => {
    const answers = handleAnswers(selectedItems);

    const answer = {
      user_id: user.uid,
      ecossystem_id: ecos_id,
      answers
    } as Answers;

    QuestionService.saveAnswers(answer, (answerRef) => {
      setSnackBarState(true);

      setTimeout(() => {
        window.location.href = `/ecos-framework/${answerRef.id}`;
      }, 2000);
    }, () => console.log('error'));
  }

  React.useEffect(() => {
    setItems(questions[activeStep].listItems);

  }, [setItems, activeStep, questions, answers])

  const handleOpenEditSuggestionModal = (id: string) => {
    const item = items.find((item) => item.id === id);
    setEditSuggestionValues({
      name: item?.names[i18next.language] ?? '',
      description: item?.descriptions[i18next.language] ?? ''
    });
    setSuggestNewModalState(true);
  }

  const DescriptionModal = () => {
    const title = questions[activeStep]?.description_title?.[i18next.language] ?? '';
    const description = questions[activeStep]?.description?.[i18next.language] ?? '';
    return (
      <Modal.Root state={descriptionModalState} id="descriptionModal" title={title} handleClose={() => setSuggestNewModalState(false)}>
        <Modal.Text>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: '1%' }}>
              <Typography>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={() => setDescriptionModalState(false)}>
          <Button variant="outlined" onClick={() => setDescriptionModalState(false)}>{t('common:close_button')}</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  return (
    (items != undefined && items.length == 0) ? <></> : <>
      <SnackBarComponent snackBarState={snackBarState} setSnackBarState={setSnackBarState} text={t('snackbar_text')} severity='success' />
      <SuggestNewModal
        suggestNewModalState={suggestNewModalState}
        setSuggestNewModalState={setSuggestNewModalState}
        activeStep={activeStep}
        questions={questions}
        setQuestions={setQuestions}
        items={items}
        setItems={setItems}
        editSuggestionValues={editSuggestionValues}
      />
      <DescriptionModal />
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
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Link color="primary" aria-label="help" onClick={() => setDescriptionModalState(true)}>
            <Typography variant='h6' sx={{ cursor: 'pointer' }}>{questions[activeStep]?.description_title?.[i18next.language] ?? ''}</Typography>
          </Link>
        </Box>
        <Divider sx={{ marginTop: '1.5rem' }} />
        <Box sx={{ width: '100%', p: 2 }} >
          {(activeStep === maxSteps) ? (
            <Typography>{selectedItems[0].id}</Typography>
          ) : (
            ((questions[activeStep].type == QuestionType.select)
              ?
              <>
                <ListCheckbox listItems={items} setItems={setItems} questions={questions} setQuestions={setQuestions} activeStep={activeStep} handleEdit={handleOpenEditSuggestionModal} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant='contained' sx={{ margin: 'auto', marginTop: '1.3rem' }} onClick={() => { setSuggestNewModalState(true); setEditSuggestionValues({ name: '', description: '' }) }}><AddIcon /> {t('suggest_new_btn')}</Button>
                </Box>
              </>
              : <CorrelateComponent items={questions[activeStep] as CorrelateItems} values={correlateValues} setValues={setCorrelateValues} />)
          )}
        </Box>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ width: '50%', margin: 'auto' }}
          nextButton={
            !(activeStep === maxSteps - 1) ? (<Button
              size="large"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              variant='contained'
            >
              {t('next_btn')}
              <KeyboardArrowRight />
            </Button>) : <Button
              size="large"
              onClick={handleSave}
              variant='contained'>
              Salvar
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