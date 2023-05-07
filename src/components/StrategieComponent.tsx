import { Grid, Card, CardHeader, CardContent, List, ListItem, ListItemButton, Box, Divider, ListItemIcon, Tooltip } from '@mui/material';
import { InfoRounded, HelpRounded } from '@mui/icons-material';

interface SelectedItems {
  selectedItems: {
    step: string,
    selectedItemsInStep: {
      id: number,
      name: string,
      selected: boolean,
      description?: string,
    }[]
  }[]
}

export default function StrategieComponent(props: SelectedItems) {
  const { selectedItems } = props;

  return (
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
                    <ListItemButton >
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
  )
}
