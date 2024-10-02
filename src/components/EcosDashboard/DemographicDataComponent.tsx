import { DemoagraphicData, NewAnswers } from '../../types/Answer.type'
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

  const processTimeData = (key: keyof DemoagraphicData) => {
    const scale = {
      lessThanOneYear: 0,
      oneToThreeYears: 0,
      fourToSixYears: 0,
      sevenToNineYears: 0,
      tenToTwelveYears: 0,
      thirteenToSixteenYears: 0,
      moreThanSixteenYears: 0
    }

    answers.forEach((answer) => {
      switch (answer.demographicData[key]) {
        case timeOptions[1]:
          scale.lessThanOneYear += 1;
          break;
        case timeOptions[2]:
          scale.oneToThreeYears += 1;
          break;
        case timeOptions[3]:
          scale.fourToSixYears += 1;
          break;
        case timeOptions[4]:
          scale.sevenToNineYears += 1;
          break;
        case timeOptions[5]:
          scale.tenToTwelveYears += 1;
          break;
        case timeOptions[6]:
          scale.thirteenToSixteenYears += 1;
          break
        case timeOptions[7]:
          scale.moreThanSixteenYears += 1;
          break;
      }
    });

    const timeData = [
      {
        name: t(timeOptions[1]),
        value: ((scale.lessThanOneYear / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.lessThanOneYear
      },
      {
        name: t(timeOptions[2]),
        value: ((scale.oneToThreeYears / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.oneToThreeYears
      },
      {
        name: t(timeOptions[3]),
        value: ((scale.fourToSixYears / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.fourToSixYears
      },
      {
        name: t(timeOptions[4]),
        value: ((scale.sevenToNineYears / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.sevenToNineYears
      },
      {
        name: t(timeOptions[5]),
        value: ((scale.tenToTwelveYears / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.tenToTwelveYears
      },
      {
        name: t(timeOptions[6]),
        value: ((scale.thirteenToSixteenYears / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.thirteenToSixteenYears
      },
      {
        name: t(timeOptions[7]),
        value: ((scale.moreThanSixteenYears / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.moreThanSixteenYears
      }
    ]

    return timeData;
  }

  const role = () => {

    const scale = {
      independentCommercialSupplier: 0,
      client: 0,
      endUser: 0,
      reseller: 0,
      internalSoftwareDeveloper: 0,
      externalSoftwareDeveloper: 0,
      keystone: 0,
      uiUxDesigners: 0,
      requirementsEngineer: 0,
      serviceProvider: 0,
      softwareArchitect: 0,
      evangelist: 0,
      dataAnalyst: 0,
      productManager: 0,
      projectManager: 0,
      partnershipManager: 0,
      maeketAnalyst: 0,
      testQualityAnalyst: 0,
      devopsEngineer: 0,
      scrumMaster: 0,
      productOwner: 0,
      securityEngineer: 0,
      dataSpecialist: 0,
      buisnessAnalyst: 0,
      softwarEngineer: 0,
      externalConsultant: 0,
      databaseAnalyst: 0,
      dataScientist: 0,
      other: 0
    }

    answers.forEach((answer) => {
      switch (answer.demographicData.role) {
        case ecosRoles[1]:
          scale.independentCommercialSupplier += 1;
          break;
        case ecosRoles[2]:
          scale.client += 1;
          break;
        case ecosRoles[3]:
          scale.endUser += 1;
          break;
        case ecosRoles[4]:
          scale.reseller += 1;
          break;
        case ecosRoles[5]:
          scale.internalSoftwareDeveloper += 1;
          break;
        case ecosRoles[6]:
          scale.externalSoftwareDeveloper += 1;
          break;
        case ecosRoles[7]:
          scale.keystone += 1;
          break;
        case ecosRoles[8]:
          scale.uiUxDesigners += 1;
          break;
        case ecosRoles[9]:
          scale.requirementsEngineer += 1;
          break;
        case ecosRoles[10]:
          scale.serviceProvider += 1;
          break;
        case ecosRoles[11]:
          scale.softwareArchitect += 1;
          break;
        case ecosRoles[12]:
          scale.evangelist += 1;
          break;
        case ecosRoles[13]:
          scale.dataAnalyst += 1;
          break;
        case ecosRoles[14]:
          scale.productManager += 1;
          break;
        case ecosRoles[15]:
          scale.projectManager += 1;
          break;
        case ecosRoles[16]:
          scale.partnershipManager += 1;
          break;
        case ecosRoles[17]:
          scale.maeketAnalyst += 1;
          break;
        case ecosRoles[18]:
          scale.testQualityAnalyst += 1;
          break;
        case ecosRoles[19]:
          scale.devopsEngineer += 1;
          break;
        case ecosRoles[20]:
          scale.scrumMaster += 1;
          break;
        case ecosRoles[21]:
          scale.productOwner += 1;
          break;
        case ecosRoles[22]:
          scale.securityEngineer += 1;
          break;
        case ecosRoles[23]:
          scale.dataSpecialist += 1;
          break;
        case ecosRoles[24]:
          scale.buisnessAnalyst += 1;
          break;
        case ecosRoles[25]:
          scale.softwarEngineer += 1;
          break;
        case ecosRoles[26]:
          scale.externalConsultant += 1;
          break;
        case ecosRoles[27]:
          scale.databaseAnalyst += 1;
          break;
        case ecosRoles[28]:
          scale.dataScientist += 1;
          break;
        case ecosRoles[29]:
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
        value: ((scale.client / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.client
      },
      {
        name: t(ecosRoles[3]),
        value: ((scale.endUser / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.endUser
      },
      {
        name: t(ecosRoles[4]),
        value: ((scale.reseller / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.reseller
      },
      {
        name: t(ecosRoles[5]),
        value: ((scale.internalSoftwareDeveloper / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.internalSoftwareDeveloper
      },
      {
        name: t(ecosRoles[6]),
        value: ((scale.externalSoftwareDeveloper / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.externalSoftwareDeveloper
      },
      {
        name: t(ecosRoles[7]),
        value: ((scale.keystone / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.keystone
      },
      {
        name: t(ecosRoles[8]),
        value: ((scale.uiUxDesigners / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.uiUxDesigners
      },
      {
        name: t(ecosRoles[9]),
        value: ((scale.requirementsEngineer / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.requirementsEngineer
      },
      {
        name: t(ecosRoles[10]),
        value: ((scale.serviceProvider / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.serviceProvider
      },
      {
        name: t(ecosRoles[11]),
        value: ((scale.softwareArchitect / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.softwareArchitect
      },
      {
        name: t(ecosRoles[12]),
        value: ((scale.evangelist / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.evangelist
      },
      {
        name: t(ecosRoles[13]),
        value: ((scale.dataAnalyst / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.dataAnalyst
      },
      {
        name: t(ecosRoles[14]),
        value: ((scale.productManager / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.productManager
      },
      {
        name: t(ecosRoles[15]),
        value: ((scale.projectManager / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.projectManager
      },
      {
        name: t(ecosRoles[16]),
        value: ((scale.partnershipManager / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.partnershipManager
      },
      {
        name: t(ecosRoles[17]),
        value: ((scale.maeketAnalyst / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.maeketAnalyst
      },
      {
        name: t(ecosRoles[18]),
        value: ((scale.testQualityAnalyst / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.testQualityAnalyst
      },
      {
        name: t(ecosRoles[19]),
        value: ((scale.devopsEngineer / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.devopsEngineer
      },
      {
        name: t(ecosRoles[20]),
        value: ((scale.scrumMaster / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.scrumMaster
      },
      {
        name: t(ecosRoles[21]),
        value: ((scale.productOwner / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.productOwner
      },
      {
        name: t(ecosRoles[22]),
        value: ((scale.securityEngineer / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.securityEngineer
      },
      {
        name: t(ecosRoles[23]),
        value: ((scale.dataSpecialist / answers.length) * 100).toFixed(0),
        color: '#58508d',
        rawValue: scale.dataSpecialist
      },
      {
        name: t(ecosRoles[24]),
        value: ((scale.buisnessAnalyst / answers.length) * 100).toFixed(0),
        color: '#bc5090',
        rawValue: scale.buisnessAnalyst
      },
      {
        name: t(ecosRoles[25]),
        value: ((scale.softwarEngineer / answers.length) * 100).toFixed(0),
        color: '#ff6361',
        rawValue: scale.softwarEngineer
      },
      {
        name: t(ecosRoles[26]),
        value: ((scale.externalConsultant / answers.length) * 100).toFixed(0),
        color: '#ffa600',
        rawValue: scale.externalConsultant
      },
      {
        name: t(ecosRoles[27]),
        value: ((scale.databaseAnalyst / answers.length) * 100).toFixed(0),
        color: '#488f31',
        rawValue: scale.databaseAnalyst
      },
      {
        name: t(ecosRoles[28]),
        value: ((scale.dataScientist / answers.length) * 100).toFixed(0),
        color: '#88a037',
        rawValue: scale.dataScientist
      },
      {
        name: t(ecosRoles[29]),
        value: ((scale.other / answers.length) * 100).toFixed(0),
        color: '#003f5c',
        rawValue: scale.other
      }
    ];

    const filteredRoleData = roleData.filter((item) => item.rawValue > 0);

    return filteredRoleData;
  }


  return (
    <Paper sx={defaultPaperStyle}>
      <Grid container spacing={3}>

        <Grid item xs={4} sx={{ marginLeft: '-35px' }}>
          <DemographicDataBar data={processTimeData('timeOnEcos')} title={t("demographic_data:demographic_questions.time_on_ecos_short")} />
        </Grid>

        <Grid item xs={4}>
          <DemographicDataBar data={processTimeData('timeOnReqManagment')} title={t("demographic_data:demographic_questions.time_with_requirements_mngm_short")} />
        </Grid>
        <Grid item xs={4}>
          <DemographicDataBar data={role()} title={t("demographic_data:demographic_questions.role_short")} />
        </Grid>

      </Grid>
    </Paper>
  )
}