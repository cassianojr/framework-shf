import { NewAnswers } from '../../types/Answer.type'
import { Grid, Paper } from '@mui/material'
import DemographicDataBar from './DemographicDataBar'
import { useTranslation } from 'react-i18next';
import { timeOptions, ecosRoles } from '../../util/DemographicOptions';


interface DemographicDataProps {
  answers: NewAnswers[]
}

export default function DemographicDataComponent({ answers }: DemographicDataProps) {

  const { t } = useTranslation(['ecos_dashboard', 'demographic_data']);

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
        case timeOptions[1]:
          scale.lessThanOneYear += 1;
          break;
        case timeOptions[2]:
          scale.oneToTwoYears += 1;
          break;
        case timeOptions[3]:
          scale.twoToFiveYears += 1;
          break;
        case timeOptions[4]:
          scale.fiveToTenYears += 1;
          break;
        case timeOptions[5]:
          scale.moreThanTenYears += 1;
          break;
      }
    });

    const timeOnEcosData = [
      {
        name: t(timeOptions[1]),
        value: ((scale.lessThanOneYear / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.lessThanOneYear
      },
      {
        name: t(timeOptions[2]),
        value: ((scale.oneToTwoYears / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.oneToTwoYears
      },
      {
        name: t(timeOptions[3]),
        value: ((scale.twoToFiveYears / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.twoToFiveYears
      },
      {
        name: t(timeOptions[4]),
        value: ((scale.fiveToTenYears / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.fiveToTenYears
      },
      {
        name: t(timeOptions[5]),
        value: ((scale.moreThanTenYears / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.moreThanTenYears
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
        case timeOptions[1]:
          scale.lessThanOneYear += 1;
          break;
        case timeOptions[2]:
          scale.oneToTwoYears += 1;
          break;
        case timeOptions[3]:
          scale.twoToFiveYears += 1;
          break;
        case timeOptions[4]:
          scale.fiveToTenYears += 1;
          break;
        case timeOptions[5]:
          scale.moreThanTenYears += 1;
          break;
      }
    }
    );

    const timeOnReqManagmentData = [
      {
        name: t(timeOptions[1]),
        value: ((scale.lessThanOneYear / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.lessThanOneYear
      },
      {
        name: t(timeOptions[2]),
        value: ((scale.oneToTwoYears / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.oneToTwoYears
      },
      {
        name: t(timeOptions[3]),
        value: ((scale.twoToFiveYears / answers.length) * 100).toFixed(0),
        color: '#c0af4a',
        rawValue: scale.twoToFiveYears
      },
      {
        name: t(timeOptions[4]),
        value: ((scale.fiveToTenYears / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.fiveToTenYears
      },
      {
        name: t(timeOptions[5]),
        value: ((scale.moreThanTenYears / answers.length) * 100).toFixed(0),
        color: '#ef9556',
        rawValue: scale.moreThanTenYears
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
        case ecosRoles[1]:
          scale.independentCommercialSupplier += 1;
          break;
        case ecosRoles[2]:
          scale.originalDesignManufacturer += 1;
          break;
        case ecosRoles[3]:
          scale.platformProvider += 1;
          break;
        case ecosRoles[4]:
          scale.saasProvider += 1;
          break;
        case ecosRoles[5]:
          scale.productDistributor += 1;
          break;
        case ecosRoles[6]:
          scale.softwareDeveloper += 1;
          break;
        case ecosRoles[7]:
          scale.softwareDesigner += 1;
          break;
        case ecosRoles[8]:
          scale.applicationServiceProvider += 1;
          break;
        case ecosRoles[9]:
          scale.requirementsEngineer += 1;
          break;
        case ecosRoles[10]:
          scale.integrator += 1;
          break;
        case ecosRoles[11]:
          scale.contentProvider += 1;
          break;
        case ecosRoles[12]:
          scale.valueAddedReseller += 1;
          break;
        case ecosRoles[13]:
          scale.endUser += 1;
          break;
        case ecosRoles[14]:
          scale.other += 1;
          break;
      }
    });

    const roleData = [
      {
        name: t(ecosRoles[1]),
        value: ((scale.independentCommercialSupplier / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.independentCommercialSupplier
      },
      {
        name: t(ecosRoles[2]),
        value: ((scale.originalDesignManufacturer / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.originalDesignManufacturer
      },
      {
        name: t(ecosRoles[3]),
        value: ((scale.platformProvider / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.platformProvider
      },
      {
        name: t(ecosRoles[4]),
        value: ((scale.saasProvider / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.saasProvider
      },
      {
        name: t(ecosRoles[5]),
        value: ((scale.productDistributor / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.productDistributor
      },
      {
        name: t(ecosRoles[6]),
        value: ((scale.softwareDeveloper / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.softwareDeveloper
      },
      {
        name: t(ecosRoles[7]),
        value: ((scale.softwareDesigner / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.softwareDesigner
      },
      {
        name: t(ecosRoles[8]),
        value: ((scale.applicationServiceProvider / answers.length) * 100).toFixed(0),
        color: '#c0af4a',
        rawValue: scale.applicationServiceProvider
      },
      {
        name: t(ecosRoles[9]),
        value: ((scale.requirementsEngineer / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.requirementsEngineer
      },
      {
        name: t(ecosRoles[10]),
        value: ((scale.integrator / answers.length) * 100).toFixed(0),
        color: '#ef9556',
        rawValue: scale.integrator
      },
      {
        name: t(ecosRoles[11]),
        value: ((scale.contentProvider / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.contentProvider
      },
      {
        name: t(ecosRoles[12]),
        value: ((scale.valueAddedReseller / answers.length) * 100).toFixed(0),
        color: '#ef9556',
        rawValue: scale.valueAddedReseller
      },
      {
        name: t(ecosRoles[13]),
        value: ((scale.endUser / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.endUser
      },
      {
        name: t(ecosRoles[14]),
        value: ((scale.other / answers.length) * 100).toFixed(0),
        color: '#ef9556',
        rawValue: scale.other
      }
    ]

    return roleData;
  }


  return (
    <Paper sx={defaultPaperStyle}>
      <Grid container spacing={3}>

        <Grid item xs={4} sx={{ marginLeft: '-35px' }}>
          <DemographicDataBar data={timeOnEcos()} title={t("demographic_data:demographic_questions.time_on_ecos_short")} />
        </Grid>

        <Grid item xs={4}>
          {/* <Typography></Typography> */}
          <DemographicDataBar data={timeOnReqManagment()} title={t("demographic_data:demographic_questions.time_with_requirements_mngm_short")} />
        </Grid>
        <Grid item xs={4}>
          <DemographicDataBar data={role()} title={t("demographic_data:demographic_questions.role")} />
          {/* <TestBarPlot /> */}
        </Grid>

      </Grid>
    </Paper>
  )
}