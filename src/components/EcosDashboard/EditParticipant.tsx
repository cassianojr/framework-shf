import React from 'react'
import { Ecosystem, Participant } from '../../types/Ecosystem.type'
import ParticipantFormModal from './ParticipantFormModal'
import EcosystemService from '../../services/EcosystemService'
import { useTranslation } from 'react-i18next'


interface EditParticipantProps {
  setEditParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  editParticipantModalState: boolean,
  ecos: Ecosystem,
  setEcos: React.Dispatch<React.SetStateAction<Ecosystem>>,
  participantData: Participant,
  setParticipantData: React.Dispatch<React.SetStateAction<Participant>>
}

export default function EditParticipant({ editParticipantModalState, setEditParticipantModalState, ecos, setEcos, participantData, setParticipantData }: EditParticipantProps) {

  const { t } = useTranslation('ecos_dashboard');


  const handleSubmit = (participant: Participant) => {
    const participants = ecos.participants;
    const newEcos = { ...ecos, participants: participants?.map((p) => p.id === participant.id ? participant : p) } as Ecosystem;

    setEcos(newEcos);
    EcosystemService.updateEcosystem(newEcos);

    setEditParticipantModalState(false);
  }

  return (
    <ParticipantFormModal
      handleSubmit={handleSubmit}
      title={t('manage_participants.edit_title')}
      id="edit-participant-modal"
      modalState={editParticipantModalState}
      setModalState={setEditParticipantModalState}
      formState={participantData}
      setFormState={setParticipantData}
      />
  )
}