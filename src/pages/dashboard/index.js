import { Grid, Typography } from '@mui/material';

import ContentWrapper from 'components/cards/statistics/ContentWrapper';

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Main Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ContentWrapper title="Welcome! This is your Dashboard" isDashboard={true} />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
