import { Box, Card, Grid, Typography } from '@mui/material';
import { ArcherContainer, ArcherElement } from 'react-archer';


import { db } from '../services/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { Framework } from '../types/Framework.type';

import AccordionComponent from '../components/AccordionComponent';
import ListPersonalAndSocial from './ListPersonalAndSocial';
import React from 'react';
import Modal from './Modal';
import SkeletonComponent from './SkeletonComponent';

function FrameworkComponent() {

  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);

  React.useEffect(() => {
    function getFrameworkData() {
      onSnapshot(collection(db, "framework-items"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Framework[];
        // setFrameworkData(data);
        setCopingMechanisms(data.filter((item) => item.id === "coping-mechanisms")[0]);
        setContextualCharacteristics(data.filter((item) => item.id === "contextual-characteristics")[0]);
        setSocialHumanFactors(data.filter((item) => item.id === "social-human-factors")[0]);
        setBarriersToImproving(data.filter((item) => item.id === "barriers-to-improving")[0]);
        setStrategies(data.filter((item) => item.id === "strategies")[0]);
      });
    }

    getFrameworkData();
  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving]);

  // console.log(contextualCharacteristics);


  const socialGroupItems = socialHumanFactors?.items?.slice(0, 17);
  const personalGroupItems = socialHumanFactors?.items?.slice(17);

  // console.log(socialHumanFactors1.items);


  const [centerModalState, setCenterModalState] = React.useState(false);

  const centerModalContent = {
    id: 'requirements-management in SECO',
    title: 'REQUIREMENTS MANAGMENT IN SECO'
  }


  return (
    <>
      {socialHumanFactors == {} as Framework ? <h1>Loading...</h1> : (
        <>
          <Modal
            open={centerModalState}
            setOpen={setCenterModalState}
            handleClose={() => setCenterModalState(false)}
            modalContent={centerModalContent}>
            <>
              <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
                Requirements management is “a process that accompanies the planning and development of a system by capturing and mapping the source and context of change” (WIEGERS; BEATTY, 2013). In this way, requirements management is considered an organized process of documentation, analysis (negotiation), traceability, prioritization, change control, version control, and requirements communication (ISO/IEC/IEEE 29148, 2018).
              </Typography>
              <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
                A software ecosystem can be analyzed from a project perspective: “A software ecosystem is a collection of software projects which are developed and evolve together in the same environment” (LUGUN et al. 2010).
              </Typography>
            </>
          </Modal>
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
                          <AccordionComponent data={socialHumanFactors}>
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
                          <AccordionComponent data={contextualCharacteristics} />
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
                      <Card elevation={8} style={{ maxWidth: '35%', textAlign: 'center', padding: '1%', backgroundColor: '#757173', color: 'white', cursor: 'pointer' }} onClick={() => setCenterModalState(true)}>
                        <Typography sx={{ fontSize: '.8rem' }}>
                          REQUIREMENTS MANAGMENT IN SECO
                        </Typography>
                      </Card>
                    </ArcherElement>

                  </Box>
                  <ArcherElement
                    id="middle-target"
                  >
                    <div style={{ width: '29%', marginTop: '-32.5vh' }}>
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
                          <AccordionComponent data={copingMechanisms} />
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
                          <AccordionComponent data={barriersToImproving} />
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
                      <AccordionComponent data={strategies} />
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