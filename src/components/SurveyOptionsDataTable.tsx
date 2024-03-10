import { InfoRounded } from "@mui/icons-material";
import { Button, Radio, TextField, Tooltip, Typography } from "@mui/material";
import i18next from "i18next";
import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRenderEditCellParams } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { FrameworkItem } from "../types/Framework.type";
import CommentIcon from '@mui/icons-material/Comment';
import { Modal } from "./Modal";

interface SurveyOptionsDataTableProps {
  items: React.MutableRefObject<FrameworkItem[]>,
  changeItems: (value: FrameworkItem[]) => void,
  validateAnswers: () => boolean
}

interface CommentModalProps {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  modalState: boolean
}

export function SurveyOptionsDataTable({ items, changeItems, validateAnswers }: SurveyOptionsDataTableProps) {
  const [listItems, setListItems] = React.useState(items.current);
  const [commentModalState, setCommentModalState] = React.useState(false);
  const [commentModalItem, setCommentModalItem] = React.useState<FrameworkItem | undefined>(undefined);

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
    validateAnswers();
  }


  const createRadioButton = (value: number, params: GridRenderEditCellParams<FrameworkItem, number>) => {
    const item = items.current.find((item) => item.ids[i18next.language] == params.id);

    return (<Radio
      checked={item?.ratio == value}
      name="item-ratio"
      onChange={(event) => handleRadioChange(event, params.id as string)}
      value={value}
      sx={item?.validationError ? { ...errorStyle } : {}}
      color={item?.validationError ? 'error' : 'primary'}
    />);
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, resizable: false },
    {
      field: 'name', headerName: t('item_name'), flex: 3.5, sortable: false, resizable: false, renderCell: (params: GridRenderEditCellParams<FrameworkItem, number>) => {
        const item = items.current.find((item) => item.ids[i18next.language] === params.id) ?? { ids: {}, names: {}, descriptions: {} } as FrameworkItem;

        return (
          <>
            <Tooltip arrow title={<p style={{ fontSize: '1rem' }}>{item.descriptions[i18next.language]}</p>} >
              <InfoRounded sx={{ color: 'primary.main', cursor: 'pointer' }} fontSize="small" />
            </Tooltip>
            <Typography sx={(item.validationError) ? { ...errorStyle, marginLeft: '.3rem' } : { marginLeft: '.3rem', }}>{item.names[i18next.language]}</Typography>
          </>)
      }
    },
    {
      field: 'fully-disagree',
      headerName: t('survey_options.strongly_disagree'),
      // width: 90,
      flex: 1.2,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(1, params)
    },
    {
      field: 'disagree',
      headerName: t('survey_options.disagree'),
      // width: 90,
      flex: 1.1,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(2, params)
    },
    {
      field: 'neutral',
      headerName: t('survey_options.neither'),
      // width: 90,
      flex: 1.2,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(3, params)
    },
    {
      field: 'agree',
      headerName: t('survey_options.agree'),
      // width: 90,
      flex: 1.2,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(4, params)
    },
    {
      field: 'fully-agree',
      headerName: t('survey_options.strongly_agree'),
      // width: 90,
      flex: 1.2,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<FrameworkItem, number>) => createRadioButton(5, params)
    },
    {
      field: 'comment',
      headerName: '',
      // width: 50,
      flex: 0.7,
      sortable: false,
      resizable: false,
      valueGetter: (params: GridRenderCellParams<FrameworkItem, number>) => items.current.find((item) => item.ids[i18next.language] === params.id) ?? { ids: {}, names: {}, descriptions: {} } as FrameworkItem,
      renderCell: (params: GridRenderCellParams<FrameworkItem, FrameworkItem>) => <CommentIcon onClick={() => openCommentModal(params.row)} sx={{ cursor: 'pointer' }} color={(params.value?.validationError) ? 'error' : 'primary'} />,
    }
  ]

  const rows = listItems.map((item) => {
    return {
      id: item.ids[i18next.language],
      name: item.names[i18next.language],
    }
  })

  const openCommentModal = (item: FrameworkItem | undefined) => {
    
    setCommentModalItem(item);
    setCommentModalState(true);
  }

  const CommentModal = ({ setModalState, modalState }: CommentModalProps) => {

    const [comment, setComment] = React.useState(items.current.find((item) => item.id === commentModalItem?.id)?.comment ?? '');

    if (!commentModalItem) return null;

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const item = items.current.find((item) => item.id === commentModalItem?.id);


      if (!item) return;

      const newItem = { ...item, comment: comment };
      const newItems = items.current.map((item) => item.id === commentModalItem?.id ? newItem : item);

      changeItems(newItems);

      validateAnswers();

      setModalState(false);
    }

    return (
      <Modal.Root state={modalState} handleClose={() => setModalState(false)} title={`${t('feedback.title')} ${commentModalItem?.name}`} id={`comment-modal-${commentModalItem?.id}`}>
        <Modal.Text>
          <form onSubmit={handleSave}>
            <TextField
              id="filled-multiline-static"
              label={t('feedback.textarea_label')}
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              variant="outlined"
              sx={{ width: '100%' }}
            />
            <Button type='submit' variant="contained" color="primary" sx={{ width: '100%', mt: 2 }}>{t('common:save_btn')}</Button>
          </form>
        </Modal.Text>
        <Modal.Actions handleClose={() => setModalState(false)} />
      </Modal.Root>
    )
  }

  return (
    <>
      <CommentModal setModalState={setCommentModalState} modalState={commentModalState} />
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

