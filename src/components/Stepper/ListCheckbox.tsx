import { InfoRounded } from '@mui/icons-material';
import { Checkbox, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, IconButton, Button, Grid, Typography } from '@mui/material';
import i18next from 'i18next';
import { Modal } from '../Modal';
import React from 'react';
import { useTranslation } from 'react-i18next';


interface ListData {
  listItems: {
    id: string,
    names: {
      [key: string]: string
    },
    selected: boolean,
  }[],
  handleToggle: (id: string) => () => void
}

interface InfoModalContentType {
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  }
}

export default function ListCheckbox(props: ListData) {
  const { t } = useTranslation('common');

  const { listItems, handleToggle } = props;
  const [infoModalState, setInfoModalState] = React.useState(false);
  const [infoModalContent, setInfoModalContent] = React.useState({
    names: {
      en: '',
      pt_br: ''
    },
    descriptions: {
      en: '',
      pt_br: ''
    }
  } as InfoModalContentType);

  const handleInfoClick = (item: any) => {
    setInfoModalContent(item);
    setInfoModalState(true);
  }

  const InfoModal = () => {
    const title = infoModalContent.names[i18next.language];
    const description = infoModalContent.descriptions[i18next.language];

    return (
      <Modal.Root state={infoModalState} id="descriptionModal" title={title} handleClose={() => setInfoModalState(false)}>
        <Modal.Text>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: '1%' }}>
              <Typography>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Modal.Text>
        <Divider />
        <Modal.Actions handleClose={() => setInfoModalState(false)}>
          <Button variant="outlined" onClick={() => setInfoModalState(false)}>{t('close_button')}</Button>
        </Modal.Actions>
      </Modal.Root>
    );
  }

  return (
    <>
      <InfoModal />
      <Container>
        <List dense disablePadding sx={{ width: '60%', margin: 'auto' }}>
          {listItems.map((item) => (
            <Box key={item.id}>
              <ListItem disablePadding disableGutters>
                <ListItemButton role={undefined} sx={{ padding: 0 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.selected}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleToggle(item.id)} 
                      inputProps={{ 'aria-labelledby': item.names[i18next.language] }}
                    />
                  </ListItemIcon>
                  <ListItemText id={item.names[i18next.language]} primary={
                    <>
                      {item.names[i18next.language]}
                      <IconButton edge="end" aria-label="details" onClick={() => handleInfoClick(item)}>
                        <InfoRounded sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                    </>} />

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
