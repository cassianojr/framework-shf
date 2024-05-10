import Navbar from "../components/Navbar";
import { Divider, Paper, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import React from 'react';

import { FirebaseService } from "../services/FirebaseService";
import { Framework, FrameworkItem } from "../types/Framework.type";
import { AuthenticationContext, AuthenticationContextType } from "../context/authenticationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SnackBarComponent from "../components/SnackBarComponent";
import SurveyStepper from "../components/EcosSurvey/SurveyStepper";
import { Modal } from "../components/Modal";
import EcosProjectService from "../services/EcosProjectService";
import { EcosProject } from "../types/EcosProject.type";
import i18next from "i18next";
import { QuestionService } from "../services/QuestionService";

interface SelectItemsProps {
  id: string,
  title: string,
  items: React.MutableRefObject<FrameworkItem[]>,
  changeItems: (value: FrameworkItem[]) => void,
  optionalItems ?: React.MutableRefObject<FrameworkItem[]>,
  changeOptionalItems ?: (value: FrameworkItem[]) => void,
  optionalTitle ?: string
  viewOnly?: boolean,
  order: number
}


export default function EcosSurvey() {

  const [appLoading, setAppLoading] = React.useState<boolean>(true);

  const [errorModalState, setErrorModalState] = React.useState(false);
  const [errorModalContent, setErrorModalContent] = React.useState({ title: "", description: "" } as { title: string, description: string });

  const [questions, setQuestions] = React.useState<SelectItemsProps[]>([] as SelectItemsProps[]);
  const [feedBackSnackbarState, setFeedBackSnackbarState] = React.useState(false);
  const [feedBackSnackBar, setFeedBackSnackBar] = React.useState({ severity: "success", text: "" } as { severity: "success" | "info" | "warning" | "error", text: string });

  const { t } = useTranslation('ecos_survey');

  const { signed, loading, getUser } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const navigate = useNavigate();

  const shfRef = React.useRef<FrameworkItem[]>([]);
  const changeShfRef = (items: FrameworkItem[]) => { shfRef.current = items };

  const contextualCharacteristicsRef = React.useRef<FrameworkItem[]>([]);
  const changeContextualCharacteristicsRef = (items: FrameworkItem[]) => { contextualCharacteristicsRef.current = items };

  const barriersToImprovingRef = React.useRef<FrameworkItem[]>([]);
  const changeBarriersToImprovingRef = (items: FrameworkItem[]) => { barriersToImprovingRef.current = items };

  const strategiesRef = React.useRef<FrameworkItem[]>([]);
  const changeStrategiesRef = (items: FrameworkItem[]) => { strategiesRef.current = items };

  const copingMechanismsRef = React.useRef<FrameworkItem[]>([]);
  const changeCopingMechanismsRef = (items: FrameworkItem[]) => { copingMechanismsRef.current = items };


  const optionalShfRef = React.useRef<FrameworkItem[]>([]);
  const changeOptionalShfRef = (items: FrameworkItem[]) => { optionalShfRef.current = items };

  const optionalBarriersToImprovingRef = React.useRef<FrameworkItem[]>([]);
  const changeOptionalBarriersToImprovingRef = (items: FrameworkItem[]) => { optionalBarriersToImprovingRef.current = items };

  const optionalStrategiesRef = React.useRef<FrameworkItem[]>([]);
  const changeOptionalStrategiesRef = (items: FrameworkItem[]) => { optionalStrategiesRef.current = items };

  
  const ecosId = useParams().ecosId;

  const [ecos, setEcos] = React.useState<EcosProject | undefined>(undefined);

  const ErrorModal = () => {
    const handleClose = () => {
      setErrorModalState(false);
      navigate('/');
    }

    return (
      <Modal.Root state={errorModalState} id={errorModalContent.title} handleClose={handleClose} title={errorModalContent.title}>
        <Modal.Text>
          <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
            {errorModalContent.description}
          </Typography>
        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={handleClose} />
      </Modal.Root>
    );
  }

  React.useEffect(() => {
    if (loading) return;

    if (!signed) navigate(`/sign-in?redirect=${window.location.pathname}`);

    const getEcosData = async () => {
      if(ecos) return ecos;

      if (!ecosId) return;

      const ecosData = await EcosProjectService.getEcosProject(ecosId);
      setEcos(ecosData);

      if (ecosData.status !== "waiting-for-answers") {
        throw new Error("Ecosystem is not waiting for answers");
      }
      return ecosData;
    }

    const handleMandatoryItems = (frameworkData: Framework[], ecosData: EcosProject) => {
      const mandatoryItems = ecosData.mandatory_items;

      const shf = frameworkData.filter((item) => item.id === "social-human-factors")[0];
      const cc = frameworkData.filter((item) => item.id === "contextual-characteristics")[0];
      const barriers = frameworkData.filter((item) => item.id === "barriers-to-improving")[0];
      const strategies = frameworkData.filter((item) => item.id === "strategies")[0];

      shf.items.map((item) =>{
        mandatoryItems.shf.forEach((mandatoryItem) =>{
          if(item.id === mandatoryItem.id){
            item.selected = true;
          }
        })  
      });

      // cc.items.map((item) =>{
      //   mandatoryItems.cc.forEach((mandatoryItem) =>{
      //     if(item.id === mandatoryItem.id){
      //       item.selected = true;
      //     }
      //   })  
      // });

      cc.items = mandatoryItems.cc;
      

      barriers.items.map((item) =>{
        mandatoryItems.barriers.forEach((mandatoryItem) =>{
          if(item.id === mandatoryItem.id){
            item.selected = true;
          }
        })  
      });

      strategies.items.map((item) =>{
        mandatoryItems.strategies.forEach((mandatoryItem) =>{
          if(item.id === mandatoryItem.id){
            item.selected = true;
          }
        })  
      });      
      
      return {
        socialHumanFactorsLocal :shf,
        contextualCharacteristicsLocal: cc,
        barriersToImprovingLocal: barriers,
        strategiesLocal: strategies
      }
    }

    const handleFrameworkData = (data: Framework[], ecosData: EcosProject) => {

      const { socialHumanFactorsLocal, contextualCharacteristicsLocal, barriersToImprovingLocal, strategiesLocal } = handleMandatoryItems(data, ecosData);
      
      const copingMechanismsLocal = data.filter((item) => item.id === "coping-mechanisms")[0];

      changeShfRef(socialHumanFactorsLocal.items.filter((item) => item.selected));
      changeContextualCharacteristicsRef(contextualCharacteristicsLocal.items);
      changeBarriersToImprovingRef(barriersToImprovingLocal.items.filter((item) => item.selected));
      changeStrategiesRef(strategiesLocal.items.filter((item) => item.selected));
      changeCopingMechanismsRef(copingMechanismsLocal.items);

      changeOptionalShfRef(socialHumanFactorsLocal.items.filter((item) => !item.selected).sort((a,b) => a.names[i18next.language].localeCompare(b.names[i18next.language])));
      changeOptionalBarriersToImprovingRef(barriersToImprovingLocal.items.filter((item) => !item.selected).sort((a,b) => a.names[i18next.language].localeCompare(b.names[i18next.language])));
      changeOptionalStrategiesRef(strategiesLocal.items.filter((item) => !item.selected).sort((a,b) => a.names[i18next.language].localeCompare(b.names[i18next.language])));

      if (questions.length === 0) {
        setQuestions([
          {
            id: "social-human-factors",
            title: 'fsh_affirmative',
            items: shfRef,
            changeItems: changeShfRef,
            optionalItems: optionalShfRef,
            changeOptionalItems: changeOptionalShfRef,
            optionalTitle: "fsh_optional",
            order: 1
          },
          {
            id: "contextual-characteristics",
            title: 'cc_affirmative',
            items: contextualCharacteristicsRef,
            changeItems: changeContextualCharacteristicsRef,
            viewOnly: true,
            order: 2
          },
          {
            id: "barriers-to-improving",
            title: 'barriers_affirmative',
            items: barriersToImprovingRef,
            changeItems: changeBarriersToImprovingRef,
            optionalItems: optionalBarriersToImprovingRef,
            changeOptionalItems: changeOptionalBarriersToImprovingRef,
            optionalTitle: "barriers_optional",
            order: 3
          },
          {
            id: "strategies",
            title: 'strategies_affirmative',
            items: strategiesRef,
            changeItems: changeStrategiesRef,
            optionalItems: optionalStrategiesRef,
            changeOptionalItems: changeOptionalStrategiesRef,
            optionalTitle: "strategies_optional",
            order: 4
          },
          {
            id: "coping_mechanisms",
            title: 'coping_mec_affirmative',
            items: copingMechanismsRef,
            changeItems: changeCopingMechanismsRef,
            viewOnly: true,
            order: 5
          },
        ]);
      }

    }

    getEcosData().then((ecosData) => {
      if (!ecosData) return;

      QuestionService.getAnswersByUserId(getUser().uid)
        .then((answers) => {
          if (answers.find((answer) => answer.ecossystem_id == ecosId)) {
            setErrorModalContent({ title: t('errors.title'), description: t('errors.already_answered') });
            setErrorModalState(true);
            return;
          }
        });

      const localStorageData = localStorage.getItem('frameworkData');

      if (localStorageData) {
        handleFrameworkData(JSON.parse(localStorageData), ecosData);
        return;
      }

      FirebaseService.getFrameworkData((data: Framework[]) => {
        localStorage.setItem('frameworkData', JSON.stringify(data));
        handleFrameworkData(data, ecosData);
      });

    }).catch(() => {
      setErrorModalContent({ title: t('errors.title'), description: t('errors.not_accept_answers') });
      setErrorModalState(true);
      return;
    });

    setAppLoading(false);
  }, [questions, loading, signed, navigate, t, ecosId, getUser, ecos]);

  return (
    <>
      <ErrorModal />
      <SnackBarComponent snackBarState={feedBackSnackbarState} setSnackBarState={setFeedBackSnackbarState} severity={feedBackSnackBar.severity} text={feedBackSnackBar.text} />
      <Box >
        <Navbar />
        <Toolbar />
        <Container sx={{ minHeight: '100vh', background: '#f5f5f5' }} component={Paper} elevation={3} style={{ paddingTop: '1%' }} maxWidth={false}>

          {(!appLoading && ecos) && <SurveyStepper
            stepsVote={questions}
            ecos={ecos}
            user_id={getUser().uid}
            user_email={getUser().email}
            setFeedBackSnackBar={setFeedBackSnackBar}
            setFeedBackSnackbarState={setFeedBackSnackbarState}
          />}
        </Container>
        <Footer />
      </Box>
    </>
  )
}