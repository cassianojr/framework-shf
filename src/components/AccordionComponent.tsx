import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VirtualizedList from './VirtualizedList';
import TextModal from './TextModal';
import { Button } from '@mui/material';
import Singularizer from '../util/Singularizer';

import AddIcon from '@mui/icons-material/Add';

import FormModal from './FormModal';

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

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    if ((event.target as HTMLDivElement).tagName === 'BUTTON') {
      return;
    }
    setExpanded(newExpanded ? panel : false);
  };

  const handleButtonClick = (id: string, name: string, description: string) => {
    setItemDescriptionModalContent({
      id: id,
      title: name,
      body: description,
    });

    setItemDescriptionModalState(true);
  }

  const newSuggestionHandle = (id: string, title: string) => {

    setFormModalContent({
      id,
      title: Singularizer.singularizeSentence(title)
    });

    setFormModalState(true);
  }

  const childWithHandleItemClick = (props.children) ? React.cloneElement(props.children, { handleListItemClick: handleButtonClick }) : null;

  return (
    <>
      <TextModal modalState={itemDescriptionModalState} handleClose={() => setItemDescriptionModalState(false)} modalContent={itemDescriptionModalContent} setModalState={setItemDescriptionModalState} />
      <FormModal formModalState={formModalState} handleClose={() => setFormModalState(false)} setFormModalState={setFormModalState} modalContentForm={formModalContent} />
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
          <Typography sx={{ fontSize: '.8rem', display: 'flex', alignItems: 'center' }}>{data.label}</Typography>
          <Button sx={{
            marginLeft: 'auto',
            marginRight: '1rem',
            fontSize: '.8rem',
            color: 'white',
            border: '1px solid white',
            '&:hover': {
              color: 'white',
              border: '1px solid white',
            }
          }} variant="outlined" size="small" onClick={() => newSuggestionHandle(data.id, data.label)}>
            <AddIcon sx={{ fontSize: '1rem' }} />
            Suggest new
          </Button>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0' }}>
          {childWithHandleItemClick ?? <VirtualizedList items={data.items} handleListItemClick={handleButtonClick} height={120} />}

        </AccordionDetails>
      </Accordion>

    </>
  );
}