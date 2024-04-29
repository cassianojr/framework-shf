import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuid } from 'uuid';
import { Ecosystem, Participant } from "../../types/Ecosystem.type";
import { Modal } from "../Modal";
import { Button, Divider, Grid, TextField } from "@mui/material";
import EcosystemService from "../../services/EcosystemService";


interface AddParticipantModalProps {
  setAddParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  addParticipantModalState: boolean,
  ecos: Ecosystem,
  setEcos: React.Dispatch<React.SetStateAction<Ecosystem>>,
  participantData: Participant | undefined
}


export default function AddParticipantModal({ addParticipantModalState, setAddParticipantModalState, ecos, setEcos, participantData }: AddParticipantModalProps) {

  const participantId = participantData?.id;

  const emptyParticipant = {
    name: '',
    email: ''
  }

  const [formState, setFormState] = React.useState((participantId ? participantData : emptyParticipant));

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParticipant = {
      id: participantId || uuid(),
      email: formState.email
    } as Participant;


    const participants = (participantId) ? ecos.participants.map((participant) => participant.id !== participantId) : ecos.participants || [] as Participant[];

    const newEcos = { ...ecos, participants: [...participants, newParticipant] } as Ecosystem;

    console.log(newEcos);
    
    setEcos(newEcos);
    EcosystemService.updateEcosystem(newEcos);

    setFormState({
      name: '',
      email: ''
    });

    setAddParticipantModalState(false);
  }

  const handleAddParticipantModalClose = () => {
    setFormState({
      name: '',
      email: ''
    });
    setAddParticipantModalState(false);
  }

  return (
    <Modal.Root state={addParticipantModalState} handleClose={handleAddParticipantModalClose} title="Adicionar Participante" id="add-user-modal" size='sm'>
      <Modal.Text>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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