import Navbar from "../components/Navbar";
import { Paper, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import React from 'react';

import FrameworkComponent from "../components/FrameworkComponent";
import { FirebaseService } from "../services/FirebaseService";
import { Framework } from "../types/Framework.type";

export default function FrameworkPage() {

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
    });

  }, [setStrategies, setCopingMechanisms, setContextualCharacteristics, setSocialHumanFactors, setBarriersToImproving]);

  return (
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
  )
}