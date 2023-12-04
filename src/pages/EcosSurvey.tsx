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
  changeItems: (value:ItemType[]) => void,
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
  },
  liked: boolean,
  disliked: boolean,
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

  const navigate= useNavigate();

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
    if(loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    const handleFrameworkItemsRef = (frameworkItem:Framework) => {
      return frameworkItem.items.map((item) => {
        return {
          id: item.id,
          ids: item.ids,
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
          title: "Quais dos Fatores Sociais e Humanos abaixo que você observa em sua organização?",
          items: shfRef,
          changeItems: changeShfRef
        },
        {
          id: 2,
          title: "Quais das Características Contextuais você observa em sua organização?",
          items: contextualCharacteristicsRef,
          changeItems: changeContextualCharacteristicsRef
        },
        {
          id: 3,
          title: "Quais Barreiras para a Melhoria dos FSH você enfrenta em sua organização?",
          items: barriersToImprovingRef,
          changeItems: changeBarriersToImprovingRef
        },
        {
          id: 4,
          title: "Quais Estratégias você utiliza para lidar com as barreiras?",
          items: strategiesRef,
          changeItems: changeStrategiesRef
        },
        {
          id: 5,
          title: "Quais Mecanismos de Enfrentamento você utiliza para lidar com os FSH, quando as Estratégias não surtem efeito?",
          items: copingMechanismRef,
          changeItems: changeCopingMechanismRef
        }
      ]);

      setAppLoading(false);
    });


  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving, setModalContent, loading, signed, navigate]);

  const [currentModal, setCurrentModal] = React.useState<number>(0);

  const WelcomeModal = () => {

    return (<Modal.Root state={currentModal == 0} id="0" title="Seja bem vindo a Pesquisa sobre Fatores Sociais e Humanos em Ecossistemas de Software!" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          Essa pesquisa visa aprimorar o entendimento dos Fatores Sociais e Humanos (FSH) no contexto do Ecossistema de Software (ECOS) e como eles podem ser utilizados para melhorar a qualidade do ECOS. Para isso, precisamos da sua ajuda para responder algumas perguntas sobre os FSH que você observa em sua organização. 
        </Typography>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          As perguntas estão divididas em cinco partes. Cada parte apresenta uma lista de FSH, Características Contextuais, Barreiras, Estratégias e Mecanismos de Enfrentamento, respectivamente. Para cada parte, você deve indicar como você percebe cada igem em sua organização. Você pode indicar quantos itens quiser.
        </Typography>
        <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
          Essa pesquisa utiliza a metodologia Delphi, que consiste em uma série de rodadas de questionários. Nessa primeira rodada, você deve indicar os itens que você observa em sua organização. Nas próximas rodadas, você irá visualizar os itens indicados por outros participantes e indicar quais você também observa em sua organização. Ao final das rodadas, os itens mais indicados serão considerados como os FSH mais relevantes para o ECOS.
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
        <Modal.ListSelect items={props.items} changeItems={props.changeItems}/>

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

      {!appLoading&&<WelcomeModal />}
      {!appLoading&&modalContent.map((item)=><SelectItemsModal id={item.id} title={item.title} items={item.items} changeItems={item.changeItems} key={item.id}/>)}
      
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