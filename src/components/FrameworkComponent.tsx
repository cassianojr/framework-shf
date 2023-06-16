import { Box, Card, Grid, Typography } from '@mui/material';
import { ArcherContainer, ArcherElement } from 'react-archer';

import data from '../../src/assets/framework-data.json';
import AccordionComponent from '../components/AccordionComponent';
import FixedAccordionComponent from './FixedAccordionComponent';

function FrameworkComponent() {

  const contextualCharacteristics = [data[0]];
  const socialHumanFactors = [data[1]];
  const barriersToImproving = [data[2]];
  const strategies = [data[3]];
  const copingMechanisms = [data[4]];

  return (
    <ArcherContainer strokeColor='black' noCurves >
      <Box sx={{paddingTop: '1%'}}>

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
                  <AccordionComponent data={socialHumanFactors} />
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
                  <FixedAccordionComponent data={contextualCharacteristics} />
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
                <Card elevation={8} style={{ maxWidth: '35%', textAlign: 'center', padding: '1%', backgroundColor: '#757173', color: 'white' }}>
                  <Typography sx={{fontSize: '.8rem'}}>
                    REQUIREMENTS MANAGMENT IN SECO
                  </Typography>
                </Card>
              </ArcherElement>

            </Box>
              <ArcherElement
              id="middle-target"
              >
            <div style={{ width: '29%', marginTop: '-32.5vh'}}>
            </div>
              </ArcherElement>
          </Grid>

          <Grid container item xs={5}>
            <Box width={'100%'}>
              <ArcherElement
                id="coping-mechanisms"
              >
                <div>
                  <AccordionComponent data={copingMechanisms} />
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
                  <AccordionComponent data={barriersToImproving} />
                </div>
              </ArcherElement>
            </Box>
          </Grid>

        </Grid>

        <Box>
          <ArcherElement id='strategies'>
            <div>
              <AccordionComponent data={strategies} />
            </div>
          </ArcherElement>
        </Box>
      </Box>
    </ArcherContainer>
  )
}

export default FrameworkComponent