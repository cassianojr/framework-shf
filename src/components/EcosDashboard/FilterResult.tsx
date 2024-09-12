import React from 'react'
import { DemoagraphicData } from '../../types/Answer.type';
import { Autocomplete, Button, Divider, Grid, Paper, TextField } from '@mui/material';
import Title from '../Dashboard/Title';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { timeOptions, ecosRoles } from '../../util/DemographicOptions';
import { useTranslation } from 'react-i18next';


export interface FilterParams {
  timeOnEcos: string,
  timeOnReqManagment: string,
  role: string
}

interface FilterResultProps {
  filterAnswers: (params:FilterParams) => void;
}


export default function FilterResult({ filterAnswers }: FilterResultProps) {
  const { t } = useTranslation(['ecos_dashboard', 'demographic_data']);


  const sortedEcosRoles = ecosRoles.sort((a, b) => t(a).localeCompare(t(b)));

  const [demographicData, setDemographicData] = React.useState({ timeOnEcos: timeOptions[0], timeOnReqManagment: timeOptions[0], role: sortedEcosRoles[sortedEcosRoles.findIndex((role)=>role==='demographic_data:roles.none')] } as DemoagraphicData);



  const [timeOnEcosInputValue, setTimeOnEcosInputValue] = React.useState(timeOptions[0]);
  const [timeOnReqManagmentInputValue, setTimeOnReqManagmentInputValue] = React.useState(timeOptions[0]);
  const [roleInputValue, setRoleInputValue] = React.useState(sortedEcosRoles[sortedEcosRoles.findIndex((role)=>role==='demographic_data:roles.none')]);

  function setFilterParams(): void {
    filterAnswers({
      timeOnEcos: demographicData.timeOnEcos,
      timeOnReqManagment: demographicData.timeOnReqManagment,
      role: demographicData.role
    });
  }

  return (
    <Paper sx={{ p: 3, mb:3 }}>
      <Title>{t('filter_btn')}</Title>
      <Divider sx={{mb:2, mt:-1}}/>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="reqTime"
            options={timeOptions}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.timeOnEcos}
            onChange={(_, newValue: string | null) => {
              console.log(newValue);
              
              setDemographicData({ ...demographicData, timeOnEcos: newValue ?? timeOptions[0] });
            }}
            inputValue={timeOnEcosInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnEcosInputValue(newInputValue);
            }}

            getOptionLabel={(option) => t(option)}    
            renderInput={(params) => <TextField {...params} label={t('demographic_data:demographic_questions.time_on_ecos_short')} InputLabelProps={{ shrink: true }} />}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="reqTime"
            options={timeOptions}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.timeOnReqManagment}
            onChange={(_, newValue: string | null) => {
              setDemographicData({ ...demographicData, timeOnReqManagment: newValue ?? timeOptions[0] });
            }}
            inputValue={timeOnReqManagmentInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnReqManagmentInputValue(newInputValue);
            }}
            getOptionLabel={(option) => t(option)}    
            renderInput={(params) => <TextField {...params} label={t('demographic_data:demographic_questions.time_with_requirements_mngm_short')} InputLabelProps={{ shrink: true }} />}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="role"
            options={sortedEcosRoles}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.role}
            onChange={(_, newValue: string | null) => {
              setDemographicData({ ...demographicData, role: newValue ?? sortedEcosRoles[sortedEcosRoles.findIndex((role)=>role==='demographic_data:roles.none')] });
            }}
            inputValue={roleInputValue}
            onInputChange={(_, newInputValue) => {
              setRoleInputValue(newInputValue);
            }}
            getOptionLabel={(option) => t(option)}    
            renderInput={(params) => <TextField {...params} label={t('demographic_data:demographic_questions.role_short')} InputLabelProps={{ shrink: true }} />}
          />
        </Grid>

        <Grid item xs={2.5}>
          <Button variant='contained' color='info' onClick={setFilterParams} sx={{p:2}} endIcon={<FilterAltIcon />}>{t('filter_btn')}</Button>
          <Grid />
        </Grid>

      </Grid>
    </Paper>
  )
}