import { Container, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from 'react-router-dom'

interface HeroData {
  title: string;
  description: string;
  image: string;
  button: string;
  buttonLink: string;
}


export default function Hero(props: HeroData) {
  const { title, description, image, button, buttonLink } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
      }}

      square
    >
      <Container>
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={image} alt={title} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />

        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph >
                {description}
              </Typography>
              <Button
                component={Link}
                to={buttonLink}
                variant="contained"
                sx={{ mt: 3, mr: 2 }}
              >
                {button}
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Container>

    </Paper>


  );
}