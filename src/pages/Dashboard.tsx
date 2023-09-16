import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../components/Dashboard/Chart';
import Deposits from '../components/Dashboard/Deposits';
import Orders from '../components/Dashboard/Orders';
import Footer from '../components/Footer';
import DashboardAppbar from '../components/Dashboard/DashboardAppbar';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';
import React from "react";


export default function Dashboard() {
  const navigate = useNavigate();
  const [appLoading, setAppLoading] = React.useState(true);

  const { signed, signOutFromApp, getUser, loading } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const user = getUser();

  React.useEffect(() => {
    
    if (!loading && !signed) navigate('/sign-in');
    if (!loading && signed) setAppLoading(false);

  }, [signed, navigate, loading]);


  return (
    !appLoading&&<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardAppbar displayName={user.displayName} handleSignOut={signOutFromApp} />
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}