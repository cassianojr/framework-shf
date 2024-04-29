import React from 'react'
import ParticipantFormModal from './ParticipantFormModal'
import { EcosProject, Participant } from '../../types/EcosProject.type';
import EcosProjectService from '../../services/EcosProjectService';
import { useTranslation } from 'react-i18next';

interface AddParticipantProps {
  setAddParticipantModalState: React.Dispatch<React.SetStateAction<boolean>>,
  addParticipantModalState: boolean,
  ecos: EcosProject,
  setEcos: React.Dispatch<React.SetStateAction<EcosProject>>,
}

export default function AddParticipant({ addParticipantModalState, setAddParticipantModalState, ecos, setEcos }: AddParticipantProps) {

  const { t } = useTranslation('ecos_dashboard');

  const [formState, setFormState] = React.useState({
    id: '',
    email: ''
  });


  const handleSubmit = (newParticipant: Participant) => {
    const participants = ecos.participants || [] as Participant[];
    const newEcos = { ...ecos, participants: [...participants, newParticipant] } as EcosProject;

    setEcos(newEcos);
    //TODO handle errors
    EcosProjectService.updateEcosProject(newEcos, ()=>console.log('ok'), ()=>console.log('error'));

    setAddParticipantModalState(false);
  }

  return (
    <ParticipantFormModal
      handleSubmit={handleSubmit}
      title={t('manage_participants.add_participant')}
      id="add-participant-modal"
      modalState={addParticipantModalState}
      setModalState={setAddParticipantModalState}
      formState={formState}
      setFormState={setFormState}
    />
  )
}