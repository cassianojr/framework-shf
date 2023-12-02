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
  items: React.MutableRefObject<ItemType[]>,
  changeItems: (value:ItemType[]) => void,
}

interface ItemType {
  id: string,
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  },
  liked: boolean,
  disliked: boolean,
  votes?: number
}

export default function DelphiSurvey() {

  const [loading, setLoading] = React.useState<boolean>(true);
  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);
  const [modalContent, setModalContent] = React.useState<SelectItemsProps[]>([] as SelectItemsProps[]);


  const shfRef = React.useRef<ItemType[]>([]);
  const changeShfRef = (items:ItemType[]) => {shfRef.current = items};

  const copingMechanismRef = React.useRef<ItemType[]>([]);
  const changeCopingMechanismRef = (items:ItemType[]) => {copingMechanismRef.current = items};

  const contextualCharacteristicsRef = React.useRef<ItemType[]>([]);
  const changeContextualCharacteristicsRef = (items:ItemType[]) => {contextualCharacteristicsRef.current = items};

  const barriersToImprovingRef = React.useRef<ItemType[]>([]);
  const changeBarriersToImprovingRef = (items:ItemType[]) => {barriersToImprovingRef.current = items};

  const strategiesRef = React.useRef<ItemType[]>([]);
  const changeStrategiesRef = (items:ItemType[]) => {strategiesRef.current = items};
  
  React.useEffect(() => {

    const handleFrameworkItemsRef = (frameworkItem:Framework) => {
      return frameworkItem.items.map((item) => {
        return {
          id: item.id,
          names: item.names,
          descriptions: item.descriptions,
          liked: false,
          disliked: false
        } as ItemType;
      });
    }

    FirebaseService.getFrameworkData((data: Framework[]) => {
      const socialHumanFactorsLocal = data.filter((item) => item.id === "social-human-factors")[0];
      const copingMechanismsLocal = data.filter((item) => item.id === "coping-mechanisms")[0];
      const contextualCharacteristicsLocal = data.filter((item) => item.id === "contextual-characteristics")[0];
      const barriersToImprovingLocal = data.filter((item) => item.id === "barriers-to-improving")[0];
      const strategiesLocal = data.filter((item) => item.id === "strategies")[0];

      changeShfRef(handleFrameworkItemsRef(socialHumanFactorsLocal));
      changeCopingMechanismRef(handleFrameworkItemsRef(copingMechanismsLocal));
      changeContextualCharacteristicsRef(handleFrameworkItemsRef(contextualCharacteristicsLocal));
      changeBarriersToImprovingRef(handleFrameworkItemsRef(barriersToImprovingLocal));
      changeStrategiesRef(handleFrameworkItemsRef(strategiesLocal));

      setCopingMechanisms(copingMechanismsLocal);
      setContextualCharacteristics(contextualCharacteristicsLocal);
      setSocialHumanFactors(socialHumanFactorsLocal);
      setBarriersToImproving(barriersToImprovingLocal);
      setStrategies(strategiesLocal);

      setModalContent([
        {
          id: 1,
          title: "Selecione os Fatores Sociais e Humanos que você observa em sua organização",
          items: shfRef,
          changeItems: changeShfRef
        },
        {
          id: 2,
          title: "Selecione as características contextuais da sua organização",
          items: contextualCharacteristicsRef,
          changeItems: changeContextualCharacteristicsRef
        },
        {
          id: 3,
          title: "Selecione as barreiras para a melhoria dos FSH que você enfrenta",
          items: barriersToImprovingRef,
          changeItems: changeBarriersToImprovingRef
        },
        {
          id: 4,
          title: "Selecione as estratégias que você utiliza para lidar com os FSH",
          items: strategiesRef,
          changeItems: changeStrategiesRef
        },
        {
          id: 5,
          title: "Selecione os mecanismos de enfrentamento você utiliza para lidar com os FSH, quando as estratégias não surtem efeito",
          items: copingMechanismRef,
          changeItems: changeCopingMechanismRef
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

    return (
      <Modal.Root state={currentModal == props.id} id={props.id.toString()} title={props.title} handleClose={() => false} size='sm'>
        <Modal.ListSelect items={props.items} handleItemClick={() => false} changeItems={props.changeItems}/>

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
      {!loading&&modalContent.map((item)=><SelectItemsModal id={item.id} title={item.title} items={item.items} changeItems={item.changeItems} key={item.id}/>)}
      
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