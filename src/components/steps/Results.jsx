import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function Results({step}) {
  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ flex: 'wrap', width: { xs: 320, sm: 480, md: 600, lg: 760, xl: 900 } }}>
            <Typography variant="h2" color="textPrimary">
              Results and Personalized Control
            </Typography>
            Results
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Results;
