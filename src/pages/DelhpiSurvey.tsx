import Navbar from "../components/Navbar";
import { Button, Divider, Paper, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import React from 'react';

import FrameworkComponent from "../components/FrameworkComponent";
import { FirebaseService } from "../services/FirebaseService";
import { Framework } from "../types/Framework.type";
import { Modal } from "../components/Modal";

interface SelectItemsProps {
  id: number,
  title: string,
  items: Framework
}

export default function DelphiSurvey() {

  const [loading, setLoading] = React.useState<boolean>(true);
  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);
  const [modalContent, setModalContent] = React.useState<SelectItemsProps[]>([] as SelectItemsProps[]);

  React.useEffect(() => {

    FirebaseService.getFrameworkData((data: Framework[]) => {
      const socialHumanFactorsLocal = data.filter((item) => item.id === "social-human-factors")[0];
      const copingMechanismsLocal = data.filter((item) => item.id === "coping-mechanisms")[0];
      const contextualCharacteristicsLocal = data.filter((item) => item.id === "contextual-characteristics")[0];
      const barriersToImprovingLocal = data.filter((item) => item.id === "barriers-to-improving")[0];
      const strategiesLocal = data.filter((item) => item.id === "strategies")[0];

      setCopingMechanisms(copingMechanismsLocal);
      setContextualCharacteristics(contextualCharacteristicsLocal);
      setSocialHumanFactors(socialHumanFactorsLocal);
      setBarriersToImproving(barriersToImprovingLocal);
      setStrategies(strategiesLocal);

      setModalContent([
        {
          id: 1,
          title: "Selecione os Fatores Sociais e Humanos que você observa em sua organização",
          items: socialHumanFactorsLocal ?? {} as Framework,
        },
        {
          id: 2,
          title: "Selecione as características contextuais da sua organização",
          items: contextualCharacteristicsLocal ?? {} as Framework,
        },
        {
          id: 3,
          title: "Selecione as barreiras para a melhoria dos FSH que você enfrenta",
          items: barriersToImprovingLocal ?? {} as Framework,
        },
        {
          id: 4,
          title: "Selecione as estratégias que você utiliza para lidar com os FSH",
          items: strategiesLocal ?? {} as Framework,
        },
        {
          id: 5,
          title: "Selecione os mecanismos de enfrentamento você utiliza para lidar com os FSH, quando as estratégias não surtem efeito",
          items: copingMechanismsLocal ?? {} as Framework,
        }
      ]);

      setLoading(false);
    });


  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving, setModalContent]);


  const [currentModal, setCurrentModal] = React.useState<number>(0);


  const WelcomeModal = () => {

    return (<Modal.Root state={currentModal == 0} id="0" title="Seja bem vindo a Pesquisa Delphi de Fatores Sociais e Humanos em ECOS!" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          aaa
        </Typography>
        <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
          aaa
        </Typography>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={() => setCurrentModal(1)}>
        <Button onClick={() => setCurrentModal(1)} variant='contained'>Próximo</Button>
      </Modal.Actions>
    </Modal.Root>);
  }

  const SelectItemsModal = (props: SelectItemsProps) => {
    console.log('currentModal');

    return (
      <Modal.Root state={currentModal == props.id} id={props.id.toString()} title={props.title} handleClose={() => false}>
        <Modal.ListSelect items={props.items} handleItemClick={() => false} />

        <Divider />
        <Modal.Actions handleClose={() => setCurrentModal((curr) => curr + 1)}>
          <Button onClick={() => setCurrentModal((curr) => curr - 1)} variant='contained'>Anterior</Button>
          <Button onClick={() => setCurrentModal((curr) => curr + 1)} variant='contained'>Próximo</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  return (
    <>

      {!loading&&<WelcomeModal />}
      {!loading&&modalContent.map((item)=><SelectItemsModal id={item.id} title={item.title} items={item.items} />)}
      
      <Box sx={{ backgroundColor: '#ebebeb' }}>
        <Navbar />
        <Toolbar />
        <Container sx={{ minHeight: '100vh' }} component={Paper} elevation={3} style={{ paddingTop: '1%' }} maxWidth={false}>
          <FrameworkComponent
            copingMechanisms={copingMechanisms}
            contextualCharacteristics={contextualCharacteristics}
            socialHumanFactors={socialHumanFactors}
            barriersToImproving={barriersToImproving}
            strategies={strategies}
          />
        </Container>
        <Footer />
      </Box>
    </>
  )
}