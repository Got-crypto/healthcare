import { Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { Box } from '../../../node_modules/@mui/material/index';
// import { useEffect } from 'react';
import { Components } from 'store/Components';
// import MiniDrawer from 'layout/MainLayout/MiniDrawer/index';

const StepComponent = ({ Component }) => <Box>{Component}</Box>;

const DashboardDefault = () => {
  const { unlockedSteps, selectedOrder } = useSelector((state) => state.main);

  return (
    <Grid sx={{ width: { xl: 1100 }, pb: 25 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        {selectedOrder && <Box>Main Dashboard:: Order {selectedOrder?.orderId} </Box>}
        {!selectedOrder && <Box>Loading orders...</Box>}
      </Grid>

      <Grid item xs={9.5} sx={{ flex: 'wrap' }}>
        {unlockedSteps.map((step, index) => {
          const { id } = step;

          return <StepComponent key={`${id}-${index}`} Component={Components[index].component} />;
        })}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
