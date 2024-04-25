import React, { useEffect } from 'react'
import { Modal } from '../Modal';
import { Button, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MobileStepper, Switch, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/User.type';
import { Box, Container } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Framework, FrameworkItem } from '../../types/Framework.type';
import i18next from "i18next";
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuid } from 'uuid';
import { Dayjs } from 'dayjs';
import { EcosProject, Participant } from '../../types/EcosProject.type';
import EcosProjectService from '../../services/EcosProjectService';
import FrameworkItemListSelect from './FrameworkItemListSelect';

interface NewProjectModalProps {
  user: User,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean,
  frameworkData: Framework[]
}

export default function NewProjectModal({ user, setState, state, frameworkData }: NewProjectModalProps) {

  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const [activeStep, setActiveStep] = React.useState(0);
  const [orgNameError, setOrgNameError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);	

  const [orgName, setOrgName] = React.useState('');
  const [participants, setParticipants] = React.useState([] as Participant[]);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const [shfItems, setShfItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'social-human-factors')[0].items);
  const [ccItems, setCcItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'contextual-characteristics')[0].items);
  const [barriersItems, setBarriersItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'barriers-to-improving')[0].items);
  const [strategiesItems, setStrategiesItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'strategies')[0].items);

  const AddParticiantsStep = () => {
    const [participantEmail, setParticipantEmail] = React.useState('');

    const handleParticipantEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setParticipantEmail(e.target.value);
    }

    const handleAddParticipant = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = e.currentTarget.participantEmail.value as string;

      setParticipants([...participants, { id: uuid(), email }]);
      setParticipantEmail('');
    }

    const handleDeleteParticipant = (participantId: string) => {
      setParticipants(participants.filter((participant) => participant.id !== participantId));
    }

    return (
      <Box>
        <Title>Adicionar participantes</Title>
        <form onSubmit={handleAddParticipant}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField value={participantEmail} type={'email'} onChange={handleParticipantEmailChange} fullWidth required id="participantEmail" name="participantEmail" label="email do participante" />
            </Grid>
            <Grid item xs={2}>
              <Button type='submit' variant="contained" color="primary" sx={{ height: '3.5rem' }}>Adicionar</Button>
            </Grid>
          </Grid>
        </form>

        <Title>Participantes</Title>
        <List>
          {participants.map((participant) => {
            return (
              <ListItem
                key={participant.id}
                divider
                dense
                secondaryAction={
                  <ListItemButton onClick={() => handleDeleteParticipant(participant.id)}>
                    <DeleteIcon />
                  </ListItemButton>
                }
                id={participant.id}>
                <ListItemText>{participant.email}</ListItemText>

              </ListItem>
            )
          })}
        </List>
      </Box>
    )
  }

  const steps = [
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <Typography>
            {t('modal_text.txt1')}
          </Typography>
          <Typography>
            {t('modal_text.txt2')}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            required
            id="orgName"
            name="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            label={t('modal_text.label_name')}
            autoFocus
            error={orgNameError}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginTop: '1%', marginBottom: '2%' }}>
          <Typography sx={{ marginTop: '1%', marginBottom: '2%' }}>Selecione a data em que a pesquisa irá terminar:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data de término da pesquisa*"
              sx={{ width: '100%' }}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField:{
                  fullWidth: true,
                  variant: 'outlined',
                  error: endDateError,
                  helperText: endDateError ? 'Por favor, selecione a data de término da pesquisa' : null
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>, <>Dados demográficos...</>,
    <>
      <Title>Por favor, selecione os fatores sociais e humanos que serão obrigatórios na pesquisa:</Title>
      <FrameworkItemListSelect items={shfItems} setItems={setShfItems}/>
    </>,
    <>
      <Title>Por favor, selecione as características contextuais da sua organização:</Title>

      <FrameworkItemListSelect items={ccItems} setItems={setCcItems}/>
    </>,
    <>
      <Title>Por favor, selecione as barreiras para melhoria que serão obrigatórias na pesquisa:</Title>
      <FrameworkItemListSelect items={barriersItems} setItems={setBarriersItems}/>
    </>,
    <>
      <Title>Por favor, selecione as estratégias que serão obrigatórias na pesquisa:</Title>
      <FrameworkItemListSelect items={strategiesItems} setItems={setStrategiesItems}/>
    </>,
    <>
      <AddParticiantsStep />
    </>
  ]

  const handleAddEcosSubmit = () => {
    const endDateObj = endDate?.toDate();
   
    const ecosProject = {
      name: orgName,
      end_date: endDateObj?.toISOString(),
      participants: participants,
      admin_id: user.uid,
      mandatory_items: {
        shf: shfItems.filter((item) => item.selected),
        cc: ccItems.filter((item) => item.selected),
        barriers: barriersItems.filter((item) => item.selected),
        strategies: strategiesItems.filter((item) => item.selected)
      },
      status: 'not-started'
    } as EcosProject;
    
    EcosProjectService.createEcosProject(ecosProject, (docRef) => {
      navigate(`/ecos-dashboard/${docRef.id}`);
    }, () => {
      console.error('Error creating new ecos project');
    });
  }

  const checkFirstStep = () => {
    if (orgName === '') {
      setOrgNameError(true);
      return false;
    }else{
      setOrgNameError(false);
    }

    if (endDate === null) {
      setEndDateError(true);
      return false;
    }else{
      setEndDateError(false);
    }

    return true;
  }

  const handleBackBtn = () => {
    if (activeStep === 0) {
      setState(false);
      return;
    }
    setActiveStep(activeStep - 1);
  }

  const handleNextBtn = () => {
    if (activeStep === steps.length - 1) {
      handleAddEcosSubmit();
      return;
    }
    if (checkFirstStep()) setActiveStep(activeStep + 1);
  }

  return (
    <Modal.Root state={state} id="addNewEcos" title={t('add_ecos_btn')} handleClose={() => setState(false)}>
      <Container>
        <Box>
          {steps[activeStep]}
        </Box>

        <Divider />

        <MobileStepper
          variant='progress'
          steps={steps.length}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNextBtn}>
              {(activeStep === steps.length - 1) ? 'Criar nova pesquisa' : "Avançar"}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBackBtn}>
              {(activeStep === 0) ? 'Cancelar' : "Voltar"}
            </Button>
          }
        />
      </Container>
    </Modal.Root >
  );
}
