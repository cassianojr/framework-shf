import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


interface ListData {
  listItems : {
    id: number,
    name: string,
    description: string,
    selected: boolean,
  }[],
  handleToggle: any
}

export default function ListCheckbox(props: ListData) {
  
  const {listItems, handleToggle } = props;

  return (
    <>
      <Container>

        <List dense sx={{ width: '100%'}}>
          {listItems.map((item) => (
            <ListItem key={item.id}  disablePadding >
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
                <ListItemText id={item.description} primary={item.description} />
              </ListItemButton>
            </ListItem>

          ))}

        </List>

      </Container>
    </>
  )
}
