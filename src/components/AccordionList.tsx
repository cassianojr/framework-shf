import { InfoRounded } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import React from 'react'


interface ListData {
  items: {
    id: string,
    name: string,
    description: string
  }[],
  handleButtonClick: (name: string, description:string) => void
}
export default function AccordionList(props: ListData) {

  const { items, handleButtonClick } = props;
  return (
    <List>
      {items.map((item) => (
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="details" onClick={()=>handleButtonClick(item.name, item.description)}>
              <InfoRounded />
            </IconButton>
          }
          id={item.id}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  )
}