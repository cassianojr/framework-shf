import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';


interface ListData {
  listItems: {
    id: number,
    name: string,
    selected: boolean,
  }[],
  handleToggle: (id: number) => () => void
}

export default function ListCheckbox(props: ListData) {

  const { listItems, handleToggle } = props;

  return (
    <>
      <Container>

        <List dense sx={{ width: '60%', margin: 'auto' }}>
          {listItems.map((item) => (
            <>
              <ListItem key={item.id} disablePadding >
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
              <Divider />
            </>

          ))}

        </List>

      </Container>
    </>
  )
}
