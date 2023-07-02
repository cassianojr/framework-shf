import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Framework } from '../types/Framework.type';
import { FirebaseService } from '../services/FirebaseService';
import FrameworkRatingsList from './FrameworkRatingsList';
import { RatingType } from '../types/Rating.type';

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

export default function FrameworkRatings() {
  const [frameworkData, setFrameworkData] = React.useState<Framework[]>([]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  React.useEffect(() => {
    FirebaseService.getFrameworkData((frameworkData: Framework[]) => {
      FirebaseService.getRatings((ratings: RatingType[]) => {

        frameworkData.forEach((frameworkItem: Framework) => {
          frameworkItem.items.forEach((item) => {
            const ratingsItems = ratings.filter((rating) => rating.name === item.id);
            item.rating = ratingsItems.reduce((acc, rating) => (rating.rating == null) ? 0 : acc + rating.rating, 0) / ratingsItems.length;
          });
        });

        setFrameworkData(frameworkData);
      });
    });
  }, [setFrameworkData]);

  return (
    <div>
      {frameworkData.map((row) => (
        <Accordion expanded={expanded === row.id} onChange={handleChange(row.id)} key={row.id}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{row.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FrameworkRatingsList items={row.items} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}