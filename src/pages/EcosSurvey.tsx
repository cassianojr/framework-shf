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
import { AuthenticationContext, AuthenticationContextType } from "../context/authenticationContext";
import { useNavigate } from "react-router-dom";

interface SelectItemsProps {
  id: number,
  title: string,
  items: React.MutableRefObject<ItemType[]>,
  changeItems: (value: ItemType[]) => void,
}

interface ItemType {
  id: string,
  ids: {
    [key: string]: string
  },
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  }
  ratio: number,
  votes?: number
}
export default function EcosSurvey() {

  const [appLoading, setAppLoading] = React.useState<boolean>(true);
  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);
  const [modalContent, setModalContent] = React.useState<SelectItemsProps[]>([] as SelectItemsProps[]);

  const { signed, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();

  const shfRef = React.useRef<ItemType[]>([]);
  const changeShfRef = (items: ItemType[]) => { shfRef.current = items };

  const copingMechanismRef = React.useRef<ItemType[]>([]);
  const changeCopingMechanismRef = (items: ItemType[]) => { copingMechanismRef.current = items };

  const contextualCharacteristicsRef = React.useRef<ItemType[]>([]);
  const changeContextualCharacteristicsRef = (items: ItemType[]) => { contextualCharacteristicsRef.current = items };

  const barriersToImprovingRef = React.useRef<ItemType[]>([]);
  const changeBarriersToImprovingRef = (items: ItemType[]) => { barriersToImprovingRef.current = items };

  const strategiesRef = React.useRef<ItemType[]>([]);
  const changeStrategiesRef = (items: ItemType[]) => { strategiesRef.current = items };

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    const handleFrameworkItemsRef = (frameworkItem: Framework) => {
      return frameworkItem.items.map((item) => {
        return {
          id: item.id,
          ids: item.ids,
          names: item.names,
          descriptions: item.descriptions,
          ratio: 0,
        } as ItemType;
      });
    }


    const handleFrameworkData = (data: Framework[]) => {
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
          title: "Os fatores sociais e humanos abaixo listados  influenciam a gerência de requisitos em ecossistemas de software.",
          items: shfRef,
          changeItems: changeShfRef
        },
        {
          id: 2,
          title: "As características contextuais da gerência de requisitos em ecossistemas de software abaixo listadas têm um impacto na importância de considerar os fatores sociais e humanos.",
          items: contextualCharacteristicsRef,
          changeItems: changeContextualCharacteristicsRef
        },
        {
          id: 3,
          title: "As barreiras listadas abaixo impedem a melhoria dos fatores sociais e humanos na gerência de requisitos em ecossistemas de software.",
          items: barriersToImprovingRef,
          changeItems: changeBarriersToImprovingRef
        },
        {
          id: 4,
          title: "As estratégias de melhorias abaixo listadas podem ser utilizadas para superar as barreiras e melhorar os fatores sociais e humanos ",
          items: strategiesRef,
          changeItems: changeStrategiesRef
        },
        {
          id: 5,
          title: "Os mecanismos de enfrentamento listados abaixo podem ser utilizados quando as estratégias de melhoria não funcionam.",
          items: copingMechanismRef,
          changeItems: changeCopingMechanismRef
        }
      ]);

      setAppLoading(false);
    }


    const localStorageData = localStorage.getItem('frameworkData');
    if (localStorageData) {
      console.log('Using local storage data');
      
      handleFrameworkData(JSON.parse(localStorageData));
      return;
    }

    FirebaseService.getFrameworkData((data:Framework[])=>{
      localStorage.setItem('frameworkData', JSON.stringify(data));
      handleFrameworkData(data);
    });


  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving, setModalContent, loading, signed, navigate]);

  const [currentModal, setCurrentModal] = React.useState<number>(0);

  const WelcomeModal = () => {

    return (<Modal.Root state={currentModal == 0} id="0" title="Seja bem vindo a Pesquisa sobre Fatores Sociais e Humanos em Ecossistemas de Software!" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          Os componentes e itens aqui apresentados representam a visão de um framework conceitual de ação para entender e melhorar fatores sociais e humanos que influenciam a gerência de requisitos em ecossistemas de software. Identificou-se esses componentes e seus itens em um estudo de rapid review sobre fatores sociais e humanos na engenharia de requisitos em ecossistemas de software (Citação da rapid review) e em um estudo de campo sobre fatores sociais e humanos na gerência de requisitos em ecossistemas de software (Citação do estudo de campo). Cada um dos componentes e itens é acompanhado de sua definição derivados de estudos relacionados a fatores sociais e humanos na gerência de requisitos em ecossistemas de software.
        </Typography>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }} variant="h6">
          Instruções para análise dos componentes e seus itens:
        </Typography>
        <ul>
          <li>Leia a definição dos componentes e seus respectivos itens; </li>
          <li>Analise cuidadosamente cada afirmação associada aos componentes e itens;</li>
          <li>Responda de acordo com a realidade da sua organização (ecossistema de software);  </li>
          <li>Marque sua resposta entre as opções: (“Concordo totalmente”, “Concordo”, “Não concordo e nem discordo”, “Discordo” ou “Discordo totalmente”).</li>
        </ul>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={() => setCurrentModal(1)}>
        <Button onClick={() => setCurrentModal(1)} variant='contained'>Próximo</Button>
      </Modal.Actions>
    </Modal.Root>);
  }

  const SelectItemsModal = (props: SelectItemsProps) => {
    return (
      <Modal.Root state={currentModal == props.id} id={props.id.toString()} title={props.title} handleClose={() => false} size='md'>
        <Modal.FrameworkDataTable items={props.items} changeItems={props.changeItems} />

        <Divider />
        <Modal.Actions handleClose={() => setCurrentModal((curr) => curr + 1)}>
          <Button onClick={() => setCurrentModal((curr) => curr - 1)} variant='contained'>Anterior</Button>
          <Button onClick={() => setCurrentModal((curr) => curr + 1)} variant='contained'>{(currentModal != 5) ? 'Próximo' : 'Visualizar resposta'}</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  return (
    <>

      {!appLoading && <WelcomeModal />}
      {!appLoading && modalContent.map((item) => <SelectItemsModal id={item.id} title={item.title} items={item.items} changeItems={item.changeItems} key={item.id} />)}

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