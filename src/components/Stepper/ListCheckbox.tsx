import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import i18next from 'i18next';


interface ListData {
  listItems: {
    id: string,
    names:{
      [key: string]: string
    },
    selected: boolean,
  }[],
  handleToggle: (id: string) => () => void
}

export default function ListCheckbox(props: ListData) {

  const { listItems, handleToggle } = props;

  return (
    <>
      <Container>

        <List dense disablePadding sx={{ width: '60%', margin: 'auto' }}>
          {listItems.map((item) => (
            <Box key={item.id}>
              <ListItem disablePadding disableGutters>
                <ListItemButton role={undefined} onClick={handleToggle(item.id)} sx={{padding: 0}}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.selected}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': item.names[i18next.language] }}
                    />
                  </ListItemIcon>
                  <ListItemText id={item.names[i18next.language]} primary={item.names[i18next.language]} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}

        </List>

      </Container>
    </>
  )
}
