import { InfoRounded } from "@mui/icons-material";
import { Radio, Tooltip, Typography } from "@mui/material";
import i18next from "i18next";
import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRenderEditCellParams } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { FrameworkItem } from "../../types/Framework.type";
import CommentIcon from '@mui/icons-material/Comment';
import SurveyCommentModal from "./SurveyCommentModal";

interface SurveyOptionsDataTableProps {
  items: React.MutableRefObject<FrameworkItem[]>,
  changeItems: (value: FrameworkItem[]) => void
}


export function SurveyOptionsDataTable({ items, changeItems }: SurveyOptionsDataTableProps) {
  const [listItems, setListItems] = React.useState(items.current);

  const [commentModalState, setCommentModalState] = React.useState(false);
  const [commentModalItem, setCommentModalItem] = React.useState<FrameworkItem | undefined>(undefined);
  const [commentModalError, setCommentModalError] = React.useState(false);

  const { t } = useTranslation(['ecos_survey', 'common']);

  const errorStyle = {
    color: 'red'
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newItems = [...items.current];
    const itemIndex = newItems.findIndex((item) => item.ids[i18next.language] === id);
    newItems[itemIndex].ratio = parseInt(event.target.value);
    setListItems(newItems);
    changeItems(newItems);
    const item = newItems[itemIndex];
    openCommentModal(item)
  }

  const createRadioButton = (value: number, params: GridRenderEditCellParams<FrameworkItem, number>) => {
    const item = items.current.find((item) => item.ids[i18next.language] == params.id);

    return (<Radio
      checked={item?.ratio == value}
      name="item-ratio"
      onChange={(event) => handleRadioChange(event, params.id as string)}
      value={value}
      sx={(item?.validationError || item?.feedbackValidationError) ? { ...errorStyle } : {}}
      color={(item?.validationError || item?.feedbackValidationError) ? 'error' : 'primary'}
    />);
  }

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: t('item_name'), flex: 4.3, sortable: false, resizable: false, renderCell: (params: GridRenderEditCellParams<FrameworkItem, number>) => {
        const item = items.current.find((item) => item.ids[i18next.language] === params.id) ?? { ids: {}, names: {}, descriptions: {} } as FrameworkItem;

        return (
          <>
            <Typography sx={(item.validationError || item.feedbackValidationError) ? { ...errorStyle, marginLeft: '.3rem', fontWeight: (item.selected) ? 'bold': '' } : { marginLeft: '.3rem'}}>{item.names[i18next.language]}</Typography>
            <Tooltip arrow title={<p style={{ fontSize: '1rem', textAlign: 'justify' }}>{item.descriptions[i18next.language]}</p>} >
              <InfoRounded sx={{ color: 'primary.main', cursor: 'pointer' }} fontSize="small" />
            </Tooltip>
          </>)
      }
    },
    {
      field: 'agree',
      headerName: t('survey_options.agree'),
      flex: 1.2,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(1, params)
    },
    {
      field: 'disagree',
      headerName: t('survey_options.disagree'),
      flex: 1.1,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(2, params)
    },
    {
      field: 'comment',
      headerName: '',
      flex: 0.7,
      sortable: false,
      resizable: false,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => items.current.find((item) => item.ids[i18next.language] === params.id) ?? { ids: {}, names: {}, descriptions: {} } as FrameworkItem,
      renderCell: (params: GridRenderCellParams<FrameworkItem, FrameworkItem>) => <CommentIcon onClick={() => openCommentModal(params.row)} sx={{ cursor: 'pointer' }} color={(params.value?.validationError || params.value?.feedbackValidationError) ? 'error' : 'primary'} />,
    }
  ]

  const rows = listItems.map((item) => {
    return {
      id: item.ids[i18next.language],
      name: item.names[i18next.language],
    }
  })

  const openCommentModal = (item: FrameworkItem | undefined) => {
    const commentItem = items.current.find((i) => i.id === item?.id);
    
    if(!commentItem) setCommentModalError(false);
    setCommentModalItem(commentItem);
    setCommentModalState(true);
  }

  return (
    <>
      <SurveyCommentModal
       setModalState={setCommentModalState} 
      modalState={commentModalState}
       items={items} 
      changeItems={changeItems} 
      commentModalItem={commentModalItem} 
      commentModalError={commentModalError}
      setCommentModalError={setCommentModalError}
      />
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
            whiteSpace: "break-spaces",
            lineHeight: '1.2rem'
          }
        }}
      />
    </>
  )
}

