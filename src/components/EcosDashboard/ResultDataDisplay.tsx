import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import i18next from 'i18next';
import { Framework, FrameworkItem } from '../../types/Framework.type';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProgressBar } from './DataGridProgressBar';


interface ResultDataDisplayProps {
  frameworkComponent: Framework | undefined,
  expanded?: boolean,
}

export default function ResultDataDisplay({ frameworkComponent, expanded = false }: ResultDataDisplayProps) {

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 545,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <Typography>{params.value}</Typography>,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => params.row.names[i18next.language]
    },
    {
      field: 'disagree',
      headerName: 'Discordo',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => (((params.row.disagree??0) / 2))
    },
    {
      field: 'agree',
      headerName: 'Concordo',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => (((params.row.agree??0) / 2))
      
    }
  ]

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
        <div style={{height: 300}}>
          <DataGrid
            rows={frameworkComponent?.items ?? []}
            columns={columns}
            sx={{
              '& .MuiDataGrid-columnHeaderTitle': {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: '1.2rem'
              }
            }}
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooterPagination
            hideFooter
          />
        </div>

      </AccordionDetails>
    </Accordion>
  )
}