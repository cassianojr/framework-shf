import { Box, Container, Typography } from "@mui/material";

export default function Footer() {

  return (
    <Box component="footer"sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: '#E0E3E7'
    }}>
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" gutterBottom>
          Copyringt &copy; {new Date().getFullYear()} -  Framework SHFiRM-SECO
        </Typography>
      </Container>
    </Box>
  );
}