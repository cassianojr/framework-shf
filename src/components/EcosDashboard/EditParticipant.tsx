import React from 'react'
import ParticipantFormModal from './ParticipantFormModal'
import { useTranslation } from 'react-i18next'
import { EcosProject, Participant } from '../../types/EcosProject.type'
import EcosProjectService from '../../services/EcosProjectService'


interface EditParticipantProps {
  setEditParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  editParticipantModalState: boolean,
  ecos: EcosProject,
  setEcos: React.Dispatch<React.SetStateAction<EcosProject>>,
  participantData: Participant,
  setParticipantData: React.Dispatch<React.SetStateAction<Participant>>
}

export default function EditParticipant({ editParticipantModalState, setEditParticipantModalState, ecos, setEcos, participantData, setParticipantData }: EditParticipantProps) {

  const { t } = useTranslation('ecos_dashboard');


  const handleSubmit = (participant: Participant) => {
    const participants = ecos.participants;
    const newEcos = { ...ecos, participants: participants?.map((p) => p.id === participant.id ? participant : p) } as EcosProject;

    setEcos(newEcos);
    EcosProjectService.updateEcosProject(newEcos, ()=> console.log('success'), ()=> console.log("error"));

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