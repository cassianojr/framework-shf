import React from 'react'
import { Modal } from '../Modal'
import i18next from 'i18next'
import { Framework, FrameworkItem } from '../../types/Framework.type'
import { EcosProject } from '../../types/EcosProject.type'
import { Button, Divider, Grid, MobileStepper, TextField, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Box, Container } from '@mui/system'
import Title from '../Dashboard/Title'
import FrameworkItemListSelect from '../Dashboard/FrameworkItemListSelect'
import EcosProjectService from '../../services/EcosProjectService'
import { useTranslation } from 'react-i18next'

interface EditEcosProjectProps {
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  frameworkData: Framework[],
  ecosProject: EcosProject,
  setEcosProject: React.Dispatch<React.SetStateAction<EcosProject>>,
  onSuccess: () => void,
  onError: () => void
}

export default function EditEcosProject(props: EditEcosProjectProps) {
  const { state, setState, frameworkData } = props;

  const [shfItems, setShfItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'social-human-factors')[0].items.sort((a,b) => a.names[i18next.language] > b.names[i18next.language] ? 1 : -1));
  const [ccItems, setCcItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'contextual-characteristics')[0].items.sort((a,b) => a.names[i18next.language] > b.names[i18next.language] ? 1 : -1));
  const [barriersItems, setBarriersItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'barriers-to-improving')[0].items.sort((a,b) => a.names[i18next.language] > b.names[i18next.language] ? 1 : -1));
  const [strategiesItems, setStrategiesItems] = React.useState<FrameworkItem[]>(frameworkData.filter((item) => item.id === 'strategies')[0].items.sort((a,b) => a.names[i18next.language] > b.names[i18next.language] ? 1 : -1));

  const [activeStep, setActiveStep] = React.useState(0);

  const [orgName, setOrgName] = React.useState(props.ecosProject.name);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(props.ecosProject.end_date));

  const [orgNameError, setOrgNameError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);

  const { t } = useTranslation(['dashboard', 'demographic_data', 'common']);

  const steps = [
    <>
      <Grid container spacing={2}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('modal_text.end_date_label')}
              sx={{ width: '100%' }}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format='DD/MM/YYYY'
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
      <Title>{t('modal_text.shf_items')}</Title>
      <FrameworkItemListSelect items={shfItems} setItems={setShfItems} />
    </>,
    <>
      <Title>{t('modal_text.cc_items')}</Title>

      <FrameworkItemListSelect items={ccItems} setItems={setCcItems} />
    </>,
    <>
      <Title>{t('modal_text.barriers_items')}</Title>
      <FrameworkItemListSelect items={barriersItems} setItems={setBarriersItems} />
    </>,
    <>
      <Title>{t('modal_text.strategies_items')}</Title>
      <FrameworkItemListSelect items={strategiesItems} setItems={setStrategiesItems} />
    </>
  ];

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

  const handleSaveEcosSubmit = () => {
    const endDateObj = endDate?.toDate();
   
    const ecosProject = {
      id: props.ecosProject.id,
      name: orgName,
      admin_id: props.ecosProject.admin_id,
      participants: props.ecosProject.participants,
      end_date: endDateObj?.toISOString(),
      mandatory_items: {
        shf: shfItems.filter((item) => item.selected),
        cc: ccItems.filter((item) => item.selected),
        barriers: barriersItems.filter((item) => item.selected),
        strategies: strategiesItems.filter((item) => item.selected)
      },
      status: 'not-started'
    } as EcosProject;
    
    EcosProjectService.updateEcosProject(ecosProject, (newData) => {
      props.setEcosProject(newData);
      setActiveStep(0);
      setState(false);
      props.onSuccess();
    }, () => {
      console.error('Error creating new ecos project');
      props.onError();
    });
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
      handleSaveEcosSubmit();
      return;
    }
    if (checkFirstStep()) setActiveStep(activeStep + 1);
  }

  return (
    <Modal.Root state={state} id="addNewEcos" title={t('modal_text.edit_survey')} handleClose={() => setState(false)}>
      <Container>
        <Box sx={{ mt: '2rem' }}>
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
              {(activeStep === steps.length - 1) ?  t('common:save_btn') : t('common:next_btn')}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBackBtn}>
              {(activeStep === 0) ? t('common:cancel_btn') :  t('common:back_button')}
            </Button>
          }
        />

      </Container>

    </Modal.Root>
  )
}