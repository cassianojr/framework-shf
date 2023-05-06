import * as React from 'react';
import Navbar from "../components/Navbar";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import StepperComponent from "../components/StepperComponent";

export default function Framework() {

  const socialHumanFactors = [
    {
      id: 1,
      name: 'Fator humano 1',
      description: 'Descrição do fator 1',
      selected: false,
    },
    {
      id: 2,
      name: 'Fator humano 2',
      description: 'Descrição do fator 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Fator humano 3',
      description: 'Descrição do fator 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Fator humano 4',
      description: 'Descrição do fator 4',
      selected: false,
    },
  ];

  const contextualCharacteristics = [
    {
      id: 1,
      name: 'Característica 1',
      description: 'Descrição da característica 1',
      selected: false,
    },
    {
      id: 2,
      name: 'Característica 2',
      description: 'Descrição da característica 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Característica 3',
      description: 'Descrição da característica 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Característica 4',
      description: 'Descrição da característica 4',
      selected: false,
    },
  ];


  const barriers = [
    {
      id: 1,
      name: 'Barreira 1',
      description: 'Descrição da Barreira 1',
      selected: false,
    },
    {
      id: 2,
      name: 'Barreira 2',
      description: 'Descrição da Barreira 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Barreira 3',
      description: 'Descrição da Barreira 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Barreira 4',
      description: 'Descrição da Barreira 4',
      selected: false,
    },
  ];

  const suggestions = [
    {
      id: 1,
      name: 'Sugestão 1',
      description: 'Descrição da Sugestão 1',
      selected: false,
    },
    {
      id: 2,
      name: 'Sugestão 2',
      description: 'Descrição da Sugestão 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Sugestão 3',
      description: 'Descrição da Sugestão 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Sugestão 4',
      description: 'Descrição da Sugestão 4',
      selected: false,
    },
  ];

  const copingMecanisms = [
    {
      id: 1,
      name: 'Mecanismo 1',
      description: 'Descrição da Mecanismo 1',
      selected: false,
    },
    {
      id: 2,
      name: 'Mecanismo 2',
      description: 'Descrição da Mecanismo 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Mecanismo 3',
      description: 'Descrição da Mecanismo 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Mecanismo 4',
      description: 'Descrição da Mecanismo 4',
      selected: false,
    },
  ];

  const steps = [
    { label: 'Selecione as características contextuais', listItems: contextualCharacteristics },
    { label: 'Selecione os fatores humanos e sociais', listItems: socialHumanFactors },
    { label: 'Selecione as barreiras que você enfrenta', listItems: barriers },
    { label: 'Estratégias para realizar melhorias', listItems: suggestions },
  ];

  const [stepsState, setStepsState] = React.useState(steps);

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container sx={{ mt: 3, minHeight: '81vh' }}>

        {/* <StepperComponent steps={steps} suggestions={suggestions} copingMecanisms={copingMecanisms}/> */}
        <StepperComponent steps={stepsState} setSteps={setStepsState} suggestions={suggestions} copingMecanisms={copingMecanisms}/>

      </Container>
      <Footer />
    </>
  )
}