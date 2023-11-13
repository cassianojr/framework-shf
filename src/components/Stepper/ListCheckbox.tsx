import { InfoRounded } from '@mui/icons-material';
import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, IconButton, Button, Grid, Typography } from '@mui/material';
import i18next from 'i18next';
import { Modal } from '../Modal';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Question } from '../../types/Question.type';


interface ListData {
  listItems: ItemType[],
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>,
  questions: Question[],
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  activeStep: number,
  handleEdit: (id: string) => void
}

interface ItemType {
  id: string,
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  },
  selected: boolean,
  suggestion: boolean
}

interface InfoModalContentType {
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  }
}

export default function ListCheckbox(props: ListData) {
  const { t } = useTranslation('common');

  const { listItems, setItems, questions, setQuestions, handleEdit, activeStep } = props;
  const [infoModalState, setInfoModalState] = React.useState(false);
  const [infoModalContent, setInfoModalContent] = React.useState({
    names: {
      en: '',
      pt_br: ''
    },
    descriptions: {
      en: '',
      pt_br: ''
    }
  } as InfoModalContentType);

  const handleToggle = (id: string) => () => {
    const newListItems = listItems?.map((listItem) => {
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

  const handleDelete = (id: string) => {
    const newListItems = listItems.filter((listItem) => listItem.id !== id);
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

  const handleInfoClick = (item: ItemType) => {
    setInfoModalContent(item);
    setInfoModalState(true);
  }

  const InfoModal = () => {
    const title = infoModalContent.names[i18next.language];
    const description = infoModalContent.descriptions[i18next.language];

    return (
      <Modal.Root state={infoModalState} id="descriptionModal" title={title} handleClose={() => setInfoModalState(false)}>
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
        <Modal.Actions handleClose={() => setInfoModalState(false)}>
          <Button variant="outlined" onClick={() => setInfoModalState(false)}>{t('close_button')}</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  interface SuggestionActionsProps {
    item: ItemType;
  }

  const SuggestionActions = ({ item }: SuggestionActionsProps) => {
    //suggestion actions have two buttons: delete and edit icons with their respective actions
    return (
      <ListItemButton role={undefined} sx={{ padding: 0 }}>
        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item.id)}>
          <EditIcon sx={{ fontSize: '1.2rem' }} />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
          <DeleteIcon sx={{ fontSize: '1.2rem' }} />
        </IconButton>
      </ListItemButton>
    )
  }

  return (
    <>
      <InfoModal />
      <Container>
        <List dense disablePadding sx={{ width: '60%', margin: 'auto' }}>
          {listItems.map((item) => (
            <Box key={item.id}>
              <ListItem disablePadding disableGutters secondaryAction={item.suggestion && <SuggestionActions item={item} />}>
                <ListItemButton role={undefined} sx={{ padding: 0 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.selected}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleToggle(item.id)}
                      inputProps={{ 'aria-labelledby': item.names[i18next.language] }}
                    />
                  </ListItemIcon>
                  <ListItemText id={item.names[i18next.language]} primary={
                    <>
                      {item.names[i18next.language]}
                      <IconButton edge="end" aria-label="details" onClick={() => handleInfoClick(item)}>
                        <InfoRounded sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                    </>} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>

      </Container>
    </>
  )
}
