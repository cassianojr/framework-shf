import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import VirtualizedList from './VirtualizedList';
import { Button, Divider, Typography } from '@mui/material';
import Singularizer from '../util/Singularizer';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';

import { Modal } from './Modal';
import SnackBarComponent from './SnackBarComponent';
import { FrameworkItem } from '../types/Framework.type';

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import {useTranslation} from "react-i18next";

import i18next from 'i18next';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface AccordionComponentProps {
  data: {
    id: string,
    label: string,
    labels: {
      [key: string]: string
    },
    headerColor: string,
    description: string,
    descriptions: {
      [key: string]: string
    },
    items: {
      id: string,
      name: string,
      description: string,
      ids: {
        [key: string]: string
      },
      names:{
        [key: string]: string
      },
      descriptions:{
        [key: string]: string
      },
    }[]
  },
  showSuggestions: boolean,
  children?: JSX.Element

}

export default function AccordionComponent(props: AccordionComponentProps) {
  const { data, showSuggestions } = props;

  const {t} = useTranslation(['framework', 'common']);

  const [expanded, setExpanded] = React.useState<string | false>(data.id);

  const [itemDescriptionModalState, setItemDescriptionModalState] = React.useState(false);
  const [itemDescriptionModalContent, setItemDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });

  const [formModalState, setFormModalState] = React.useState(false);
  const [formModalContent, setFormModalContent] = React.useState({
    id: '',
    title: ''
  });

  const [listModalState, setListModalState] = React.useState(false);

  const [listModalContent, setListModalContent] = React.useState({
    id: '',
    title: '',
    items: [{
      id: '',
      name: '',
      description: '',
      ids: {},
      names: {},
      descriptions: {}
    }]
  });

  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [descriptionModalContent, setDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });

  const [modalPersonalsocialState, setModalPersonalsocialState] = React.useState(false);
  const [modalPersonalsocialContent, setModalPersonalsocialContent] = React.useState({
    id: '',
    title: '',
    personalGroup: [] as FrameworkItem[],
    socialGroup: [] as FrameworkItem[]
  });

  const [backToListModalState, setBackToListModalState] = React.useState(false);
  const [backToPersonalSocialListModalState, setBackToPersonalSocialListModalState] = React.useState(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {

    if ((event.target as HTMLDivElement).tagName === 'BUTTON') {
      return;
    }

    setExpanded(newExpanded ? panel : false);
  };

  const handleListItemClick = (id: string, name: string, description: string) => {
    setItemDescriptionModalContent({
      id: id,
      title: name,
      body: description,
    });

    setListModalState(false);
    setModalPersonalsocialState(false)
    setItemDescriptionModalState(true);
  }
  const handleListItemModalClick = (id: string, name: string, description: string) => {
    setBackToListModalState(true);
    handleListItemClick(id, name, description);
  }

  const handleListPersonalSocialItemModalClick = (id: string, name: string, description: string) => {
    setBackToPersonalSocialListModalState(true);
    handleListItemClick(id, name, description);
  }

  const newSuggestionHandle = (id: string, title: string) => {
    setFormModalContent({
      id,
      title: Singularizer.singularizeSentence(title)
    });

    setFormModalState(true);
  }

  const descriptionModalHandle = (id: string, title: string, description: string) => {
    setDescriptionModalContent({
      id,
      title,
      body: description
    });

    setDescriptionModalState(true);
  }

  const handleViewAll = () => {
    if (data.id === 'social-human-factors') {
      setModalPersonalsocialContent({
        id: data.id,
        title: data.labels[i18next.language],
        personalGroup: data.items.slice(17),
        socialGroup: data.items.slice(0, 17)
      });

      setModalPersonalsocialState(true);
      return;
    }

    setListModalContent({
      id: data.id,
      title: data.labels[i18next.language],
      items: data.items
    });
    setListModalState(true);

  }

  const handleClose = () =>{
    setModalPersonalsocialState(false);
    setBackToListModalState(false);
    setBackToPersonalSocialListModalState(false);
    setListModalState(false);
    setDescriptionModalState(false);
    setItemDescriptionModalState(false);
  }

  const childWithHandleItemClick = (props.children) ? React.cloneElement(props.children, { handleListItemClick }) : null;

  const buttonStyle = {
    marginRight: '1rem',
    fontSize: '.8rem',
    color: 'white',
    border: '1px solid white',
    height: '1.2rem',
    '&:hover': {
      color: 'white',
      border: '1px solid white',
    }
  }

  const descriptionModal = (
    <Modal.Root state={descriptionModalState} handleClose={() => setDescriptionModalState(false)} id={descriptionModalContent.id} title={descriptionModalContent.title}>
      <Divider />
      <Modal.Text content={descriptionModalContent.body} />
      <Modal.Actions handleClose={handleClose} />
    </Modal.Root>
  );

  const itemDescriptionModal = (
    <Modal.Root state={itemDescriptionModalState} handleClose={handleClose} id={itemDescriptionModalContent.id} title={itemDescriptionModalContent.title}>
      <Modal.Text content={itemDescriptionModalContent.body} />
      <Divider />
      <Modal.Actions handleClose={handleClose}>

        <Modal.EvaluateAction id={itemDescriptionModalContent.id} handleClose={()=>{
          setItemDescriptionModalState(false);
          setBackToListModalState(false);
          setBackToPersonalSocialListModalState(false);
        }}>
          {(backToListModalState || backToPersonalSocialListModalState)?
            <Button variant="outlined" size="small" onClick={() => {
              setItemDescriptionModalState(false);
              if(backToPersonalSocialListModalState){
                setModalPersonalsocialState(true);
                return;
              }

              setBackToListModalState(false);
              setBackToPersonalSocialListModalState(false);

              setListModalState(true);
            }}>
              {t('common:back_button')} </Button>
          :<></>}

        </Modal.EvaluateAction>
      </Modal.Actions>
    </Modal.Root>
  );

  const listModal = (
    <Modal.Root state={listModalState} handleClose={handleClose} id={listModalContent.id} title={listModalContent.title}>
      <Modal.List items={listModalContent.items} handleItemClick={handleListItemModalClick} />
      <Divider />
      <Modal.Actions handleClose={handleClose} />
    </Modal.Root>
  );

  const modalPersonalsocial = (
    <Modal.Root state={modalPersonalsocialState} handleClose={handleClose} id={modalPersonalsocialContent.id} title={modalPersonalsocialContent.title}>
      <Typography variant='h6' style={{ paddingInline: '1rem' }}><GroupIcon sx={{ fontSize: '1.2rem' }} /> {t('social_group_label')}</Typography>
      <Modal.List items={modalPersonalsocialContent.socialGroup} handleItemClick={handleListPersonalSocialItemModalClick} />
      <Typography variant='h6' style={{ paddingInline: '1rem' }}><PersonIcon sx={{ fontSize: '1.2rem' }} /> {t('personal_group_label')}</Typography>
      <Modal.List items={modalPersonalsocialContent.personalGroup} handleItemClick={handleListPersonalSocialItemModalClick} />
      <Divider />
      <Modal.Actions handleClose={handleClose} />
    </Modal.Root>
  );

  const snackBarText = t('snackbar_text');
  const [snackBarState, setSnackBarState] = React.useState(false);
  const formModal = (
    <Modal.Root state={formModalState} handleClose={() => setFormModalState(false)} id={formModalContent.id} title={formModalContent.title}>
      <Modal.Form setFormModalState={setFormModalState} title={formModalContent.title} setSnackBarState={setSnackBarState} />
      <Modal.Actions handleClose={() => setFormModalState(false)} />
    </Modal.Root>
  );
  return (
    <>
      <SnackBarComponent snackBarState={snackBarState} setSnackBarState={setSnackBarState} text={snackBarText} severity='success' />
      {itemDescriptionModal}
      {formModal}
      {listModal}
      {modalPersonalsocial}
      {descriptionModal}

      <Accordion
        key={data.id}
        expanded={expanded === data.id}
        onChange={handleAccordionChange(data.id)}
        id={data.id}
      >
        <AccordionSummary
          aria-controls={`${data.id}-content`}
          id={`${data.id}-header`}
          sx={{
            backgroundColor: data.headerColor,
            color: '#ffff',
            minHeight: '2rem',
            height: '2rem',
          }}>
          <Button sx={{ ...buttonStyle, fontSize: '.68rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }} variant="outlined" size="small" onClick={() => descriptionModalHandle(data.id, data.labels[i18next.language], data.descriptions[i18next.language])}>
            {data.labels[i18next.language]}
          </Button>
          {showSuggestions ? <Button sx={{ ...buttonStyle, marginLeft: 'auto' }} variant="outlined" size="small" onClick={() => newSuggestionHandle(data.id, data.labels[i18next.language])}>
            <AddIcon sx={{ fontSize: '1rem' }} />
            {t('suggest_new_button')}
          </Button> : <></>}
          
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0' }}>
          {childWithHandleItemClick ?? <VirtualizedList items={data.items} handleListItemClick={handleListItemClick} height={75} />}
        </AccordionDetails>
      </Accordion>
      <AccordionSummary
        sx={{
          backgroundColor: data.headerColor,
          color: '#ffff',
          minHeight: '1.5rem',
          height: '1.5rem',
        }}
        expandIcon={<></>}
      >
        <Button sx={{ ...buttonStyle, marginLeft: 'auto' }} variant="outlined" size="small" onClick={handleViewAll}>
          <FullscreenIcon sx={{ fontSize: '1rem' }} />
          {t('view_all_button')}
        </Button>
      </AccordionSummary>
    </>
  );
}