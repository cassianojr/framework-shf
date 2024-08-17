import React from 'react'
import { DemoagraphicData } from '../../types/Answer.type';
import { Autocomplete, Button, Divider, Grid, Paper, TextField } from '@mui/material';
import Title from '../Dashboard/Title';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export interface FilterParams {
  timeOnEcos: string,
  timeOnReqManagment: string,
  role: string
}

interface FilterResultProps {
  filterAnswers: (params:FilterParams) => void;
}


export default function FilterResult({ filterAnswers }: FilterResultProps) {

  //TODO create translations
  const timeOptions = [
    'Selecione',
    "Menos de 1 ano",
    "De 1 a 2 anos",
    "De 2 a 5 anos",
    "De 5 a 10 anos",
    "Mais de 10 anos"
  ]

  const ecosRoles = [
    'Selecione',
    'Fornecedor comercial independente',
    'Fabricante de design original',
    'Provedor de plataforma/SaaS',
    'Fornecedor de SaaS',
    'Distribuidor de produtos',
    'Desenvolvedor de software',
    'Designer de software',
    'Provedor de serviços de aplicativos',
    'Engenheiro de requisitos',
    'Integrador',
    'Fornecedor de conteúdo',
    'Revendedor de valor agregado',
    'Cliente/usuário final',
    'Outro'
  ]

  const [demographicData, setDemographicData] = React.useState({ timeOnEcos: timeOptions[0], timeOnReqManagment: timeOptions[0], role: ecosRoles[0] } as DemoagraphicData);

  const [timeOnEcosInputValue, setTimeOnEcosInputValue] = React.useState(timeOptions[0]);
  const [timeOnReqManagmentInputValue, setTimeOnReqManagmentInputValue] = React.useState(timeOptions[0]);
  const [roleInputValue, setRoleInputValue] = React.useState(ecosRoles[0]);

  function setFilterParams(): void {
    
    filterAnswers({
      timeOnEcos: demographicData.timeOnEcos,
      timeOnReqManagment: demographicData.timeOnReqManagment,
      role: demographicData.role
    });
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Title>Filtar respostas</Title>
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
              setDemographicData({ ...demographicData, timeOnEcos: newValue ?? 'Selecione' });
            }}
            inputValue={timeOnEcosInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnEcosInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={'Tempo que trabalha no ecossistema'} InputLabelProps={{ shrink: true }} />}
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
              setDemographicData({ ...demographicData, timeOnReqManagment: newValue ?? 'Selecione' });
            }}
            inputValue={timeOnReqManagmentInputValue}
            onInputChange={(_, newInputValue) => {
              setTimeOnReqManagmentInputValue(newInputValue);
            }}

            renderInput={(params) => <TextField {...params} label={'Tempo com gerência de requisitos'} InputLabelProps={{ shrink: true }} />}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="role"
            options={ecosRoles}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ caretColor: 'transparent' }}
            value={demographicData.role}
            onChange={(_, newValue: string | null) => {
              setDemographicData({ ...demographicData, role: newValue ?? 'Selecione' });
            }}
            inputValue={roleInputValue}
            onInputChange={(_, newInputValue) => {
              setRoleInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={'Papel no ecossistema'} InputLabelProps={{ shrink: true }} />}
          />
        </Grid>

        <Grid item xs={2.5}>
          <Button variant='contained' color='info' onClick={setFilterParams} sx={{p:2}} endIcon={<FilterAltIcon />}>Filtrar respostas</Button>
          <Grid />
        </Grid>

      </Grid>
    </Paper>
  )
}