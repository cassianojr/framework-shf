import * as React from 'react';
import { Grid, Card, CardHeader, CardContent, List, ListItem, ListItemButton, Box, Divider, ListItemIcon, Tooltip } from '@mui/material';
import { InfoRounded, HelpRounded } from '@mui/icons-material';
import DialogComponent from './DialogComponent';
import SnackBarComponent from './SnackBarComponent';
import AlertDialog from './AlertDialog';

interface SelectedItem {
  id: number,
  name: string,
  selected: boolean,
  description?: string,
}

interface SelectedItems {
  selectedItems: {
    step: string,
    selectedItemsInStep: SelectedItem[]
  }[]
}

export default function StrategieComponent(props: SelectedItems) {
  const { selectedItems } = props;

  enum DialogType {
    STRATEGY = 'STRATEGY',
    COPING_MECHANISM = 'COPING_MECHANISM',
  }

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({} as SelectedItem);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState(DialogType.STRATEGY);

  const openDialog = (selectedItem: SelectedItem, dialogType: DialogType) => {
    setDialogType(dialogType);
    setDialogOpen(true);
    setDialogData(selectedItem);
  }

  const handleDialogSuccess = () => {
    setDialogOpen(false);
    setSnackBarOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);

    if(dialogType === DialogType.COPING_MECHANISM) {
      setSnackBarOpen(true);
      return;
    }

    setTimeout(() => {
      setAlertDialogOpen(true);
    }, 150);

  };

  const openCopingMechanism = () => {
    setAlertDialogOpen(false);

    const data = {
      id: 9,
      name: 'Dar/se o exemplo',
      selected: false,
      description: "Os líderes da equipe ou da empresa devem documentar os conhecimentos obtidos em cada projeto e compartilhá-los com os demais profissionais da aquipe. Assim, os demais profissionais seguirão o exemplo."
    };

    setTimeout(() => {
      openDialog(data, DialogType.COPING_MECHANISM);
    }, 150);
  }

  const handleAlertClose = () => {
    setAlertDialogOpen(false);
    setSnackBarOpen(true);
  };


  return (
    <>
      <DialogComponent open={dialogOpen} type={dialogType} setOpen={setDialogOpen} dialogData={dialogData} handleSuccess={handleDialogSuccess} handleClose={handleDialogClose} />
      <AlertDialog open={alertDialogOpen} setOpen={setAlertDialogOpen} handleSuccess={openCopingMechanism} handleClose={handleAlertClose} />
      <SnackBarComponent open={snackBarOpen} setOpen={setSnackBarOpen} />

      <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
          <Card elevation={5}>
            <CardHeader
              title={<h3>Fatores sociais e humanos selecionados</h3>}
              avatar={
                <InfoRounded color={'action'} />
              }

            />
            <CardContent>
              <List disablePadding>
                {selectedItems[1].selectedItemsInStep.map((item) => (
                  <ListItem dense disablePadding key={item.id}>
                    <ListItemButton>
                      {item.name}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card sx={{ marginTop: 2 }} elevation={5}>
            <CardHeader
              title={<h3>Barreiras selecionadas</h3>}
              avatar={
                <InfoRounded color={'action'} />
              }
            />
            <CardContent>
              <List disablePadding>
                {selectedItems[2].selectedItemsInStep.map((item) => (
                  <ListItem dense disablePadding key={item.id}>
                    <ListItemButton>
                      {item.name}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={12} md={6} >
          <Card elevation={5}>
            <CardHeader
              title={<h3>Estratégias para realizar melhorias</h3>}
              avatar={
                <InfoRounded color={'action'} />
              }

            />
            <CardContent>
              <List disablePadding>
                {selectedItems[3].selectedItemsInStep.map((item) => (
                  <Box key={item.id}>
                    <ListItem dense disablePadding>
                      <ListItemButton onClick={() => openDialog(item, DialogType.STRATEGY)}>
                        <Tooltip title="Descrição da estratégia" placement="top">
                          <ListItemIcon sx={{ padding: 0 }}>
                            <HelpRounded color={'info'} />
                          </ListItemIcon>
                        </Tooltip>
                        {item.name}
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>

  )
}
