import * as React from 'react';
import Navbar from "../components/Navbar";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import StepperComponent from "../components/StepperComponent";
import Box from '@mui/material/Paper';

import steps from '../../data.json';
import data from '../../src/assets/framework-data.json';
import AccordionComponent from '../components/AccordionComponent';

export default function Framework() {


  const [stepsState, setStepsState] = React.useState(steps);

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