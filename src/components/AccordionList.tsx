import { InfoRounded } from '@mui/icons-material';
import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface ListData {
  items: {
    id: string,
    name: string,
    description: string
  }[],
  handleButtonClick: (name: string, description: string) => void
}


function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  const item = data.items[index];
  const handleButtonClick = data.handleButtonClick;
  return (

    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="details" onClick={() => handleButtonClick(item.name, item.description)}>
          <InfoRounded />
        </IconButton>
      }
      id={item.id}
      key={item.id}
      style={style}
      divider={true}
    >
      <ListItemText primary={
        <Typography>
          <span style={{fontWeight:'bold'}}>{item.id}: </span>
          {item.name}
        </Typography>} />
      {/* <ListItemText primary={`${item.id}: ${item.name}`} /> */}
    </ListItem>
  );
}

export default function AccordionList(props: ListData) {


  return (
    <Box
      sx={{ minWidth: '335px', maxWidth: '100%', height: 150, bgcolor: 'background.paper' }}>
      <List
        height={150}
        width='100%'
        itemSize={50}
        itemData={props}
        itemCount={props.items.length}
        overscanCount={5}>
        {renderRow}
      </List>
    </Box>
  )
}