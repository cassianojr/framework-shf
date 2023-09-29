import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import RouteIcon from '@mui/icons-material/Route';
import MapIcon from '@mui/icons-material/Map';
import { Link } from '@mui/material';

const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    path: '/'
  },
  {
    name: 'Guidelines',
    icon: <RouteIcon />,
    path: '/guidelines'
  },
  {
    name: 'Full Framework',
    icon: <MapIcon />,
    path: '/framework'
  },
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  

]

export const mainListItems = (
  <React.Fragment>
    {menuItems.map((item, index) => (
      <ListItemButton key={index} LinkComponent={Link} href={item.path}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    ))}
  </React.Fragment>
);