import Navbar from "../components/Navbar";
import { Divider, Paper, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import React from 'react';

import FrameworkComponent from "../components/FrameworkComponent";
import { FirebaseService } from "../services/FirebaseService";
import { Framework } from "../types/Framework.type";
import { Modal } from "../components/Modal";

interface ModalsProps {
  next: () => void,
  prev: () => void
}

export default function DelphiSurvey() {

  const [loading, setLoading] = React.useState<boolean>(true);
  const [copingMechanisms, setCopingMechanisms] = React.useState<Framework | undefined>(undefined);
  const [contextualCharacteristics, setContextualCharacteristics] = React.useState<Framework | undefined>(undefined);
  const [socialHumanFactors, setSocialHumanFactors] = React.useState<Framework | undefined>(undefined);
  const [barriersToImproving, setBarriersToImproving] = React.useState<Framework | undefined>(undefined);
  const [strategies, setStrategies] = React.useState<Framework | undefined>(undefined);

  React.useEffect(() => {

    FirebaseService.getFrameworkData((data: Framework[]) => {
      setCopingMechanisms(data.filter((item) => item.id === "coping-mechanisms")[0]);
      setContextualCharacteristics(data.filter((item) => item.id === "contextual-characteristics")[0]);
      setSocialHumanFactors(data.filter((item) => item.id === "social-human-factors")[0]);
      setBarriersToImproving(data.filter((item) => item.id === "barriers-to-improving")[0]);
      setStrategies(data.filter((item) => item.id === "strategies")[0]);
      setLoading(false);
    });



  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving]);

  const [welcomeModalState, setWelcomeModalState] = React.useState<boolean>(true);
  const [selectSHFState, setSelectSHFState] = React.useState<boolean>(false);
  const [selectCCState, setSelectCCState] = React.useState<boolean>(false);


  const WelcomeModal = ({next}:ModalsProps) => {

    return (<Modal.Root state={welcomeModalState} id="1" title="teste" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          aaa
        </Typography>
        <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
          aaa
        </Typography>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={next} />
    </Modal.Root>);
  }

  const SelectSHFModal = ({next}:ModalsProps) => {

    return (<Modal.Root state={selectSHFState} id="1" title="tesbbbte" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          bbb
        </Typography>
        <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
          bbbb
        </Typography>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={next} />
    </Modal.Root>);
  }

  const SelectCCModal = () => {

    return (<Modal.Root state={selectCCState} id="1" title="testecc" handleClose={() => false}>
      <Modal.Text>
        <Typography sx={{ textAlign: 'justify', marginBottom: '1rem', textIndent: '1rem' }}>
          cc
        </Typography>
        <Typography sx={{ textAlign: 'justify', textIndent: '1rem' }}>
          cc
        </Typography>
      </Modal.Text>
      <Divider />
      <Modal.Actions handleClose={(() => false)} />
    </Modal.Root>);
  }

  const handleNextModal = (setNext: (nextState: boolean) => void, setPrev: (prevState: boolean) => void) => {
    setNext(true);
    setPrev(false);
  }


  return (
    <>
      {!loading && (
        <>
          <WelcomeModal next={() =>handleNextModal(setSelectSHFState, setWelcomeModalState)} prev={()=> false}/>
          <SelectSHFModal next={() =>handleNextModal(setSelectCCState, setSelectSHFState)} prev={()=> false}/>
          <SelectCCModal />
        </>
      )}

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