import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/images/hero.jpg';

function Home() {

  const heroData = {
    title: 'Explore human and social factors',
    description: 'The SHF Framework is a tool to help identify and analyze human and social factors in software ecosystems.',
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
            <Typography variant="h5" component="h2" gutterBottom>
              Identifying and analyzing human and social factors in software ecosystems is a complex task. The SHF Framework helps in identifying and analyzing these factors in software ecosystems.
            </Typography>

            <Typography variant="h4" component="h1" gutterBottom>
              How to use
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              <ol>
                <li>Identify the human and social factors in your software ecosystem;</li>
                <li>Identify the contextual characteristics of your ecosystem;</li>
                <li>Point out the barriers you face;</li>
                <li>Receive suggestions for strategies and coping mechanisms to be used in your ecosystem;</li>
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