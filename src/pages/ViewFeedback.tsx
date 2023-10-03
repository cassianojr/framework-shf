import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Box, Container, Paper, Toolbar, Typography } from '@mui/material';
import SuggestionTable from '../components/SuggestionsTable';
import FrameworkRatings from '../components/FrameworkRatings';
import { useTranslation } from 'react-i18next';

export default function ViewFeedback() {

  
  const {t} = useTranslation('view_feedback');

  return (
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '83.9vh' }}>
        <Box component={Paper} elevation={3} sx={{ marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ padding: '1rem' }} color='primary'>{t('framework_ratings')}</Typography>
          <FrameworkRatings />
        </Box>

        <Box component={Paper} elevation={3} sx={{ marginTop: '2rem' }}>
          <Typography variant="h5" sx={{ padding: '1rem' }} color='primary'>{t('framework_suggestions')}</Typography>
          <SuggestionTable />
        </Box>

      </Container>
      <Footer />
    </Box>
  )
}
