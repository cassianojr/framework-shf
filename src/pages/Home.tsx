import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/images/hero.jpg';

function Home() {

  const heroData = {
    title: 'Explore human and social factors',
    description: 'The Framework SHF-RM-SECO is a tool to help identify and improve social and human factors in requirements management in software ecosystems.',
    image,
    button: 'Try now!',
    buttonLink: '/framework'
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Hero {...heroData} />
      <Container sx={{ minHeight: '100vh' }}>
        <section id="about">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              About the Framework
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{textAlign:'justify'}}>
              Identifying and improving social and human factors in requirements management in software ecosystems is a challenge. The Framework SHF-RM-SECO supports identifying and improving these factors during requirements management activities in software ecosystems.
            </Typography>

            <Typography variant="h4" component="h1" gutterBottom>
              Get a 360 view of social and human factors
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{textAlign:'justify'}}>
              <ol>
                <li>Identify the social and human factors that influence requirements management activities in your software ecosystem; </li>
                <li>Identify the contextual characteristics of requirements management in your software ecosystem;</li>
                <li>Point out the barriers you face to improving social and human factors;</li>
                <li>Get suggestions for strategies and coping mechanisms to use for requirements management in your software ecosystem;</li>
              </ol>
            </Typography>
            <Button
              component={Link}
              to={heroData.buttonLink}
              variant="contained"
              sx={{ mt: 3, mr: 2 }}>
              Try now!
            </Button>
          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Home