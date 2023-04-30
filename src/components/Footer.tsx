import { Box, Container, Typography } from "@mui/material";

export default function Footer() {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Copyringt &copy; {new Date().getFullYear()} - Framework SHF
        </Typography>
      </Container>
    </Box>
  );
}