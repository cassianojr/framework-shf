import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Box, Container, Toolbar, Typography } from '@mui/material';

function Guidelines() {

  const typographyStyle = {
    textAlign: 'justify',
    fontSize: '1.2rem',
    textIndent: '2rem'
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '70vh' }}>
        <section id="about">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Guidelines for using the SHF Framework
            </Typography>
            <Typography sx={typographyStyle}>
              <i>Ask:</i> make problems visible. The first step in assessing the Social and human factors that influences requirements management in software ecosystems is to learn about the day-to-day factors of the professionals working in requirements management activities. With this, ask the professionals on the team what factors they have already faced, present the list of barriers, and understand if they have met some of them in their activities of the requirements management in software ecosystems. It is essential that this step is done individually, and you can also use online forms if you prefer.
            </Typography>
            <Typography sx={typographyStyle}>
              <i>Plan:</i> the improvement strategies should occur at the individual team and organizational level, depending on the identified factors and barriers. After collecting feedback, the responses must be evaluated to determine which barriers and factors require prioritization for improvement. One must plan improvement strategies and allocate financial resources for rectification if necessary.
            </Typography>
            <Typography sx={typographyStyle}>
              <i>Action:</i> continuous, minor improvements are key. Gradually implement the improvement strategies and assess if they effectively address the barriers and factors. Monitoring the strategy’s success is essential for overcoming barriers and improving Social and human factors. Once the planned improvements are implemented, repeat this three-step process to sustain progress and address the following factor and barriers, thereby maintaining a continuous improvement process.
            </Typography>

          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Guidelines