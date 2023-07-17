import { Grid } from '@mui/material';

import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Components } from 'store/Components';
import { setAuthUserDetails } from 'store/reducers/main';
import { createUserSession } from 'utils/handleUserStorage';

const StepComponent = ({ Component }) => <Box>{Component}</Box>;

const DashboardDefault = () => {
  const { unlockedSteps, selectedOrder, orderDetails } = useSelector((state) => state.main);
  const lastStep = orderDetails && orderDetails[7];

  const dispatch = useDispatch();
  const theme = useTheme();
  const mdx = useMediaQuery(theme.breakpoints.down('mdx'));
  const mdxx = useMediaQuery(theme.breakpoints.down('mdxx'));
  const smx = useMediaQuery(theme.breakpoints.down('smx'));
  const smxx = useMediaQuery(theme.breakpoints.down('smxx'));
  const xsl = useMediaQuery(theme.breakpoints.down('xsl'));
  const xsll = useMediaQuery(theme.breakpoints.down('xsll'));

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await createUserSession();
        dispatch(setAuthUserDetails(user));
      } catch (error) {
        console.log('error', error);
      }
    };

    getUserDetails();
  }, [dispatch]);

  return (
    <Grid sx={{ width: { xl: 'auto' }, pb: 25 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        {selectedOrder && <Box>Main Dashboard:: Order {selectedOrder} </Box>}
        {!selectedOrder && <Box>Loading orders...</Box>}
      </Grid>

      <Grid item xs={xsll ? 11 : xsl ? 9.5 : smxx ? 8.5 : smx ? 9 : mdxx ? 8.5 : mdx ? 9 : 9.5} sx={{ flex: 'wrap' }}>
        {unlockedSteps.map((step, index) => {
          const { id } = step;

          return <StepComponent key={`${id}-${index}`} Component={Components[index].component} />;
        })}
        <Box sx={{ mt: 30 }}>
          <Divider>
            <Typography variant="caption" sx={{ color: 'secondary.main' }}>
              {lastStep
                ? lastStep.status?.toLowerCase() === 'done'
                  ? `Current order "${selectedOrder}" is finished successfully`
                  : 'Please finish previous step to proceed to next step'
                : 'Loading'}
            </Typography>
          </Divider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
