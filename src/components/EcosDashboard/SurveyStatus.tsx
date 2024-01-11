import { Alert, AlertColor } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface SurveyStatusProps {
  status: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished' ;
}

export default function SurveyStatus({ status }: SurveyStatusProps) {
  
  const { t } = useTranslation('ecos_dashboard');

  const severityOptions: Record<SurveyStatusProps['status'], {color: AlertColor, text: string} > = {
    'not-started': {color: 'error', text: t('survey_status.not_started')},
    'waiting-for-answers': {color: 'info', text: t('survey_status.waiting_for_answers')},
    'in-analysis': {color: 'warning', text: t('survey_status.in_analysis')},
    'finished': {color: 'success', text: t('survey_status.finished')}
  };
 
  return (
    <Alert variant="filled" severity={severityOptions[status].color}>
      {severityOptions[status].text}
    </Alert>
  )
}