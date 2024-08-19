import { NewAnswers } from '../types/Answer.type'
import { Grid, Paper } from '@mui/material'
import DemographicDataBar from './DemographicDataBar'

interface DemographicDataProps {
  answers: NewAnswers[]
}

export default function DemographicDataComponent({ answers }: DemographicDataProps) {

  const defaultPaperStyle = {
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    mt: 2
  }

  const timeOnEcos = () => {
    const scale = {
      lessThanOneYear: 0,
      oneToTwoYears: 0,
      twoToFiveYears: 0,
      fiveToTenYears: 0,
      moreThanTenYears: 0
    }

    answers.forEach((answer) => {
      switch (answer.demographicData.timeOnEcos) {
        case "Menos de 1 ano":
          scale.lessThanOneYear += 1;
          break;
        case "De 1 a 2 anos":
          scale.oneToTwoYears += 1;
          break;
        case "De 2 a 5 anos":
          scale.twoToFiveYears += 1;
          break;
        case "De 5 a 10 anos":
          scale.fiveToTenYears += 1;
          break;
        case "Mais de 10 anos":
          scale.moreThanTenYears += 1;
          break;
      }
    });

    const timeOnEcosData = [
      {
        name: 'Menos de 1 ano',
        value: ((scale.lessThanOneYear / answers.length) * 100).toFixed(0),
        color: '#003f5c'
      },
      {
        name: 'De 1 a 2 anos',
        value: ((scale.oneToTwoYears / answers.length) * 100).toFixed(0),
        color: '#58508d'
      },
      {
        name: 'De 2 a 5 anos',
        value: ((scale.twoToFiveYears / answers.length) * 100).toFixed(0),
        color: '#bc5090'
      },
      {
        name: 'De 5 a 10 anos',
        value: ((scale.fiveToTenYears / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Mais de 10 anos',
        value: ((scale.moreThanTenYears / answers.length) * 100).toFixed(0),
        color: '#ffa600'
      }
    ]

    return timeOnEcosData;
  }

  const timeOnReqManagment = () => {
    const scale = {
      lessThanOneYear: 0,
      oneToTwoYears: 0,
      twoToFiveYears: 0,
      fiveToTenYears: 0,
      moreThanTenYears: 0
    }

    answers.forEach((answer) => {
      switch (answer.demographicData.timeOnReqManagment) {
        case "Menos de 1 ano":
          scale.lessThanOneYear += 1;
          break;
        case "De 1 a 2 anos":
          scale.oneToTwoYears += 1;
          break;
        case "De 2 a 5 anos":
          scale.twoToFiveYears += 1;
          break;
        case "De 5 a 10 anos":
          scale.fiveToTenYears += 1;
          break;
        case "Mais de 10 anos":
          scale.moreThanTenYears += 1;
          break;
      }
    }
    );

    const timeOnReqManagmentData = [
      {
        name: 'Menos de 1 ano',
        value: ((scale.lessThanOneYear / answers.length) * 100).toFixed(0),
        color: '#488f31'
      },
      {
        name: 'De 1 a 2 anos',
        value: ((scale.oneToTwoYears / answers.length) * 100).toFixed(0),
        color: '#88a037'
      },
      {
        name: 'De 2 a 5 anos',
        value: ((scale.twoToFiveYears / answers.length) * 100).toFixed(0),
        color: '#c0af4a'
      },
      {
        name: 'De 5 a 10 anos',
        value: ((scale.fiveToTenYears / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Mais de 10 anos',
        value: ((scale.moreThanTenYears / answers.length) * 100).toFixed(0),
        color: '#ef9556'
      }
    ]

    return timeOnReqManagmentData;
  }

  const role = () => {

    const scale = {
      independentCommercialSupplier: 0,
      originalDesignManufacturer: 0,
      platformProvider: 0,
      saasProvider: 0,
      productDistributor: 0,
      softwareDeveloper: 0,
      softwareDesigner: 0,
      applicationServiceProvider: 0,
      requirementsEngineer: 0,
      integrator: 0,
      contentProvider: 0,
      valueAddedReseller: 0,
      endUser: 0,
      other: 0
    }

    answers.forEach((answer) => {
      switch (answer.demographicData.role) {
        case 'Fornecedor comercial independente':
          scale.independentCommercialSupplier += 1;
          break;
        case 'Fabricante de design original':
          scale.originalDesignManufacturer += 1;
          break;
        case 'Provedor de plataforma/SaaS':
          scale.platformProvider += 1;
          break;
        case 'Fornecedor de SaaS':
          scale.saasProvider += 1;
          break;
        case 'Distribuidor de produtos':
          scale.productDistributor += 1;
          break;
        case 'Desenvolvedor de software':
          scale.softwareDeveloper += 1;
          break;
        case 'Designer de software':
          scale.softwareDesigner += 1;
          break;
        case 'Provedor de serviços de aplicativos':
          scale.applicationServiceProvider += 1;
          break;
        case 'Engenheiro de requisitos':
          scale.requirementsEngineer += 1;
          break;
        case 'Integrador':
          scale.integrator += 1;
          break;
        case 'Fornecedor de conteúdo':
          scale.contentProvider += 1;
          break;
        case 'Revendedor de valor agregado':
          scale.valueAddedReseller += 1;
          break;
        case 'Cliente/usuário final':
          scale.endUser += 1;
          break;
        case 'Outro':
          scale.other += 1;
          break;
      }
    });

    const roleData = [
      {
        name: 'Fornecedor comercial independente',
        value: ((scale.independentCommercialSupplier / answers.length) * 100).toFixed(0),
        color: '#003f5c'
      },
      {
        name: 'Fabricante de design original',
        value: ((scale.originalDesignManufacturer / answers.length) * 100).toFixed(0),
        color: '#58508d'
      },
      {
        name: 'Provedor de plataforma/SaaS',
        value: ((scale.platformProvider / answers.length) * 100).toFixed(0),
        color: '#bc5090'
      },
      {
        name: 'Fornecedor de SaaS',
        value: ((scale.saasProvider / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Distribuidor de produtos',
        value: ((scale.productDistributor / answers.length) * 100).toFixed(0),
        color: '#ffa600'
      },
      {
        name: 'Desenvolvedor de software',
        value: ((scale.softwareDeveloper / answers.length) * 100).toFixed(0),
        color: '#488f31'
      },
      {
        name: 'Designer de software',
        value: ((scale.softwareDesigner / answers.length) * 100).toFixed(0),
        color: '#88a037'
      },
      {
        name: 'Provedor de serviços de aplicativos',
        value: ((scale.applicationServiceProvider / answers.length) * 100).toFixed(0),
        color: '#c0af4a'
      },
      {
        name: 'Engenheiro de requisitos',
        value: ((scale.requirementsEngineer / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Integrador',
        value: ((scale.integrator / answers.length) * 100).toFixed(0),
        color: '#ef9556'
      },
      {
        name: 'Fornecedor de conteúdo',
        value: ((scale.contentProvider / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Revendedor de valor agregado',
        value: ((scale.valueAddedReseller / answers.length) * 100).toFixed(0),
        color: '#ef9556'
      },
      {
        name: 'Cliente/usuário final',
        value: ((scale.endUser / answers.length) * 100).toFixed(0),
        color: '#ff6361'
      },
      {
        name: 'Outro',
        value: ((scale.other / answers.length) * 100).toFixed(0),
        color: '#ef9556'
      }
    ]

    return roleData;
  }


  return (
    <Paper sx={defaultPaperStyle}>
      <Grid container spacing={3}>

        <Grid item xs={4} sx={{marginLeft: '-35px'}}>
          <DemographicDataBar data={timeOnEcos()} title='Tempo que trabalha no ecossistema'/>
        </Grid>

        <Grid item xs={4}>
          {/* <Typography></Typography> */}
          <DemographicDataBar data={timeOnReqManagment()} title='Tempo que trabalha com gerência de requisitos'/>
        </Grid>
        <Grid item xs={4}>
          <DemographicDataBar data={role()} title="Papel no ecossistema"/>
          {/* <TestBarPlot /> */}
        </Grid> 

      </Grid>
    </Paper>
  )
}