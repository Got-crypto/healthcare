import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function HealthQuestionare() {
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap' }}>
          <Typography variant="h2" color="textPrimary">
            Health Questionare
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We have a few questions that we will need you to answer in order for us to be able to analyze the results of the tests.
          </Typography>
          <Typography sx={{ mt: 2, color: 'primary.main', ':hover': { textDecoration: 'underline' }, cursor: 'pointer' }}>
            Click here to be directed to the questionnaire
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(HealthQuestionare, 'healthQuestionnaire');
