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

  // 5 - concordo totalmente    1 33%
  // 4 - concordo              1 33%


  // 3 - nem concordo nem discordo 0
  // 2 - discordo              1 33%
  // 1 - discordo totalmente   0


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
      field: 'totallyDisagree',
      headerName: 'Discordo Totalmente',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        const disagree = params.row.disagree ?? 0;
        const totallyDisagree = params.row.totallyDisagree ?? 0;
        const totallyAgree = params.row.totallyAgree ?? 0;
        const agree = params.row.agree ?? 0;
        const neutral = params.row.neutral ?? 0;

        const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;
        
        return totallyDisagree / totalVotes;
      }
    },
    {
      field: 'disagree',
      headerName: 'Discordo',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        const disagree = params.row.disagree ?? 0;
        const totallyDisagree = params.row.totallyDisagree ?? 0;
        const totallyAgree = params.row.totallyAgree ?? 0;
        const agree = params.row.agree ?? 0;
        const neutral = params.row.neutral ?? 0;

        const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;
        
        return disagree / totalVotes;
      }
    },
    {
      field: 'neutral',
      headerName: 'Não concordo nem discordo',
      width: 120,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        const disagree = params.row.disagree ?? 0;
        const totallyDisagree = params.row.totallyDisagree ?? 0;
        const totallyAgree = params.row.totallyAgree ?? 0;
        const agree = params.row.agree ?? 0;
        const neutral = params.row.neutral ?? 0;

        const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;
        
        return neutral / totalVotes;
      }
    },
    {
      field: 'agree',
      headerName: 'Concordo',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) =>{
        const totallyDisagree = params.row.totallyDisagree ?? 0;
        const disagree = params.row.disagree ?? 0;
        const neutral = params.row.neutral ?? 0;
        const agree = params.row.agree ?? 0;
        const totallyAgree = params.row.totallyAgree ?? 0;

        const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;
        
        return agree / totalVotes;
      }

    },
    {
      field: 'totallyAgree',
      headerName: 'Concordo Totalmente',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) =>{
        const totallyDisagree = params.row.totallyDisagree ?? 0;
        const disagree = params.row.disagree ?? 0;
        const neutral = params.row.neutral ?? 0;
        const agree = params.row.agree ?? 0;
        const totallyAgree = params.row.totallyAgree ?? 0;

        const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;
        
        return totallyAgree / totalVotes;
      }

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
        <div style={{ height: 300 }}>
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