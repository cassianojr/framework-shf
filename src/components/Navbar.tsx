import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Link as MuiLink,
  Container
} from '@mui/material';

import { Link } from 'react-router-dom';
import { Modal } from './Modal';
import { AuthenticationContext, AuthenticationContextType } from '../context/authenticationContext';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    name: 'Home',
    path: '/',
    onClick: () => window.scrollTo(0, 0)
  },
  {
    name: 'Diretrizes',
    path: '/guidelines'
  },
  {
    name: 'Framework',
    path: '/framework'
  },
  {
    name: 'Visualizar feedback',
    path: '/view-feedback'
  }
];

const notLoggedLinks = [
  ...navItems,
  {
    name: 'Login',
    path: '/sign-up',
  },
  {
    name: 'Registre-se',
    path: '/sign-in'
  }
];

const loggedLinks = [
  ...navItems,
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Logout',
    path: '#'
  }
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { signed, signOutFromApp } = React.useContext(AuthenticationContext) as AuthenticationContextType;

  const links = signed ? loggedLinks : notLoggedLinks;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Framework SHF
      </Typography>
      <Divider />
      <List>
        {links.map((item) => (
          <MuiLink component={Link} to={item.path} key={item.name} underline='none' color='inherit'>
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </MuiLink>

        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [frameworkDescriptionModalState, setFrameworkDescriptionmodalState] = React.useState(false);
  const frameworkDescriptionModalContent = {
    id: 'framework-shf-description',
    title: 'Framework SHFiRM-SECO',
    body: 'Sobre a terminologia do framework, SHF é a sigla para social and human factors, RM é a sigla para requirements management, e SECO é a sigla para software Ecosystems. As siglas juntas formam o nome Framework SHFiRM-SECO.'
  };



  const handleSignOut = (itemName:string) => {
    if(itemName !== 'Sign Out') return;
    signOutFromApp();
    handleDrawerToggle();
  }

  return (
    <>
      <Modal.Root state={frameworkDescriptionModalState} handleClose={() => setFrameworkDescriptionmodalState(false)} id={frameworkDescriptionModalContent.id} title={frameworkDescriptionModalContent.title} >
        <Modal.Text content={frameworkDescriptionModalContent.body} />
        <Modal.Actions handleClose={() => setFrameworkDescriptionmodalState(false)} />
      </Modal.Root>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Container fixed>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                onClick={() => setFrameworkDescriptionmodalState(true)}
              >
                Framework SHFiRM-SECO
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {links.map((item) => (
                  <Link to={item.path} key={item.name} onClick={()=>handleSignOut(item.name)}>
                    <Button sx={{ color: '#fff' }}>
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Toolbar>
          </Container >

        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

      </Box >
    </>
  );
}
