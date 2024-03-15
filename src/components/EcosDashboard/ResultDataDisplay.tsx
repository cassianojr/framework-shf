import { Accordion, AccordionDetails, AccordionSummary, Tab, Tabs, Typography } from '@mui/material';
import i18next from 'i18next';
import { Framework } from '../../types/Framework.type';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ResultDataGrid } from '../ResultDataGrid/ResultDataGrid';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';


interface ResultDataDisplayProps {
  frameworkComponent: Framework | undefined,
  expanded?: boolean,
  question: string
}

export default function ResultDataDisplay({ frameworkComponent, expanded = false, question }: ResultDataDisplayProps) {
  const { t } = useTranslation('ecos_dashboard');


  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }


  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

      >
        {value === index && (
          <Box sx={{ overflow: 'auto', height: 300 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {frameworkComponent?.labels[i18next.language]}
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ height: 400 }}>
          <Typography variant='h6'>{question}</Typography>
          <Box >
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="data display tabs">
              <Tab label={t('likert_scale_tab')} value={0} />
              <Tab label={t('result_tab')} value={1} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <ResultDataGrid frameworkComponent={frameworkComponent} columnType='likert' />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ResultDataGrid frameworkComponent={frameworkComponent} columnType='result' showColors />
          </TabPanel>

        </Box>
      </AccordionDetails>
    </Accordion>
  )
}