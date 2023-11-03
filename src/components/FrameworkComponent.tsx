import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { ArcherContainer, ArcherElement } from 'react-archer';

import { Framework } from '../types/Framework.type';

import AccordionComponent from '../components/AccordionComponent';
import ListPersonalAndSocial from './ListPersonalAndSocial';
import React from 'react';
import { Modal } from './Modal';
import SkeletonComponent from './SkeletonComponent';
import { FirebaseService } from '../services/FirebaseService';
import { useTranslation } from "react-i18next";

interface FrameworkComponentProps {
  showSuggestions?: boolean;
}

function FrameworkComponent({ showSuggestions = true }: FrameworkComponentProps = {}) {

  const { t } = useTranslation('framework');

  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);

  React.useEffect(() => {

    FirebaseService.getFrameworkData((data: Framework[]) => {
      setCopingMechanisms(data.filter((item) => item.id === "coping-mechanisms")[0]);
      setContextualCharacteristics(data.filter((item) => item.id === "contextual-characteristics")[0]);
      setSocialHumanFactors(data.filter((item) => item.id === "social-human-factors")[0]);
      setBarriersToImproving(data.filter((item) => item.id === "barriers-to-improving")[0]);
      setStrategies(data.filter((item) => item.id === "strategies")[0]);
    });

  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving]);
  
  const socialGroupItems = socialHumanFactors?.items?.slice(0, 17);
  const personalGroupItems = socialHumanFactors?.items?.slice(17);

  const [centerModalState, setCenterModalState] = React.useState(false);

  const centerModalContent = {
    id: 'requirements-management in SECO',
    title: t('center_button')
  }

  return (
    <>
      {socialHumanFactors == {} as Framework ? <h1>Loading...</h1> : (
        <>
          <Modal.Root state={centerModalState} {...centerModalContent} handleClose={() => setCenterModalState(false)}>
            <Modal.Text>
              <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
                {t('center_description.p1')}
              </Typography>
              <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
                {t('center_description.p2')}
              </Typography>
            </Modal.Text>
            <Divider />
            <Modal.Actions handleClose={() => setCenterModalState(false)} />
          </Modal.Root>

          <ArcherContainer strokeColor='black' noCurves >
            <Box sx={{ paddingTop: '1%' }}>

              <Grid container spacing={0} style={{ height: '65vh' }}>

                <Grid container item xs={4}>
                  <Box width={'100%'}>
                    <ArcherElement
                      id="social-and-human-factors"
                      relations={[{
                        targetId: 'framework-shf',
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: { strokeDasharray: '5,5' },
                      }]}
                    >
                      <div>
                        {socialHumanFactors == undefined || socialGroupItems == undefined || personalGroupItems == undefined ? <SkeletonComponent /> :
                          <AccordionComponent showSuggestions={showSuggestions} data={socialHumanFactors}>
                            <ListPersonalAndSocial socialGroupItems={socialGroupItems} personalGroupItems={personalGroupItems} />
                          </AccordionComponent>
                        }
                      </div>
                    </ArcherElement>

                  </Box>
                  <Box width={'100%'}>
                    <ArcherElement
                      id="contextual-characteristics"
                      relations={[{
                        targetId: 'middle-target',
                        targetAnchor: 'bottom',
                        sourceAnchor: 'right',
                        style: { strokeDasharray: '5,5' },
                      }]}
                    >
                      <div>
                        {contextualCharacteristics == undefined ? <SkeletonComponent /> :
                          <AccordionComponent showSuggestions={showSuggestions} data={contextualCharacteristics} />
                        }
                      </div>
                    </ArcherElement>
                  </Box>
                </Grid>

                <Grid item xs={3} >
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ArcherElement
                      id="framework-shf"
                      relations={[{
                        targetId: 'barriers-to-improving',
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: { strokeDasharray: '5,5' },
                      }]}
                    >
                      <Card elevation={8} style={{ maxWidth: '40%', textAlign: 'center', padding: '1%', backgroundColor: '#757173', color: 'white', cursor: 'pointer' }} onClick={() => setCenterModalState(true)}>
                        <Typography sx={{ fontSize: '.8rem', border: '1px solid white', borderRadius: '.1rem', padding: '.3rem' }}>
                          {t('center_button')}

                        </Typography>
                      </Card>
                    </ArcherElement>

                  </Box>
                  <ArcherElement
                    id="middle-target"
                  >
                    <div style={{ width: '26%', marginTop: '-32.5vh' }}>
                    </div>
                  </ArcherElement>
                </Grid>

                <Grid container item xs={5}>
                  <Box width={'100%'}>
                    <ArcherElement
                      id="coping-mechanisms"
                    >
                      <div>
                        {copingMechanisms == undefined ? <SkeletonComponent /> :
                          <AccordionComponent showSuggestions={showSuggestions} data={copingMechanisms} />
                        }
                      </div>
                    </ArcherElement>
                  </Box>
                  <Box width={'100%'}>
                    <ArcherElement
                      id="barriers-to-improving"
                      relations={[{
                        targetId: 'coping-mechanisms',
                        targetAnchor: 'bottom',
                        sourceAnchor: 'top',
                        style: { strokeDasharray: '5,5' },
                      },
                      {
                        targetId: 'strategies',
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom',
                        style: { strokeDasharray: '5,5' },
                      }
                      ]}
                    >
                      <div>
                        {barriersToImproving == undefined ? <SkeletonComponent /> :
                          <AccordionComponent showSuggestions={showSuggestions} data={barriersToImproving} />
                        }
                      </div>
                    </ArcherElement>
                  </Box>
                </Grid>

              </Grid>

              <Box>
                <ArcherElement id='strategies'>
                  <div>
                    {strategies == undefined ? <SkeletonComponent /> :
                      <AccordionComponent showSuggestions={showSuggestions} data={strategies} />
                    }
                  </div>
                </ArcherElement>
              </Box>
            </Box>
          </ArcherContainer>
        </>
      )}
    </>

  )
}

export default FrameworkComponent