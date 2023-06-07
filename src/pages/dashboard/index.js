import { Grid } from '@mui/material';

import Instruction from 'components/cards/statistics/ContentWrapper';
import { useSelector } from 'react-redux';
import { Box } from '../../../node_modules/@mui/material/index';
// import { useEffect } from 'react';
import { Components } from 'store/Components';

const StepComponent = ({ Component }) => <Box>{Component}</Box>;

const DashboardDefault = () => {
  const { unlockedSteps, selectedOrder } = useSelector((state) => state.main);

  return (
    <Grid sx={{ width: { xl: 1100 }, pb: 25 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        <Box>Main Dashboard</Box>
      </Grid>

      <Grid item xs={12} sx={{ flex: 'wrap' }}>
        <Instruction title="Welcome! This is your Dashboard" isDashboard={true} order={selectedOrder} />

        {unlockedSteps.map((step, index) => {
          const { id } = step;

          return <StepComponent key={`${id}-${index}`} Component={Components[index].component} />;
        })}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
