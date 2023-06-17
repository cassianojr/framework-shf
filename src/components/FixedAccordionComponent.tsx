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
import AddIcon from '@mui/icons-material/Add';
import FormModal from './FormModal';
import Singularizer from '../util/Singularizer';
import ListModal from './ListModal';
import TextModal from './TextModal';
import { Button } from '@mui/material';

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
  }

}

export default function FixedAccordionComponent(props: AccordionComponentProps) {
  const { data } = props;

  // const [expanded, setExpanded] = React.useState<string | false>(data[0].id);
  const [itemDescriptionModalState, setItemDescriptionModalState] = React.useState(false);

  const [modalFormState, setModalFormState] = React.useState(false);
  const [listModalState, setListModalState] = React.useState(false);

  const [itemDescriptionModalContent, setItemDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });
  const [modalContentForm, setModalContentForm] = React.useState({
    id: '',
    title: ''
  });
  const [listModalContent, setListModalContent] = React.useState({
    id: '',
    title: '',
    items: [{
      id: '',
      name: '',
      description: ''
    }]
  });

  const handleChange = () => (event: React.SyntheticEvent) => {
    if ((event.target as HTMLDivElement).tagName === 'BUTTON') {
      return;
    }
    setListModalContent({
      id: data.id,
      title: data.label,
      items: data.items
    });
    setListModalState(true);
    // setExpanded(newExpanded ? panel : false);
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
    setModalContentForm({
      id,
      title: Singularizer.singularizeSentence(title)
    });
    setModalFormState(true);
  }

  return (
    <>
      <TextModal modalState={itemDescriptionModalState} setModalState={setItemDescriptionModalState} handleClose={()=>setItemDescriptionModalState(false)} modalContent={itemDescriptionModalContent}/>
      <ListModal modalState={listModalState} setModalstate={setListModalState} handleClose={()=>setListModalState(false)} modalContent={listModalContent} handleItemClick={handleListItemClick}/>
      <FormModal formModalState={modalFormState} handleClose={()=>setModalFormState(false)} setFormModalState={setModalFormState} modalContentForm={modalContentForm} />
     
        <Accordion
          key={data.id}
          expanded={true}
          onChange={handleChange()}
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
            <VirtualizedList items={data.items} handleListItemClick={handleListItemClick} height={120}/>
          </AccordionDetails>
        </Accordion>
    </>
  );
}