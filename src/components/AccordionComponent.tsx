import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import VirtualizedList from './VirtualizedList';
import TextModal from './TextModal';
import { Button } from '@mui/material';
import Singularizer from '../util/Singularizer';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';

import FormModal from './FormModal';
import ListModal from './ListModal';

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
    headerColor: string,
    description: string,
    items: {
      id: string,
      name: string,
      description: string
    }[]
  },
  children?: JSX.Element

}

export default function AccordionComponent(props: AccordionComponentProps) {
  const { data } = props;
  
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
      description: ''
    }]
  });

  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [descriptionModalContent, setDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });

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
    setItemDescriptionModalState(true);
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
    setListModalContent({
      id: data.id,
      title: data.label,
      items: data.items
    });
    setListModalState(true);

  }

  const childWithHandleItemClick = (props.children) ? React.cloneElement(props.children, { handleListItemClick }) : null;

  const buttonStyle = {
    marginRight: '1rem',
    fontSize: '.6rem',
    color: 'white',
    border: '1px solid white',
    height: '1.2rem',
    '&:hover': {
      color: 'white',
      border: '1px solid white',
    }
  }

  return (
    <>
      <TextModal modalState={itemDescriptionModalState} showEvaluate handleClose={() => setItemDescriptionModalState(false)} modalContent={itemDescriptionModalContent} setModalState={setItemDescriptionModalState} />
      <FormModal formModalState={formModalState} handleClose={() => setFormModalState(false)} setFormModalState={setFormModalState} modalContentForm={formModalContent} />
      <ListModal modalState={listModalState} setModalstate={setListModalState} handleClose={() => setListModalState(false)} modalContent={listModalContent} handleItemClick={handleListItemClick} />
      <TextModal modalState={descriptionModalState}  setModalState={setDescriptionModalState} handleClose={() => setDescriptionModalState(false)} modalContent={descriptionModalContent} />

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
            height: '1.5rem',
          }}>
          <Button sx={{ ...buttonStyle, fontSize: '.7rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }} variant="outlined" size="small" onClick={() => descriptionModalHandle(data.id, data.label, data.description)}>
            {data.label}
          </Button>
          <Button sx={{ ...buttonStyle, marginLeft: 'auto' }} variant="outlined" size="small" onClick={() => newSuggestionHandle(data.id, data.label)}>
            <AddIcon sx={{ fontSize: '1rem' }} />
            Suggest new
          </Button>
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
        <Button sx={{...buttonStyle, marginLeft: 'auto'}} variant="outlined" size="small" onClick={handleViewAll}>
          <FullscreenIcon sx={{ fontSize: '1rem' }} />
          View All
        </Button>
      </AccordionSummary>
    </>
  );
}