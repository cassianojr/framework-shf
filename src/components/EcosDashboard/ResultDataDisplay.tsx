import { Badge, Button, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Tab, Tabs, Typography } from '@mui/material';
import i18next from 'i18next';
import { Framework, FrameworkItem } from '../../types/Framework.type';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SentimentChart from './SentimentChart';
import ResultChart from './ResultChart';
import { Modal } from '../Modal';


interface ResultDataDisplayProps {
  frameworkComponent: Framework,
}

export default function ResultDataDisplay({ frameworkComponent }: ResultDataDisplayProps) {
  const { t } = useTranslation('ecos_dashboard');

  const findFirstSelectedIndex = (items: Array<FrameworkItem>) => {
    return items.findIndex(item => item.selected);
  }

  const [tabValue, setTabValue] = React.useState(findFirstSelectedIndex(frameworkComponent.items));
  const [commentModalState, setCommentModalState] = React.useState(false);

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
        style={{ width: '100%' }}
      >
        {value === index && (
          <Box sx={{ overflow: 'auto', height: 450 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const defaultPaperStyle = {
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    mt: 2
  }

  interface CommentsModalProps {
    title: string,
    frameworkItem: FrameworkItem,
  }
  const CommentsModal = ({ title, frameworkItem }: CommentsModalProps) => {
    return (
      <Modal.Root state={commentModalState} title={title} id={`comment-modal-${frameworkItem.id}`} handleClose={() => setCommentModalState(false)}>
        <Container>
          <List dense>
            {frameworkItem.optionalAnswer ?
              frameworkItem.optionalAnswer?.comments.map((comment, index) => (
                <ListItem key={index} divider={true}>
                  <ListItemText>{comment}</ListItemText>
                </ListItem>
              ))
              :
              frameworkItem.answer?.comments.map((comment, index) => (
                <ListItem key={index} divider={true}>
                  <ListItemText>{comment}</ListItemText>
                </ListItem>
              ))}
          </List>
        </Container>
        <Modal.Actions handleClose={() => setCommentModalState(false)}>
          <Button onClick={() => setCommentModalState(false)}>Fechar</Button>
        </Modal.Actions>
      </Modal.Root>
    )
  }

  const handleViewComments = () => {
    setCommentModalState(true);
  }

  frameworkComponent.items.sort((a, b) => (a.names[i18next.language] > b.names[i18next.language]) ? 1 : (b.names[i18next.language] > a.names[i18next.language]) ? -1 : 0);

  interface DataTabPanelProps {
    item: FrameworkItem,
    index: number
  }
  const DataTabPanel = ({ item, index }: DataTabPanelProps) => {
    return (
      <TabPanel value={tabValue} index={index}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ textAlign: 'center', width: '100%' }}>Resultados para {item.names[i18next.language]}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ResultChart frameworkItem={item} />
          </Grid>
          <Grid item xs={6}>
            <SentimentChart frameworkItem={item} />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CommentsModal
            title={`Comentários para ${item.names[i18next.language]}`}
            frameworkItem={item}
          />
          <Button variant='contained' onClick={handleViewComments}>Visualizar comentários</Button>
        </Box>
      </TabPanel>
    );
  }

  return (
    !frameworkComponent ? <Typography>{t('no_data')}</Typography> :
      <Paper sx={defaultPaperStyle}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 450 }}>
          <Tabs
            orientation="vertical"
            variant='scrollable'
            value={tabValue}
            onChange={handleTabChange}
            aria-label="result data tab"
            sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
          >
            {frameworkComponent.items.map((item, index) => (
              item.selected ? (<Tab
                key={item.id}
                label={item.names[i18next.language]}
                {...a11yProps(index)}
                value={index}
              />) : null
            ))}

            <Divider>itens críticos</Divider>
            {frameworkComponent.items.map((item, index) => (
              item.optionalAnswer ? (<Tab
                key={item.id}
                label={item.names[i18next.language]}
                {...a11yProps(index)}
                value={index}
                icon={<Badge badgeContent={item.optionalAnswer.agree + item.optionalAnswer.disagree} sx={{ pl: 0.5 }} color="primary" />}
                iconPosition='end'
              />) : null
            ))}
          </Tabs>

          {frameworkComponent.items.map((item, index) => (
            item.selected ? (
              <DataTabPanel key={item.id} item={item} index={index} />
            ) : null
          ))}

          {frameworkComponent.items.map((item, index) => (
            item.optionalAnswer ? (
              <DataTabPanel key={item.id} item={item} index={index} />
            ) : null
          ))}

        </Box>
      </Paper >
  )
}