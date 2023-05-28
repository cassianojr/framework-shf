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
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


import GroupIcon from '@mui/icons-material/Group';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

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

export default function AccordionComponent(props: AccordionComponentProps) {
  const { data } = props;

  const [expanded, setExpanded] = React.useState<string | false>(data[0].id);
  const [modalState, setModalState] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
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

  const [socialGroupOpen, setSocialGroupOpen] = React.useState(true);
  const handleSocialGroupClick = () => {
    setSocialGroupOpen(!socialGroupOpen);
  };

  const [personalGroupOpen, setPersonalGroupOpen] = React.useState(false);
  const handlePersonalGroupClick = () => {
    setPersonalGroupOpen(!personalGroupOpen);
  };

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
          <AccordionDetails sx={{ padding: '0' }}>
            {dataItem.id === 'item2' ? (
              <>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                  <ListItemButton onClick={handleSocialGroupClick} divider={true}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Social Group" primaryTypographyProps={{fontWeight:'bold'}}/>
                    {socialGroupOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={socialGroupOpen} timeout="auto" unmountOnExit>
                    <AccordionList items={dataItem.items.slice(0, 17)} handleButtonClick={handleButtonClick} />
                  </Collapse>

                  <ListItemButton onClick={handlePersonalGroupClick} divider={true} >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Personal Group" primaryTypographyProps={{fontWeight:'bold'}}/>
                    {personalGroupOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={personalGroupOpen} timeout="auto" unmountOnExit>
                    <AccordionList items={dataItem.items.slice(17)} handleButtonClick={handleButtonClick} />
                  </Collapse>
                </List>

              </>) : <AccordionList items={dataItem.items} handleButtonClick={handleButtonClick} />}


          </AccordionDetails>
        </Accordion>
      ))}

    </>
  );
}