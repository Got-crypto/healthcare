import { Grid, Typography } from '@mui/material';

import ContentWrapper from 'components/cards/statistics/ContentWrapper';

const Tests = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Main Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ContentWrapper title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
    </Grid>
  );
};

export default Tests;
