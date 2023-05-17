import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { ArcherContainer, ArcherElement } from 'react-archer';

import data from '../../src/assets/framework-data.json';
import AccordionComponent from '../components/AccordionComponent';

const boxStyle = { padding: '10px', border: '1px solid black' };

function FrameworkComponent() {

  const contextualCharacteristics = [data[0]];
  const socialHumanFactors = [data[1]];
  const barriersToImproving = [data[2]];
  const strategies = [data[3]];
  const copingMechanisms = [data[4]];

  return (
    <ArcherContainer strokeColor='black' noCurves >
      <Container sx={{ minHeight: '100vh' }}>

        <Grid container spacing={2} style={{ height: '80vh' }}>

          <Grid container item xs={4}>
            <Box>
              <ArcherElement
                id="contextual-characteristics"
                relations={[{
                  targetId: 'framework-shf',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                  style: { strokeDasharray: '5,5' },
                }]}
              >
                <div>
                  <AccordionComponent data={contextualCharacteristics} />
                </div>
              </ArcherElement>
            </Box>
            <Box>
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
          </Grid>

          <Grid item xs={4}>
            {/* Box on the center (vertical and horizontal) */}
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
                <Card elevation={8} style={{ maxWidth: '50%', textAlign: 'center', padding: '5%', backgroundColor: '#757173', color: 'white' }}>
                  <Typography fontWeight={'bold'}>
                    REQUIREMENTS MANAGMENT IN SECO
                  </Typography>
                </Card>
              </ArcherElement>
            </Box>
          </Grid>

          <Grid container item xs={4}>
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

      </Container>
    </ArcherContainer>
  )
}

export default FrameworkComponent