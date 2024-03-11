import React from 'react'
import { Modal } from '../Modal'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Ecosystem, Participant } from '../../types/Ecosystem.type';
import EcosystemService from '../../services/EcosystemService';
import AddParticipant from './AddParticipant';
import EditParticipant from './EditParticipant';
import { useTranslation } from 'react-i18next';

interface ManageParticipantsModalProps {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  modalState: boolean,
  ecos: Ecosystem,
  setEcos: React.Dispatch<React.SetStateAction<Ecosystem>>,
  addParticipantModalState: boolean,
  setAddParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ManageParticipantsModal({ setModalState, modalState, ecos, setEcos, addParticipantModalState, setAddParticipantModalState }: ManageParticipantsModalProps) {

  const participants = ecos.participants || [] as Participant[];

  const { t } = useTranslation('ecos_dashboard');

  const [participantEditData, setParticipantEditData] = React.useState<Participant>({
    id: '',
    name: '',
    email: ''
  } as Participant);


  const [editParticipantModalState, setEditParticipantModalState] = React.useState(false);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('manage_participants.name_label'),
      width: 300,
      sortable: false,
      resizable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      sortable: false,
      resizable: false
    },
    {
      field: 'editbtn',
      headerName: t('manage_participants.edit_btn'),
      width: 140,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<Participant, Participant>) => <Button onClick={() => editParticipant(params.value ?? undefined)} variant="contained" color="warning" startIcon={<EditIcon />}>{t('manage_participants.edit_btn')}</Button>,
      valueGetter: (params: GridRenderCellParams<Participant, number>) => {
        return params.row;
      }
    },
    {
      field: 'deletebtn',
      headerName: t('manage_participants.delete_btn'),
      width: 140,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams<Participant, string>) => <Button variant="contained" color="error" onClick={() => deleteParticipant(params.value ?? '')} startIcon={<DeleteIcon />}>{t('manage_participants.delete_btn')}</Button>,
      valueGetter: (params: GridRenderCellParams<Participant, number>) => {
        return params.row.id;
      }
    },
  ]

  const handleModalClose = () => {
    setModalState(false);
  };

  const editParticipant = (participant: Participant | undefined) => {
    if (!participant) return;

    setParticipantEditData(participant);
    setEditParticipantModalState(true);
  }

  const deleteParticipant = (id: string) => {
    if (id === '') return;

    const newParticipants = participants.filter(p => p.id !== id);
    const newEcos = { ...ecos, participants: newParticipants };

    EcosystemService.updateEcosystem(newEcos);

    setEcos(newEcos);
  }

  return (
    <>
      <Modal.Root state={modalState} handleClose={handleModalClose} title={t('manage_participants.title')} id="manage-users-modal" size='md'>
        <Modal.Text>
          
          <Typography mb={3}>{t('manage_participants.subtitle')}</Typography>

          <Button variant="contained" color="primary" sx={{ width: '100%', mb: 2 }} onClick={() => setAddParticipantModalState(true)} startIcon={<AddIcon />}>{t('manage_participants.add_participant')}</Button>
          <DataGrid
            rows={participants}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            disableColumnMenu
            hideFooterPagination
          />

        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={handleModalClose} />
      </Modal.Root>
      <AddParticipant addParticipantModalState={addParticipantModalState} setAddParticipantModalState={setAddParticipantModalState} ecos={ecos} setEcos={setEcos} />
      <EditParticipant
        editParticipantModalState={editParticipantModalState}
        setEditParticipantModalState={setEditParticipantModalState}
        ecos={ecos}
        setEcos={setEcos}
        participantData={participantEditData}
        setParticipantData={setParticipantEditData} />
    </>

  )
}
