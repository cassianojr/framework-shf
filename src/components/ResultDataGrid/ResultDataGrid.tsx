import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { Framework, FrameworkItem } from '../../types/Framework.type';
import { Typography } from '@mui/material';
import i18next from 'i18next';
import { ProgressBar } from './DataGridProgressBar';

interface ResultDataGridProps {
  frameworkComponent: Framework | undefined,
  columnType: 'likert' | 'result' 
}

export default function ResultDataGrid({ frameworkComponent, columnType }: ResultDataGridProps) {

  const calculatePercentValue = (params: GridRenderCellParams<FrameworkItem, number>, value: number) => {
    const disagree = params.row.disagree ?? 0;
    const totallyDisagree = params.row.totallyDisagree ?? 0;
    const totallyAgree = params.row.totallyAgree ?? 0;
    const agree = params.row.agree ?? 0;
    const neutral = params.row.neutral ?? 0;

    const totalVotes = agree+disagree+totallyDisagree+totallyAgree+neutral;

    return value / totalVotes;
  };
  
  const defaultColums = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 545,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <Typography>{params.value}</Typography>,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => params.row.names[i18next.language]
    }
  ]

  const likertColums = [
    ...defaultColums,
    {
      field: 'totallyDisagree',
      headerName: 'Discordo Totalmente',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        return calculatePercentValue(params, params.row.totallyDisagree ?? 0);
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
        return calculatePercentValue(params, params.row.disagree ?? 0);
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
        return calculatePercentValue(params, params.row.neutral ?? 0);
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
        return calculatePercentValue(params, params.row.agree ?? 0);
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
        return calculatePercentValue(params, params.row.totallyAgree ?? 0);
      }
    }
  ]

  const resultColumns =[
    ...defaultColums,
    {
      field: 'disagree',
      headerName: 'Discordo',
      width: 100,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <ProgressBar value={Number(params.value)} />,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        return calculatePercentValue(params, (params.row.disagree ?? 0)+(params.row.totallyDisagree ?? 0));
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
        return calculatePercentValue(params, (params.row.agree??0) + (params.row.totallyAgree ?? 0));
      }
    },
    {
      field: 'intepretation',
      headerName: 'Interpretação',
      width: 250,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => <Typography>{params.value}</Typography>,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => {
        const percentAgree = calculatePercentValue(params, (params.row.agree??0) + (params.row.totallyAgree ?? 0)) * 100;
        const percentDisagree = calculatePercentValue(params, (params.row.disagree ?? 0)+(params.row.totallyDisagree ?? 0)) * 100;

        
        if(percentAgree >= 80 || percentDisagree >= 80 ) return 'Consenso sólido';
        if(percentAgree >= 60 || percentDisagree >= 60) return 'Consenso';
        if(percentAgree < 60 || percentDisagree < 60) return 'Consenso não alcançado'

      }
    }
  ]

  const columns = columnType === 'likert' ? likertColums : resultColumns;

  return (
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
  )
}
