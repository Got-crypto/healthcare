import { Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '../../../node_modules/@mui/material/index';
// import { useEffect } from 'react';
import { Components } from 'store/Components';
import { useTheme } from '../../../node_modules/@mui/styles/index';
// import MiniDrawer from 'layout/MainLayout/MiniDrawer/index';

const StepComponent = ({ Component }) => <Box>{Component}</Box>;

const DashboardDefault = () => {
  const { unlockedSteps, selectedOrder } = useSelector((state) => state.main);
  const theme = useTheme();
  const mdx = useMediaQuery(theme.breakpoints.down('mdx'));
  const mdxx = useMediaQuery(theme.breakpoints.down('mdxx'));
  const smx = useMediaQuery(theme.breakpoints.down('smx'));
  const smxx = useMediaQuery(theme.breakpoints.down('smxx'));
  const xsl = useMediaQuery(theme.breakpoints.down('xsl'));

  return (
    <Grid sx={{ width: { xl: 1100 }, pb: 25 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        {selectedOrder && <Box>Main Dashboard:: Order {selectedOrder?.orderId} </Box>}
        {!selectedOrder && <Box>Loading orders...</Box>}
      </Grid>

      <Grid item xs={xsl ? 9 : smxx ? 8.5 : smx ? 9 : mdxx ? 8.5 : mdx ? 9 : 9.5} sx={{ flex: 'wrap' }}>
        {unlockedSteps.map((step, index) => {
          const { id } = step;

          return <StepComponent key={`${id}-${index}`} Component={Components[index].component} />;
        })}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
