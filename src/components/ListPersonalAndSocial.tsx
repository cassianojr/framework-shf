import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import React from 'react'
import VirtualizedList from './VirtualizedList'
import {useTranslation} from "react-i18next";

interface Items {
  id: string,
  name: string,
  description: string,
  ids: {
    [key: string]: string
  },
  names:{
    [key: string]: string
  },
  descriptions:{
    [key: string]: string
  }
}
interface ListPersonalAndSocialProps {
  personalGroupItems: Items[],
  socialGroupItems: Items[],
  handleListItemClick?: (id: string, name: string, description: string) => void
}


export default function ListPersonalAndSocial(props: ListPersonalAndSocialProps) {

  const {t} = useTranslation('framework');

  const { personalGroupItems, socialGroupItems, handleListItemClick } = props

  const [socialGroupOpen, setSocialGroupOpen] = React.useState(true);
  const handleSocialGroupClick = () => {
    setSocialGroupOpen(!socialGroupOpen);
  };

  const [personalGroupOpen, setPersonalGroupOpen] = React.useState(true);
  const handlePersonalGroupClick = () => {
    setPersonalGroupOpen(!personalGroupOpen);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const handleListClick = handleListItemClick ?? ((id: string, name: string, description: string) => { });
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }} >

      <ListItemButton onClick={handleSocialGroupClick} divider={true} sx={{ height: '1.5rem' }}>
        <ListItemIcon>
          <GroupIcon  sx={{fontSize: '1.2rem'}}  />
        </ListItemIcon>
        <ListItemText primary={t('social_group_label')} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '.8rem' }} />
        {socialGroupOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={socialGroupOpen} timeout="auto" unmountOnExit>
        <VirtualizedList items={socialGroupItems} handleListItemClick={handleListClick} height={25} />
      </Collapse>

      <ListItemButton onClick={handlePersonalGroupClick} divider={true} sx={{ height: '1.5rem' }}>
        <ListItemIcon>
          <PersonIcon  sx={{fontSize: '1.2rem'}}  />
        </ListItemIcon>
        <ListItemText primary={t('personal_group_label')} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '.8rem' }} />
        {personalGroupOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={personalGroupOpen} timeout="auto" unmountOnExit>
        <VirtualizedList items={personalGroupItems} handleListItemClick={handleListClick} height={25} />
      </Collapse>
    </List>
  )
}
