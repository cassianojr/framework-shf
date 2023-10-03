import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../assets/images/hero.jpg';
import {useTranslation} from "react-i18next";

function Home() {

  const {t} = useTranslation('home');

  const heroData = {
    title: t('hero.title'),
    description: t('hero.description'),
    image,
    button: t('hero.button_try_now'),
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
              {t('main.title')}
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'justify' }}>
              <ol>
                <li>{t('main.list_item.1')}</li>
                <li>{t('main.list_item.2')}</li>
                <li>{t('main.list_item.3')}</li>
                <li>{t('main.list_item.4')}</li>
              </ol>
            </Typography>
            <Button
              component={Link}
              to={heroData.buttonLink}
              variant="contained"
              sx={{ mt: 3, mr: 2 }}>
              {t('hero.button_try_now')}
            </Button>
          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Home