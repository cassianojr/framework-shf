import { Badge, Button, Card, CardActions, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface EcosCardProps {
  ecosName: string,
  ecosStatus: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished',
  ecosAnswers: number | undefined,
  ecosId: string
}



function EcosCard({ ecosName, ecosStatus, ecosAnswers, ecosId }: EcosCardProps) {

  const { t } = useTranslation(['ecos_dashboard', 'dashboard']);

  const severityOptions: Record<EcosCardProps['ecosStatus'], { color: string, text: string, icon: ReactElement }> = {
    'not-started': { color: 'rgb(211, 47, 47)', text: t('survey_status.not_started'), icon: <NotStartedIcon /> },
    'waiting-for-answers': { color: 'rgb(2, 136, 209)', text: t('survey_status.waiting_for_answers'), icon: <HourglassEmptyIcon /> },
    'in-analysis': { color: 'rgb(237, 108, 2)', text: t('survey_status.in_analysis'), icon: <AnalyticsIcon /> },
    'finished': { color: 'rgb(46, 125, 50)', text: t('survey_status.finished'), icon: <CheckCircleOutlineIcon /> }
  };

  const answers = (ecosAnswers === undefined) ? 0 : ecosAnswers;

  const card = (
    <React.Fragment>
      <CardContent>
        <Grid container spacing={2} justifyContent={'space-between'} sx={{ minHeight: '4rem' }}>
          <Grid item xs={1} alignContent={'center'}>
            {severityOptions[ecosStatus].icon}
          </Grid>
          <Grid item xs={5} alignContent={'center'}>
            <Typography sx={{ fontSize: 14 }} color={`${severityOptions[ecosStatus].color}`} gutterBottom fontWeight={'bold'}>
              {severityOptions[ecosStatus].text}
            </Typography>
          </Grid>
          <Grid item xs={3} alignContent={'center'}>
            <Badge badgeContent={answers.toString()}  color="primary">
              <QuestionAnswerIcon color="action" />
            </Badge>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant="h6" component="div" sx={{ minHeight: '2rem' }} mt={1}>
          {ecosName}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xs={4}>
            <Button size="small" component={Link} href={`/ecos-dashboard/${ecosId}`}>{t('dashboard:view_search')}</Button>
          </Grid>
          <Grid item xs={4}>
            <Button size="small" ><DeleteIcon sx={{ color: 'red', fontSize: '1.5rem' }} /></Button>
          </Grid>
        </Grid>
      </CardActions>

    </React.Fragment>
  )

  return (
    <Card variant='outlined' style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>{card}</Card>
  )
}

export default EcosCard