import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Box, Container, Toolbar, Typography } from '@mui/material';

function Guidelines() {

  const typographyStyle = {
    textAlign: 'justify',
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container sx={{ minHeight: '70vh' }}>
        <section id="about">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Diretrizes para Utilização
            </Typography>
            <Typography sx={typographyStyle}>
              <i style={{fontWeight:'bold'}}>Pergunte (Ask):</i> A primeira etapa é identificar os problemas. O primeiro passo para avaliar os FSH que influenciam a gerência de requisitos em ECOS é conhecer os fatores do dia a dia dos profissionais que atuam nas atividades da gerência de requisitos. Com isso, pergunte aos profissionais da equipe quais fatores eles já enfrentaram, apresente a lista de barreiras e entenda se eles já encontraram algumas delas em suas atividades da gerência de requisitos em ECOS. É fundamental que esta etapa seja feita individualmente, podendo também utilizar formulários on-line se preferir.
            </Typography>
            <Typography sx={typographyStyle}>
              <i style={{fontWeight:'bold'}}>Planeje (Plan):</i> As estratégias de melhoria devem ocorrer no nível individual da equipe e organizacional, dependendo dos fatores e barreiras identificados. Após coletar feedback, as respostas devem ser avaliadas para determinar quais barrerias e fatores requerem a priorização para melhoria. Deve-se planejar estratégias de melhoria e alocar recursos financeiros para retificação, se necessário.
              </Typography>
            <Typography sx={typographyStyle}>
              <i style={{fontWeight:'bold'}}>Execute (Act):</i> Pequenas melhorias contínuas e iterativas são fundamentais. Implemente gradualmente as estratégias de melhoria e avalie se elas efetivamente abordam as barreiras e os fatores. Acompanhar o sucesso das estratégias é fundamental para superar as barreiras e melhorar os FSH. Depos que as melhorias planejadas forem implementadas, repita esse processo de três etapas iterativamente para sustentar o progresso e abordar os seguintes fatores e barreiras, mantendo assim um processo de melhoria contínua.
              </Typography>

          </Box>
        </section>
      </Container>
      <Footer />
    </>
  )
}

export default Guidelines