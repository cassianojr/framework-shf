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
import { Grid, Link, TextField, TextareaAutosize } from '@mui/material';
import { Question, QuestionListItems, QuestionType } from '../../types/Question.type';
import i18next from 'i18next';
import Singularizer from '../../util/Singularizer';

interface StepData {
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}

export default function StepperComponent(props: StepData) {
  const { t } = useTranslation(['ecos_survey', 'dashboard', 'common']);

  const { questions, setQuestions } = props;


  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = React.useState([] as QuestionListItems[]);

  const [suggestNewModalState, setSuggestNewModalState] = React.useState(false);
  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [editSuggestionValues, setEditSuggestionValues] = React.useState({
    name: '',
    description: ''
  });


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
      const selectedItemsInQuestion = question.listItems?.filter((listItem) => listItem.selected);

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


  const handleDeleteSuggestion = (id: string) => {
    const newListItems = items.filter((listItem) => listItem.id !== id);
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

  React.useEffect(() => {
    setItems(questions[activeStep].listItems);
  }, [setItems, activeStep, questions])

  const handleOpenEditSuggestionModal = (id: string) => {
    const item = items.find((item) => item.id === id);
    setEditSuggestionValues({
      name: item?.names[i18next.language] ?? '',
      description: item?.descriptions[i18next.language] ?? ''
    });
    setSuggestNewModalState(true);
  }


  const SuggestNewModal = () => {
    const title = questions[activeStep]?.suggest_title?.[i18next.language] ?? '';
    const description = questions[activeStep]?.suggest_description?.[i18next.language] ?? '';
    const item_name = questions[activeStep]?.framework_items?.labels?.[i18next.language] ?? '';

    const [suggestionName, setSuggestionName] = React.useState(editSuggestionValues.name);
    const [descriptionValue, setDescriptionValue] = React.useState(editSuggestionValues.description);

    const isEdit = (editSuggestionValues.name !== '' && editSuggestionValues.description !== '')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setSuggestionName(name === 'suggestionName' ? value : suggestionName);
      setDescriptionValue(name === 'description' ? value : descriptionValue);
    }

    const handleEditSuggestion = (suggestName: string, suggestDescription: string) => {
      if (!isEdit) {
        return undefined;
      }

      const itemToEdit = items.find((item) => item.id === editSuggestionValues.name);

      if (itemToEdit === undefined) return;

      itemToEdit.id = suggestName;
      itemToEdit.names['pt_br'] = suggestName;
      itemToEdit.names['en'] = suggestName;

      itemToEdit.descriptions['pt_br'] = suggestDescription;
      itemToEdit.descriptions['en'] = suggestDescription;

      setSuggestionName('');
      setDescriptionValue('');

      return itemToEdit;
    }

    const handleSuggestNew = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const suggestName = e.currentTarget.suggestionName.value;
      const description = e.currentTarget.description.value;

      const itemToEdit = handleEditSuggestion(suggestName, description);
      const newListItems = [...items, { id: suggestName, names: { en: suggestName, pt_br: suggestName }, descriptions: { en: description, pt_br: description }, selected: true, suggestion: true }];

      const item = (!isEdit && !itemToEdit) ? newListItems : items;

      setItems(item);
      setQuestions((prevQuestions: Question[]) => {
        const newQuestion = prevQuestions.map((question: Question) => {
          if (question.title[i18next.language] === questions[activeStep].title[i18next.language]) {
            return { ...question, listItems: item };
          }
          return question;
        });
        return newQuestion;
      });

      setSuggestNewModalState(false);

      setSuggestionName('');
      setDescriptionValue('');
    }


    return (
      <Modal.Root state={suggestNewModalState} id="suggestNew" title={title} handleClose={() => setSuggestNewModalState(false)}>
        <form onSubmit={handleSuggestNew}>
          <Modal.Text>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <Typography>
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <TextField
                  fullWidth
                  required
                  id="suggestionName"
                  name="suggestionName"
                  value={suggestionName}
                  label={Singularizer.singularizeSentence(item_name)}
                  onChange={handleChange}
                  autoFocus
                />
                <TextareaAutosize
                  style={{ width: '100%', marginTop: '1rem' }}
                  minRows={3}
                  placeholder={t('common:textarea_placeholder')}
                  id="description"
                  name="description"
                  value={descriptionValue}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Modal.Text>
          <Divider />
          <Modal.Actions handleClose={() => setSuggestNewModalState(false)}>
            <Button variant="contained" type="submit"><AddIcon /> {(isEdit) ? t('common:save_btn') : title}</Button>
            <Button variant="outlined" onClick={() => setSuggestNewModalState(false)}>{t('common:close_button')}</Button>
          </Modal.Actions>
        </form>
      </Modal.Root>
    );
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
    <>
      <SuggestNewModal />
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
                <ListCheckbox listItems={items} handleToggle={handleToggle} handleDelete={handleDeleteSuggestion} handleEdit={handleOpenEditSuggestionModal} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant='contained' sx={{ margin: 'auto', marginTop: '1.3rem' }} onClick={() => { setSuggestNewModalState(true); setEditSuggestionValues({ name: '', description: '' }) }}><AddIcon /> {t('suggest_new_btn')}</Button>
                </Box>
              </>
              : <CorrelateComponent items={questions[activeStep]} />)
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
    </>
  );
}