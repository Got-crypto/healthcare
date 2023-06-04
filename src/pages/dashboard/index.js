import { Grid, Typography } from '@mui/material';

import Instruction from 'components/cards/statistics/ContentWrapper';
import { Button } from '../../../node_modules/@mui/material/index';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { collapseItem, setActiveStep, setOrderDetails } from 'store/reducers/main';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCustomerOrderById } from 'services/BeOne';

const StepComponent = ({ Component, step, order, nextStep, prevStep }) => (
  <Component order={order} prevStep={prevStep} nextStep={nextStep} step={step} />
);

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const { activeStep, steps, selectedOrder } = useSelector((state) => state.main);

  const initSteps = async () => {
    dispatch(collapseItem(true));

    dispatch(setActiveStep(activeStep + 1));

    try {
      const response = await handleGetCustomerOrderById(selectedOrder?.orderId);
      dispatch(setOrderDetails(response?.data));
    } catch (error) {
      console.log('error fetching order details', error);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };
  return (
    <Grid sx={{ width: { xl: 1100 } }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        <Typography variant="h5">Main Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sx={{ flex: 'wrap' }}>
        <Instruction title="Welcome! This is your Dashboard" isDashboard={true} order={selectedOrder} />
        <Button variant="contained" disabled={selectedOrder ? false : true} onClick={initSteps} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
          Start
        </Button>

        {steps.map((step, index) => {
          const { component } = step;

          return (
            <StepComponent order={selectedOrder} prevStep={prevStep} nextStep={initSteps} step={step} Component={component} key={index} />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
