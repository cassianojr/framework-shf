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
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EcosystemService from "../services/EcosystemService";
import { NewAnswers } from "../types/Answer.type";
import { QuestionService } from "../services/QuestionService";

interface SelectItemsProps {
  id: string,
  title: string,
  items: React.MutableRefObject<ItemType[]>,
  changeItems: (value: ItemType[]) => void,
  order: number
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
  const [currentRound, setCurrentRound] = React.useState<number>(0);

  const { t } = useTranslation('ecos_survey');

  const { signed, loading, getUser } = React.useContext(AuthenticationContext) as AuthenticationContextType;

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

  const ecosId = useParams().ecosId;

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    const getEcosData = async () => {
      if (!ecosId) return;
      const ecosData = await EcosystemService.getEcosystem(ecosId);
      if (ecosData.status !== "waiting-for-answers") {
        throw new Error("Ecosystem is not waiting for answers");
      }
      return ecosData;
    }

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
          id: "social-human-factors",
          title: t('fsh_affirmative'),
          items: shfRef,
          changeItems: changeShfRef,
          order: 1
        },
        {
          id: "coping-mechanisms",
          title: t('cc_affirmative'),
          items: contextualCharacteristicsRef,
          changeItems: changeContextualCharacteristicsRef,
          order: 2
        },
        {
          id: "contextual-characteristics",
          title: t('barriers_affirmative'),
          items: barriersToImprovingRef,
          changeItems: changeBarriersToImprovingRef,
          order: 3
        },
        {
          id: "barriers-to-improving",
          title: t('strategies_affirmative'),
          items: strategiesRef,
          changeItems: changeStrategiesRef,
          order: 4
        },
        {
          id: "strategies",
          title: t('coping_mec_affirmative'),
          items: copingMechanismRef,
          changeItems: changeCopingMechanismRef,
          order: 5
        }
      ]);

      setAppLoading(false);
    }

    getEcosData().then((ecosData) => {
      if(!ecosData) return;

      setCurrentRound(ecosData.current_round);

      const localStorageData = localStorage.getItem('frameworkData');
      if (localStorageData) {
        handleFrameworkData(JSON.parse(localStorageData));
        return;
      }

      FirebaseService.getFrameworkData((data: Framework[]) => {
        localStorage.setItem('frameworkData', JSON.stringify(data));
        handleFrameworkData(data);
      });
    }).catch(() => {
      alert("Ecosystem is not waiting for answers");
      navigate('/dashboard');
      return;
    });

  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving, setModalContent, loading, signed, navigate, t, ecosId]);

  const [currentModal, setCurrentModal] = React.useState<number>(0);

  const WelcomeModal = () => {

    return (<Modal.Root state={currentModal == 0} id="0" title={t('welcome_text')} handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          {t('instructions.p1')}
        </Typography>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }} variant="h6">
          {t('instructions.p2')}
        </Typography>
        <ul>
          <li>{t('instructions.i1')}</li>
          <li>{t('instructions.i2')}</li>
          <li>{t('instructions.i3')}</li>
          <li>{t('instructions.i4')}</li>
        </ul>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={() => setCurrentModal(1)}>
        <Button onClick={() => setCurrentModal(1)} variant='contained'>{t('next_btn')}</Button>
      </Modal.Actions>
    </Modal.Root>);
  }

  const SelectItemsModal = (props: SelectItemsProps) => {

    const handleNextBtnClick = () => {
      if (currentModal < 5) {
        setCurrentModal((curr) => curr + 1);
        return;
      }

      const answers = {
        user_id: getUser().uid,
        user_email: getUser().email,
        ecossystem_id: ecosId,
        round: currentRound,
        answers: modalContent.map((modalContentItem) => {
          return {
            framework_item: modalContentItem.id,
            question: modalContentItem.title,
            items: modalContentItem.items.current.map((item) => {
              return {
                id: item.id,
                ids: item.ids,
                names: item.names,
                answer: item.ratio
              }
            })
          }
        })
      } as NewAnswers;

      QuestionService.saveAnswers(answers, (answerId) =>{
        console.log(answerId);
      }, ()=>console.log('error'));

    }

    return (
      <Modal.Root state={currentModal == props.order} id={props.id.toString()} title={props.title} handleClose={() => false} size='md'>
        <Modal.FrameworkDataTable items={props.items} changeItems={props.changeItems} />

        <Divider />
        <Modal.Actions handleClose={() => setCurrentModal((curr) => curr + 1)}>
          <Button onClick={() => setCurrentModal((curr) => curr - 1)} variant='contained'>{t('back_btn')}</Button>
          <Button onClick={handleNextBtnClick} variant='contained'>{(currentModal != 5) ? t('next_btn') : t('view_answer_btn')}</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  return (
    <>

      {!appLoading && <WelcomeModal />}
      {!appLoading && modalContent.map((item) => <SelectItemsModal id={item.id} title={item.title} items={item.items} changeItems={item.changeItems} key={item.id} order={item.order} />)}

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