import { InfoRounded } from "@mui/icons-material";
import { Divider, Radio } from "@mui/material";
import i18next from "i18next";
import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRenderEditCellParams } from '@mui/x-data-grid';

import { Modal } from ".";

interface ModalProps {
  items: React.MutableRefObject<ItemType[]>,
  changeItems: (value: ItemType[]) => void,
  showVotes?: boolean
}

interface ItemType {
  id: string,
  ids: {
    [key: string]: string
  },
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  },
  ratio: number,
  votes?: number
}


export function ModalFrameworkDataTable({ items, showVotes, changeItems }: ModalProps) {
  const [listItems, setListItems] = React.useState(items.current);

  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [descriptionModalContent, setDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });


  const DescriptionModal = (
    <Modal.Root state={descriptionModalState} handleClose={() => setDescriptionModalState(false)} id={descriptionModalContent.id} title={descriptionModalContent.title}>
      <Divider />
      <Modal.Text content={descriptionModalContent.body} />
      <Modal.Actions handleClose={() => setDescriptionModalState(false)} />
    </Modal.Root>
  );

  const handleItemClick = (id: string, name: string, description: string) => {
    setDescriptionModalContent({
      id,
      title: name,
      body: description,
    });

    setDescriptionModalState(true);
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newItems = [...listItems];
    const itemIndex = newItems.findIndex((item) => item.ids[i18next.language] === id);
    newItems[itemIndex].ratio = parseInt(event.target.value);
    setListItems(newItems);
    changeItems(newItems);
  }


  const createRadioButton = (value: number, params: GridRenderEditCellParams<ItemType, number>) => (
    <Radio
      checked={listItems.find((item) => item.ids[i18next.language] == params.id)?.ratio == value}
      name="item-ratio"
      onChange={(event) => handleRadioChange(event, params.id as string)}
      value={value}
    />
  )

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false, resizable: false },
    { field: 'name', headerName: 'Name', width: 320, sortable: false, resizable: false },
    {
      field: 'fully-disagree', headerName: 'Fully disagree', width: 120, sortable: false, resizable: false, renderCell: (params: GridRenderCellParams<ItemType, number>) => createRadioButton(1, params)
    },
    {
      field: 'disagree', headerName: 'Disagree', width: 90, sortable: false, resizable: false, renderCell: (params: GridRenderCellParams<ItemType, number>) => createRadioButton(1, params)
    },
    {
      field: 'neutral', headerName: 'Neutral', width: 90, sortable: false, resizable: false, renderCell: (params: GridRenderCellParams<ItemType, number>) => createRadioButton(1, params)
    },
    {
      field: 'agree', headerName: 'Agree', width: 90, sortable: false, resizable: false, renderCell: (params: GridRenderCellParams<ItemType, number>) => createRadioButton(1, params)
    },
    {
      field: 'fully-agree', headerName: 'Fully agree', width: 100, sortable: false, resizable: false, renderCell: (params: GridRenderCellParams<ItemType, number>) => createRadioButton(1, params)
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
      {DescriptionModal}
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        density="compact"
        hideFooterPagination
        hideFooter
      />
    </>
  )
}

