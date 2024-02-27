import React from 'react'
import { Modal } from '../Modal'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Divider, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ManageParticipantsModalProps {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  modalState: boolean
}


interface AddParticipantModalProps {
  setAddParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  addParticipantModalState: boolean
}


export default function ManageParticipantsModal({ setModalState, modalState }: ManageParticipantsModalProps) {

  const handleClose = () => setModalState(false);
  const [addParticipantModalState, setAddParticipantModalState] = React.useState(false);


  //colums: name, email, editbtn, deletebtn
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
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
      headerName: 'Editar',
      width: 150,
      sortable: false,
      resizable: false,
      renderCell: () => <Button variant="contained" color="warning" startIcon={<EditIcon />}>Editar</Button>
    },
    {
      field: 'deletebtn',
      headerName: 'Deletar',
      width: 150,
      sortable: false,
      resizable: false,
      renderCell: () => <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Deletar</Button>
    },
  ]

  const rows = [
    { id: '1', name: 'João', email: 'joao@email.com' },
    { id: '2', name: 'Maria', email: 'maria@email.com' },
    { id: '3', name: 'José', email: 'jose@email.com' }
  ]

  const AddParticipantModal = ({ addParticipantModalState, setAddParticipantModalState }: AddParticipantModalProps) => {

    const [formState, setFormState] = React.useState({
      name: '',
      email: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Adicionar Participante');
    }

    const handleAddParticipantModalClose = () => setAddParticipantModalState(false);
    return (
      <Modal.Root state={addParticipantModalState} handleClose={handleAddParticipantModalClose} title="Adicionar Participante" id="add-user-modal" size='sm'>
        <Modal.Text>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: '1%' }}>
                <TextField
                  fullWidth
                  required
                  id="type"
                  name="type"
                  label={'Nome'}
                  autoFocus
                  value={formState.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="title"
                  name="title"
                  label={'email'}
                  onChange={handleFormChange}
                  value={formState.email}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<AddIcon />}
                >
                  {'Adicionar Participante'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={handleAddParticipantModalClose} />
      </Modal.Root>
    )
  }

  return (
    <>
      <AddParticipantModal addParticipantModalState={addParticipantModalState} setAddParticipantModalState={setAddParticipantModalState} />
      <Modal.Root state={modalState} handleClose={handleClose} title="Gerenciar Participantes" id="manage-users-modal" size='md'>
        <Modal.Text>
          <Button variant="contained" color="primary" sx={{ width: '100%', mb: 2 }} onClick={() => setAddParticipantModalState(true)} startIcon={<AddIcon />}>Adicionar Participante</Button>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            disableColumnMenu
            hideFooterPagination
          />

        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={handleClose} />
      </Modal.Root>
    </>

  )
}
