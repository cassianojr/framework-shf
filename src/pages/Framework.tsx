import Navbar from "../components/Navbar";
import { Paper, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Paper';

import FrameworkComponent from "../components/FrameworkComponent";

export default function Framework() {



  return (
    <Box sx={{ backgroundColor: '#ebebeb' }}>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '100vh' }} component={Paper} elevation={3} style={{paddingTop: '1%'}} maxWidth={false}>
        <FrameworkComponent />
      </Container>
      <Footer />
    </Box>
  )
}