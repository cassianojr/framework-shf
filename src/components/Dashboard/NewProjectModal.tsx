import React from 'react'
import { Ecosystem } from '../../types/Ecosystem.type';
import { Modal } from '../Modal';
import { Button, Divider, FormControl, Grid, Slider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EcosystemService from '../../services/EcosystemService';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { User } from '../../types/User.type';

interface NewProjectModalProps {
  user: User,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean
}

export default function NewProjectModal({ user, setState, state }: NewProjectModalProps) {

  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');

  const [timeWindow, setTimeWindow] = React.useState(1);

  const handleAddEcosSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const organization_name = e.currentTarget.orgName.value as string;
    const time_window = e.currentTarget.time_window.value as number;

    const ecosystem = {
      organization_name,
      admin_id: user.uid,
      responses: 0,
      time_window
    } as Ecosystem;

    setState(false);
    EcosystemService.createEcosystem(ecosystem, (ecos) => {
      navigate(`/ecos-dashboard/${ecos.id}`);
    }, () => {
      console.log('error');
    });
  }

  return (
    <Modal.Root state={state} id="addNewEcos" title={t('add_ecos_btn')} handleClose={() => setState(false)}>
      <form onSubmit={handleAddEcosSubmit}>
        <Modal.Text>
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
                label={t('modal_text.label_name')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '1%' }}>

              <Divider sx={{ marginTop: '1%' }} >{t('modal_text.time_window_separator')}</Divider>

              <FormControl>
                <Typography id="time-window-label-1" sx={{ color: 'black', mt: 2 }}>{t('modal_text.time_window_expl')}</Typography>
                <Typography id="time-window-label" sx={{ color: 'black', mt: 2 }}>{t('modal_text.time_window_label')}</Typography>
                <Grid container spacing={2} alignItems={'center'} sx={{ width: 300, m: 'auto' }}>
                  <Grid item xs={6}>
                    <Slider
                      aria-label={t('modal_text.time_window_label')}
                      defaultValue={3}
                      valueLabelDisplay="auto"
                      onChange={(e, newValue) => setTimeWindow(newValue as number)}
                      value={timeWindow}
                      step={1}
                      marks
                      min={1}
                      max={3}
                      name="time_window"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{timeWindow} {t('modal_text.time_week')}{(timeWindow > 1)? 's': ''}</Typography>
                  </Grid>
                </Grid>
              </FormControl>

            </Grid>
          </Grid>

        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={() => setState(false)}>
          <Button variant="contained" type="submit"><AddIcon /> {t('add_ecos_btn')}</Button>
          <Button variant="outlined" onClick={() => setState(false)}>{t('modal_text.cancel_btn')}</Button>
        </Modal.Actions>
      </form>
    </Modal.Root >
  );
}
