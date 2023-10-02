import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/images/hero.jpg';

function Home() {

  const heroData = {
    title: 'Explore Fatores Sociais e Humanos',
    description: 'O framework SHFiRM-SECO é uma ferramenta para auxiliar na identificação e melhoria dos fatores sociais e humanos na gerência de requisitos em ecossistemas de Software.',
    image,
    button: 'Teste agora!',
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
            {/* <Typography variant="h4" component="h1" gutterBottom>
              Sobre o Framework
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'justify' }}>
              Identificar e melhorar fatores sociais e humanos em gerência de requisitos em ecossistemas de software é desafiador. O framework SHFiRM-SECO auxilia a identificar e melhorar os fatores humanos e sociais em gerência de requisitos em ecossistemas de software.
            </Typography> */}

            <Typography variant="h4" component="h1" gutterBottom>
              Obtenha uma Visão 360º dos Fatores Sociais e Humanos na Gerência de Requisitos
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'justify' }}>
              <ol>
                <li>Identifique os fatores sociais e humanos que influenciam as atividades da gerência de requisitos em seu ecossistema de software;</li>
                <li>Identifique as características contextuais da gerência de requisitos em seu ecossistema de software;</li>
                <li>Aponte as barreiras que você enfrenta para melhorar os fatores sociais e humanos na gerência de requisitos em seu ecossistema de software;</li>
                <li>Obtenha sugestões de estratégias de melhoria e mecanismos de enfrentamento para usar durante as atividades da gerência de requisitos em seu ecossistema de software.</li>
              </ol>
            </Typography>
            <Button
              component={Link}
              to={heroData.buttonLink}
              variant="contained"
              sx={{ mt: 3, mr: 2 }}>
              Teste agora!
            </Button>
          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Home