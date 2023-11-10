import { InfoRounded } from '@mui/icons-material';
import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import i18next from 'i18next';

interface ListData {
  items: {
    id: string,
    name: string,
    description: string,
    ids: {
      [key: string]: string
    },
    names: {
      [key: string]: string
    },
    descriptions: {
      [key: string]: string
    }
  }[],
  handleListItemClick: (id: string, name: string, description: string) => void,
  height?: number
  showVotes?: boolean
}


function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  const item = data.items[index];
  const handleListItemClick = data.handleListItemClick;
  return (
    <ListItem
      dense
      secondaryAction={
        <>
        {data.showVotes &&item.votes}
        <IconButton edge="end" aria-label="details" onClick={() => handleListItemClick(item.ids[i18next.language], item.names[i18next.language], item.descriptions[i18next.language])}>
          <InfoRounded sx={{ fontSize: '1.2rem' }} />
        </IconButton>
        </>
      }
      id={item.ids[i18next.language]}
      key={item.ids[i18next.language]}
      style={style}
      divider={true}
    >
      <>
        <ListItemText primary={
          <Typography sx={{ fontSize: '.8rem' }}>
            <span style={{ fontWeight: 'bold' }}>{item.ids[i18next.language]}: </span>
            {item.names[i18next.language]}
          </Typography>} />
      </>
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
        itemSize={25}
        itemData={props}
        itemCount={props.items.length}
        overscanCount={5}>
        {renderRow}
      </List>
    </Box>
  )
}