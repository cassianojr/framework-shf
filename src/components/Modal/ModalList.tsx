import { InfoRounded } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";

interface ModalProps {
  items: {
    id: string,
    name: string,
    description: string
  }[]
  handleItemClick: (id: string, name: string, description: string) => void
}

export function ModalList({ items, handleItemClick }: ModalProps) {
  return (
    <List dense >
      {items.map((item) => (
        <ListItem dense
          secondaryAction={
            <IconButton edge="end" aria-label="details" onClick={() => handleItemClick(item.id, item.name, item.description)}>
              <InfoRounded />
            </IconButton>
          }
          id={item.id}
          key={item.id}
          divider={true}
        >
          <ListItemText primary={
            <Typography sx={{ fontSize: '.9rem' }}>
              <span style={{ fontWeight: 'bold' }}>{item.id}: </span>
              {item.name}
            </Typography>} />
        </ListItem>
      ))}
    </List>
  )
}

