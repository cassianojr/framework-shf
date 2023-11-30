import { InfoRounded } from "@mui/icons-material";
import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import i18next from "i18next";
import { QuestionListItems } from "../../types/Question.type";
import React from 'react';
import { Framework } from "../../types/Framework.type";

interface ModalProps {
  items: Framework,
  handleItemClick: (ids: string, name: string, description: string) => void,
  
  showVotes?: boolean
}

interface ItemType{
  id: string,
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  },
  selected: boolean,
  votes?: number
}


export function ModalListSelect({ items, handleItemClick, showVotes }: ModalProps) {

  const [listItems, setListItems] = React.useState([] as ItemType[]);

  React.useEffect(() => {
    const newItems = items.items.map((item) => {
      return {
        id: item.id,
        names: item.names,
        descriptions: item.descriptions,
        selected: false,
        suggestion: false
      } as QuestionListItems;
    });
    setListItems(newItems);
  }, [setListItems, items])
  

  const handleToggle = (id: string) => {
    
    const newListItems = listItems.map((listItem) => {
      
      if (listItem.id === id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setListItems(newListItems);
  }

  return (
    <>
      <List dense>
        {listItems.map((item) => (
          <ListItem dense
            secondaryAction={
              <>
                {showVotes && item.votes}
                <IconButton edge="end" aria-label="details" onClick={() => handleItemClick(item.id, item.names[i18next.language], item.descriptions[i18next.language])}>
                  <InfoRounded />
                </IconButton>
              </>
            }
            id={item.id}
            key={item.id}
            divider={true}
          >
            <ListItemButton role={undefined} sx={{ padding: 0 }}  onClick={()=>handleToggle(item.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.selected}
                  tabIndex={-1}
                  disableRipple
                  onClick={()=>handleToggle(item.id)}
                  inputProps={{ 'aria-labelledby': item.names[i18next.language] }}
                />
              </ListItemIcon>
              <ListItemText primary={
                <Typography sx={{ fontSize: '.9rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{item.id}: </span>
                  {item.names[i18next.language]}
                </Typography>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}

