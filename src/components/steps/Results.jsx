import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function Results() {
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap'}}>
          <Typography variant="h2" color="textPrimary">
            Results and Personalized Control
          </Typography>
          Results
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(Results, 'resultsAndPersonalizedProtocol', !1);
