import React from 'react'
import { Modal } from '../Modal';
import { Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, MobileStepper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/User.type';
import { Box, Container } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Framework, FrameworkItem } from '../../types/Framework.type';
import Title from './Title';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuid } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import { EcosProject, Participant } from '../../types/EcosProject.type';
import EcosProjectService from '../../services/EcosProjectService';
import FrameworkItemListSelect from './FrameworkItemListSelect';
import { ptBR, enUS } from '@mui/x-date-pickers/locales';
import "dayjs/locale/pt-br";
import "dayjs/locale/en";
import i18next from 'i18next';

interface NewProjectModalProps {
  user: User,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean,
  frameworkData: Framework[]
}

export default function NewProjectModal({ user, setState, state, frameworkData }: NewProjectModalProps) {

  const navigate = useNavigate();

  const { t } = useTranslation(['dashboard', 'demographic_data', 'common']);

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

      const alreadyAdded = participants.find((participant) => participant.email === email);
      if (alreadyAdded) return;

      setParticipants([...participants, { id: uuid(), email }]);
      setParticipantEmail('');
    }

    const handleDeleteParticipant = (participantId: string) => {
      setParticipants(participants.filter((participant) => participant.id !== participantId));
    }

    return (
      <Box>
        <Title>{t('modal_text.add_participants_tite')}</Title>
        <form onSubmit={handleAddParticipant}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField value={participantEmail} type={'email'} onChange={handleParticipantEmailChange} fullWidth required id="participantEmail" name="participantEmail" label={t('modal_text.email_label')} />
            </Grid>
            <Grid item xs={2}>
              <Button type='submit' variant="contained" color="primary" sx={{ height: '3.5rem' }}>{t('modal_text.add_participant_btn')}</Button>
            </Grid>
          </Grid>
        </form>

        <Title>{t('modal_text.participants_list_title')}</Title>
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

  const dtPickerLocaleText = (i18next.language === 'pt_br') ? ptBR : enUS;

  const steps = [
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <Typography textAlign={'justify'}>
            {t('modal_text.txt1')}
          </Typography>
          <Typography textAlign={'justify'}>
            {t('modal_text.txt2')}
          </Typography>
          <Typography textAlign={'justify'}>
            {t('modal_text.txt3')}
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
          <Typography sx={{ marginTop: '1%', marginBottom: '2%' }}>{t('modal_text.end_date_text')}</Typography>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={(i18next.language === 'pt_br') ? 'pt-br' : 'en'}
            localeText={dtPickerLocaleText.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <DatePicker
              label={t('modal_text.end_date_label')}
              sx={{ width: '100%' }}
              value={endDate}
              format='DD/MM/YYYY'
              onChange={(newValue) => setEndDate(newValue)}
              minDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  error: endDateError,
                  helperText: endDateError ? t('modal_text.end_date_error') : null
                }
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>,
    <>
      <Title>{t('modal_text.demographic_data_title')}</Title>
      <Typography>{t('modal_text.demographic_data_expl')}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="ecosTime"
            name="ecosTime"
            value={''}
            label={t('demographic_data:demographic_questions.time_on_ecos')}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="reqTime"
            name="reqTime"
            value={''}
            label={t('demographic_data:demographic_questions.time_with_requirements_mngm')}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: '1%' }}>
          <TextField
            fullWidth
            id="role"
            name="role"
            value={''}
            label={t('demographic_data:demographic_questions.role')}
            disabled
          />
        </Grid>
      </Grid>
    </>,
    <>
      <Title>{t('modal_text.shf_items')}</Title>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{t('modal_text.shf_items_expl')}</Typography>
      <FrameworkItemListSelect items={shfItems} setItems={setShfItems} />
    </>,
    <>
      <Title>{t('modal_text.cc_items')}</Title>

      <FrameworkItemListSelect items={ccItems} setItems={setCcItems} />
    </>,
    <>
      <Title>{t('modal_text.barriers_items')}</Title>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{t('modal_text.barriers_items_expl')}</Typography>
      <FrameworkItemListSelect items={barriersItems} setItems={setBarriersItems} />
    </>,
    <>
      <Title>{t('modal_text.strategies_items')}</Title>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{t('modal_text.strategies_items_expl')}</Typography>
      <FrameworkItemListSelect items={strategiesItems} setItems={setStrategiesItems} />
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
    } else {
      setOrgNameError(false);
    }

    if (endDate === null) {
      setEndDateError(true);
      return false;
    } else {
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
              {(activeStep === steps.length - 1) ? t('modal_text.create_new_survey') : t('common:next_btn')}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBackBtn}>
              {(activeStep === 0) ? t('common:cancel_btn') : t('common:back_button')}
            </Button>
          }
        />
      </Container>
    </Modal.Root >
  );
}
