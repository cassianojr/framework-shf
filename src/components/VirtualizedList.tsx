import { InfoRounded } from '@mui/icons-material';
import { Box, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import i18next from 'i18next';
import { FrameworkItem } from '../types/Framework.type';
import { useTranslation } from 'react-i18next';

interface ListData {
  items: FrameworkItem[],
  handleListItemClick: (id: string, name: string, description: string) => void,
  height?: number
  showVotes?: boolean
}


function RenderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  const item = data.items[index];
  const handleListItemClick = data.handleListItemClick;

  const ratioAnswers = ['strongly_disagree', 'disagree', 'neither', 'agree', 'strongly_agree'];
  
  const { t } = useTranslation('ecos_survey');

  return (
    <ListItem
      dense
      secondaryAction={
        <>
          {data.showVotes && item.votes}
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
          <Typography sx={{ fontSize: '.8rem' }}>{(item.ratio !== undefined) ? t(`survey_options.${ratioAnswers[item.ratio-1]}`) : ''}</Typography>
      </>
    </ListItem>
  );
}

export default function VirtualizedList(props: ListData) {
  const height = props.height ?? 80;

  console.log(props.items[0].ratio);
  
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
        {RenderRow}
      </List>
    </Box>
  )
}