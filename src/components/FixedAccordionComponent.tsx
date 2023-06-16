import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccordionList from './AccordionList';
import Modal from './Modal';
import { Button} from '@mui/material';


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
  }[]

}

export default function FixedAccordionComponent(props: AccordionComponentProps) {
  const { data } = props;

  const [expanded, setExpanded] = React.useState<string | false>(data[0].id);
  const [modalState, setModalState] = React.useState(false);
  const [modalFormState, setModalFormState] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });
  const [modalContentForm, setModalContentForm] = React.useState({
    id: '',
    title: ''
  });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    if ((event.target as HTMLDivElement).tagName === 'BUTTON') {
      return;
    }
    
    
    setExpanded(newExpanded ? panel : false);
  };

  const handleButtonClick = (id: string, name: string, description: string) => {
    setModalContent({
      id: id,
      title: name,
      body: description,
    });

    setModalState(true);
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
      <Modal open={modalState} handleClose={() => setModalState(false)} modalContent={modalContent} setOpen={setModalState} />
      <FormModal open={modalFormState} handleClose={() => setModalFormState(false)} setOpen={setModalFormState} modalContent={modalContentForm} />
      {data.map((dataItem) => (
        <Accordion
          key={dataItem.id}
          expanded={true}
          onChange={handleChange(dataItem.id)}
          id={dataItem.id}
        >
          <AccordionSummary
            aria-controls={`${dataItem.id}-content`}
            id={`${dataItem.id}-header`}
            sx={{
              backgroundColor: dataItem.headerColor,
              color: '#ffff',
              minHeight: '2.5rem',
              height: '2.5rem',
            }}>
            <Typography sx={{ fontSize: '.8rem', display: 'flex', alignItems: 'center' }}>{dataItem.label}</Typography>
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
            }} variant="outlined" size="small" onClick={() => newSuggestionHandle(dataItem.id, dataItem.label)}>
              <AddIcon sx={{ fontSize: '1rem' }} />
              Suggest new
            </Button>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0' }}>
            <AccordionList items={dataItem.items} handleButtonClick={handleButtonClick} />
          </AccordionDetails>
        </Accordion>
      ))}

    </>
  );
}