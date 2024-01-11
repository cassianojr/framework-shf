import { Alert, AlertColor } from '@mui/material';

export interface SurveyStatusProps {
  status: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished' ;
}

export default function SurveyStatus({ status }: SurveyStatusProps) {

  const severityOptions: Record<SurveyStatusProps['status'], {color: AlertColor, text: string} > = {
    'not-started': {color: 'error', text: 'Não Iniciada'},
    'waiting-for-answers': {color: 'info', text: 'Aguardando Respostas'},
    'in-analysis': {color: 'warning', text: 'Aguardando Análise'},
    'finished': {color: 'success', text: 'Finalizada'}
  };
 

  return (
    <Alert variant="filled" severity={severityOptions[status].color}>
      {severityOptions[status].text}
    </Alert>
  )
}