import React from 'react'
import { Modal } from '../Modal'
import { Button, Divider, Grid, TextField } from '@mui/material'
import { v4 as uuid } from 'uuid';
import { Participant } from '../../types/Ecosystem.type';
import { useTranslation } from 'react-i18next';


interface ParticipantFormModalProps {
  title: string,
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: (participant: Participant) => void,
  id: string,
  formState: Participant,
  setFormState: React.Dispatch<React.SetStateAction<Participant>>
}

export default function ParticipantFormModal({ title, modalState, setModalState, handleSubmit, id, formState, setFormState }: ParticipantFormModalProps) {

  const { t } = useTranslation('ecos_dashboard');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const handleClose = () => {
    setFormState({
      id: '',
      name: '',
      email: ''
    });
    setModalState(false);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParticipant = {
      id: (formState.id === '')?uuid():formState.id,
      name: formState.name,
      email: formState.email
    } as Participant;

    handleSubmit(newParticipant);

    setFormState({
      id: '',
      name: '',
      email: ''
    });
  }

  return (
    <Modal.Root state={modalState} handleClose={handleClose} title={title} id={id} size='sm'>
      <Modal.Text>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: '1%' }}>
              <TextField
                fullWidth
                required
                id="name"
                name="name"
                label={t('manage_participants.name_label')}
                autoFocus
                value={formState.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label={'email'}
                onChange={handleFormChange}
                type='email'
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

              >
                {t('manage_participants.save_btn')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={handleClose} />
    </Modal.Root>
  )
}
