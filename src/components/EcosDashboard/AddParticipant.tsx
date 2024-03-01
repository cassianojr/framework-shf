import React from 'react'
import { Ecosystem, Participant } from '../../types/Ecosystem.type'
import ParticipantFormModal from './ParticipantFormModal'
import EcosystemService from '../../services/EcosystemService';

interface AddParticipantProps {
  setAddParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  addParticipantModalState: boolean,
  ecos: Ecosystem,
  setEcos: React.Dispatch<React.SetStateAction<Ecosystem>>,
}

export default function AddParticipant({ addParticipantModalState, setAddParticipantModalState, ecos, setEcos }: AddParticipantProps) {

  const [formState, setFormState] = React.useState({
    id: '',
    name: '',
    email: ''
  });


  const handleSubmit = (newParticipant: Participant) => {
    const participants = ecos.participants || [] as Participant[];
    const newEcos = { ...ecos, participants: [...participants, newParticipant] } as Ecosystem;


    setEcos(newEcos);
    EcosystemService.updateEcosystem(newEcos);

    setAddParticipantModalState(false);
  }

  return (
    <ParticipantFormModal
      handleSubmit={handleSubmit}
      title="Adicionar participante"
      id="add-participant-modal"
      modalState={addParticipantModalState}
      setModalState={setAddParticipantModalState}
      formState={formState}
      setFormState={setFormState}
    />
  )
}