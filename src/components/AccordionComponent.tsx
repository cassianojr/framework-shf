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

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props}/>
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

export default function AccordionComponent(props: AccordionComponentProps) {
  const { data } = props;
  
  const [expanded, setExpanded] = React.useState<string | false>(data[0].id);
  const [modalState, setModalState] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    title: '',
    body: '',
  });


  console.log(data);
  

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleButtonClick = (name: string, description: string) => {
    setModalContent({
      title: name,
      body: description,
    });

    setModalState(true);
  }


  return (
    <>
      <Modal open={modalState} handleClose={() => setModalState(false)} modalContent={modalContent} setOpen={setModalState} />
      {data.map((dataItem) => (
        <Accordion
          key={dataItem.id}
          expanded={expanded === dataItem.id}
          onChange={handleChange(dataItem.id)}
          id={dataItem.id}
          >
          <AccordionSummary
            aria-controls={`${dataItem.id}-content`}
            id={`${dataItem.id}-header`}
            sx={{
              backgroundColor: dataItem.headerColor,
              color: '#ffff',
              
            }} >
            <Typography>{dataItem.label}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{zIndex: 999}}>
            <AccordionList items={dataItem.items} handleButtonClick={handleButtonClick} />
          </AccordionDetails>
        </Accordion>
      ))}

    </>
  );
}