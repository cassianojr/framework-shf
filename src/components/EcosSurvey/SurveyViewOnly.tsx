import { InfoRounded } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import i18next from "i18next";
import React from 'react';
import { DataGrid, GridColDef, GridRenderEditCellParams } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { FrameworkItem } from "../../types/Framework.type";

interface SurveyViewOnlyProps {
  items: React.MutableRefObject<FrameworkItem[]>
}

export function SurveyViewOnly({ items }: SurveyViewOnlyProps) {

  const listItems = items.current;

  const { t } = useTranslation(['ecos_survey', 'common']);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, resizable: false },
    {
      field: 'name', headerName: t('item_name'), flex: 4.3, sortable: false, resizable: false, renderCell: (params: GridRenderEditCellParams<FrameworkItem, number>) => {
        const item = items.current.find((item) => item.ids[i18next.language] === params.id) ?? { ids: {}, names: {}, descriptions: {} } as FrameworkItem;
        return (
          <>
            <Tooltip arrow title={<p style={{ fontSize: '1rem' }}>{item.descriptions[i18next.language]}</p>} >
              <InfoRounded sx={{ color: 'primary.main', cursor: 'pointer' }} fontSize="small" />
            </Tooltip>
            <Typography sx={{marginLeft: '.3rem'}}>{item.names[i18next.language]}</Typography>
          </>)
      }
    }
  ]
  const rows = listItems.map((item) => {
    return {
      id: item.ids[i18next.language],
      name: item.names[i18next.language],
    }
  })

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterPagination
        hideFooter
        columnHeaderHeight={80}
        getRowHeight={() => 'auto' as const}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: '1.2rem'
          }
        }}
      />
    </>
  )
}

