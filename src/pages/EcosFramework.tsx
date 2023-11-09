import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import React from "react";

import FrameworkComponent from '../components/FrameworkComponent';
import { Answers } from '../types/Answer.type';
import { QuestionService } from '../services/QuestionService';
import EcosystemService from '../services/EcosystemService';
import Title from '../components/Dashboard/Title';
import { Divider } from '@mui/material';


export default function EcosFramework() {
    const navigate = useNavigate();
    const [appLoading, setAppLoading] = React.useState(true);

    const [answers, setAnswers] = React.useState({} as Answers);
    const [ecosName, setEcosName] = React.useState('');

    const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;
    const answerId = useParams().answerId ?? '';


    const user = getUser();

    React.useEffect(() => {

        if (loading) return;
        if (!signed) navigate('/sign-in');

        const fetchData = async () => {
            const answersData = await QuestionService.getAnswers(answerId);
            setAnswers(answersData);

            const ecosData = await EcosystemService.getEcosystem(answersData.ecossystem_id);
            setEcosName(ecosData.organization_name);

        }

        fetchData();

        if (signed) setAppLoading(false);

    }, [signed, navigate, loading, user.uid, answerId, setAnswers, setEcosName]);

    console.log(answers);
    

    return (
        !appLoading &&
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardAppbar displayName={user.displayName} handleSignOut={signOutFromApp} photoURL={user.photoURL} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '79vh' }}>
                        <Grid container spacing={3}>
                            <Grid item sm={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Title>{ecosName}</Title>
                                    <Divider />
                                    <FrameworkComponent showSuggestions={false} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
}