import { InfoRounded } from '@mui/icons-material';
import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface ListData {
  items: {
    id: string,
    name: string,
    description: string
  }[],
  handleListItemClick: (id: string, name: string, description: string) => void,
  height?: number
}


function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  const item = data.items[index];
  const handleListItemClick = data.handleListItemClick;
  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton edge="end" aria-label="details" onClick={() => handleListItemClick(item.id, item.name, item.description)}>
          <InfoRounded />
        </IconButton>
      }
      id={item.id}
      key={item.id}
      style={style}
      divider={true}
    >
      <ListItemText primary={
        <Typography sx={{ fontSize: '.8rem' }}>
          <span style={{ fontWeight: 'bold' }}>{item.id}: </span>
          {item.name}
        </Typography>} />
    </ListItem>
  );
}

export default function VirtualizedList(props: ListData) {
  const height = props.height ?? 80;

  return (
    <Box
      sx={{ minWidth: '335px', maxWidth: '100%', height: height, bgcolor: 'background.paper' }}>
      <List
        height={height}
        width='100%'
        itemSize={40}
        itemData={props}
        itemCount={props.items.length}
        overscanCount={5}>
        {renderRow}
      </List>
    </Box>
  )
}