import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

function Guidelines() {
  const { t } = useTranslation('guidelines');

  const typographyStyle = {
    textAlign: 'justify',
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '70vh' }}>
        <section id="guidelines">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t('title')}
            </Typography>
            <Typography sx={typographyStyle}>
              <i style={{ fontWeight: 'bold' }}>{t('list.1.title')}</i> {t('list.1.description')}
            </Typography>
            <Typography sx={typographyStyle}>
              <i style={{ fontWeight: 'bold' }}>{t('list.2.title')}</i>{t('list.2.description')}
            </Typography>
            <Typography sx={typographyStyle}>
              <i style={{ fontWeight: 'bold' }}>{t('list.3.title')}</i>{t('list.3.description')}
            </Typography>

          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Guidelines