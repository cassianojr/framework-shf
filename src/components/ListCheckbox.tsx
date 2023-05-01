import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface ListData {
  title: string,
  listItems : {
    id: number,
    name: string,
    description: string,
    selected: boolean,
  }[]
}

export default function ListCheckbox(props: ListData) {
  
  const { title, listItems } = props;

  const [items, setItems] = React.useState(listItems);

  const handleToggle = (id: number) => () =>{
    const newListItems = items.map((listItem) => {
      if (listItem.id === id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setItems(newListItems);
  }

  return (
    <>
      <Container>
        <Typography variant='h5'>{title}</Typography >

        <List dense sx={{ width: '100%', bgcolor: 'background-paper' }}>
          {items.map((item) => (
            <ListItem key={item.id} secondaryAction={item.description} disablePadding >
              <ListItemButton role={undefined} onClick={handleToggle(item.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.selected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': item.name }}
                  />
                </ListItemIcon>
                <ListItemText id={item.name} primary={item.name} />
              </ListItemButton>
            </ListItem>

          ))}

        </List>

      </Container>
    </>
  )
}
