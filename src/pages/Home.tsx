import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/images/hero.jpg';

function Home() {

  const heroData = {
    title: 'Explore fatores humanos e sociais',
    description: 'O Framework SHF é uma ferramenta para auxiliar na identificação e análise de fatores humanos e sociais em ecossistemas de software.',
    image,
    button: 'Teste agora!',
    buttonLink: '/framework'
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Hero {...heroData} />
      <Container>
        <section id="sobre">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sobre o Framework
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Identificar e analisar fatores humanos e sociais em ecossistemas de software é uma tarefa complexa. O Framework SHF ajuda na identificação e análise desses fatores em ecossistemas de software.
            </Typography>

            <Typography variant="h4" component="h1" gutterBottom>
              Como usar
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              <ol>
                <li>Identifique os fatores humanos e sociais em seu ecossistema de software;</li>
                <li>Identifique as características contextuais do seu ecossistema;</li>
                <li>Aponte as barreiras que você enfrenta;</li>
                <li>Receba sugestões de estratégias e mecanismos de enfrentamento a serem utilizadas mo seu ecossitema;</li>
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