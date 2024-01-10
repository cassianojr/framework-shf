import { Box, IconButton, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface ListData {
  items: {
    id: string,
    name: string,
    description: string
  }[],
  height?: number,
}

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  const item = data.items[index];
  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton edge="end">
          <Rating name={item.id} readOnly value={(Number.isNaN(item.rating)) ? 0 : item.rating} precision={0.5} />
        </IconButton>
      }
      id={item.id}
      key={item.id}
      style={style}
      divider={true}
    >
      <ListItemText primary={
        <Typography sx={{ fontSize: '1rem' }}>
          <span style={{ fontWeight: 'bold' }}>{item.id}: </span>
          {item.name}
        </Typography>} />
    </ListItem>
  );
}

export default function FrameworkRatingsList(props: ListData) {
  const height = props.height ?? 150;

  return (
    <Box
      sx={{ minWidth: '335px', maxWidth: '100%', height: height, bgcolor: 'background.paper' }}>
      <List
        height={height}
        width='100%'
        itemSize={35}
        itemData={props}
        itemCount={props.items.length}
        overscanCount={5}
      >
        {renderRow}
      </List>
    </Box>
  )
}