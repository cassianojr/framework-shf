import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import RouteIcon from '@mui/icons-material/Route';
import MapIcon from '@mui/icons-material/Map';
import { Link } from '@mui/material';
import { useTranslation } from "react-i18next";


export default function MainMenuItems() {
  const { t } = useTranslation('app_drawer');
  const menuItems = [
    {
      name: 'Home',
      icon: <HomeIcon />,
      path: '/'
    },
    {
      name: t('guidelinesItem'),
      icon: <RouteIcon />,
      path: '/guidelines'
    },
    {
      name: t('fullFrameworkItem'),
      icon: <MapIcon />,
      path: '/framework'
    },
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
  ]

  return (<React.Fragment>
    {menuItems.map((item, index) => (
      <ListItemButton key={index} LinkComponent={Link} href={item.path}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    ))}
  </React.Fragment>);
}
// export const mainListItems = (

//   <React.Fragment>
//     {menuItems.map((item, index) => (
//       <ListItemButton key={index} LinkComponent={Link} href={item.path}>
//         <ListItemIcon>
//           {item.icon}
//         </ListItemIcon>
//         <ListItemText primary={item.name} />
//       </ListItemButton>
//     ))}
//   </React.Fragment>
// );