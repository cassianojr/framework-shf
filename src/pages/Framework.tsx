import Navbar from "../components/Navbar";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Paper';

import data from '../../src/assets/framework-data.json';
import AccordionComponent from '../components/AccordionComponent';

export default function Framework() {



  return (
    <Box sx={{ backgroundColor: '#ebebeb' }}>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '100vh' }}>
        <AccordionComponent data={data} />
      </Container>
      <Footer />
    </Box>
  )
}