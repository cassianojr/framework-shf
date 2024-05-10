import { NewAnswer, NewAnswers } from '../../types/Answer.type'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Title from '../Dashboard/Title';
import i18next from 'i18next';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ViewAnswersComponentProps {
  answers: NewAnswers
}

interface RowType {
  id: string,
  name: string,
  answer ?: string,
  comment: string
}

export default function ViewAnswersComponent({ answers }: ViewAnswersComponentProps) {

  const { t } = useTranslation('ecos_survey');

  const AnswersDataGrid = (answer: NewAnswer) => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1, sortable: false, resizable: false },
      { field: 'name', headerName: t(`view_answers.name`), flex: 2.3, sortable: false, resizable: false },
      { field: 'answer', headerName: t(`view_answers.answer`), flex: 1, sortable: false, resizable: false },
      { field: 'comment', headerName: t(`view_answers.feedback`), flex: 4.3, sortable: false, resizable: false }
    ]

    const rows = answer.items.map((item) => {
      return {
        id: item.id,
        name: item.names[i18next.language],
        answer: (item.answer == 1) ? t('survey_options.agree'): t('survey_options.disagree'),
        comment: item.comment
      }
    })

    return createDataGrid(rows as RowType[], columns);
  }

  const OptionalAnswersDataGrid = (answer: NewAnswer) => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1, sortable: false, resizable: false },
      { field: 'name', headerName:  t(`view_answers.name`), flex: 3.3, sortable: false, resizable: false },
      { field: 'comment', headerName: t(`view_answers.feedback`), flex: 4.3, sortable: false, resizable: false }
    ]

    const rows = answer.items.map((item) => {
      return {
        id: item.ids[i18next.language],
        name: item.names[i18next.language],
        comment: item.comment
      }
    })

    return createDataGrid(rows as RowType[], columns);
  }

  const createDataGrid = (rows: RowType[], columns: GridColDef[]) =>{
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterPagination
        hideFooter
        columnHeaderHeight={40}
        getRowHeight={() => 'auto' as const}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: "clip",
            whiteSpace: "break-spaces"
          }
        }}
      />
    )
  }

  return (
    <>
      <Title>{t('view_answers.title')}</Title>
      <Divider sx={{m: '1.3rem'}} />
      {answers.answers.map((answer, index) => (
        <div key={answer.framework_item}>
          <Title>{t(`view_answers.${answer.question}.title`)}</Title>
          {AnswersDataGrid(answer)}
          <Title>{t(`view_answers.${answer.question}.critical`)}</Title>
          {OptionalAnswersDataGrid(answers.optionalAnswers[index])}
          <Divider sx={{m: '1.3rem'}} />
        </div>
      ))}
    </>
  )
}