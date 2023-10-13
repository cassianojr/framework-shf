import { Button, Divider, Grid, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Modal } from "../Modal";
import Singularizer from "../../util/Singularizer";
import { Question, QuestionListItems } from "../../types/Question.type";
import i18next from "i18next";
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";
import React from "react";

interface SuggestModalProps{
    suggestNewModalState: boolean,
    setSuggestNewModalState: React.Dispatch<React.SetStateAction<boolean>>,
    activeStep: number,
    questions: Question[],
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
    items: QuestionListItems[],
    setItems: React.Dispatch<React.SetStateAction<QuestionListItems[]>>
    editSuggestionValues: {
        name: string,
        description: string
    },

}

export default function SuggestNewModal(props:SuggestModalProps){
    const { t } = useTranslation('common');

    const {suggestNewModalState, setSuggestNewModalState, activeStep, questions, setQuestions, items, setItems, editSuggestionValues} = props;

    const title = questions[activeStep]?.suggest_title?.[i18next.language] ?? '';
    const description = questions[activeStep]?.suggest_description?.[i18next.language] ?? '';
    const item_name = questions[activeStep]?.framework_items?.labels?.[i18next.language] ?? '';

    const [suggestionName, setSuggestionName] = React.useState('');
    const [descriptionValue, setDescriptionValue] = React.useState('');

    const isEdit = (editSuggestionValues.name !== '' && editSuggestionValues.description !== '');


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

    React.useEffect(() => {
        setSuggestionName(editSuggestionValues.name);
        setDescriptionValue(editSuggestionValues.description);
    }, [setDescriptionValue, setSuggestionName, editSuggestionValues.name, editSuggestionValues.description])
    

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
                  placeholder={t('textarea_placeholder')}
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
            <Button variant="contained" type="submit"><AddIcon /> {(isEdit) ? t('save_btn') : title}</Button>
            <Button variant="outlined" onClick={() => setSuggestNewModalState(false)}>{t('close_button')}</Button>
          </Modal.Actions>
        </form>
      </Modal.Root>
    );
  }
