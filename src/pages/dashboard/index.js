import { Grid, Typography } from '@mui/material';

import Instruction from 'components/cards/statistics/ContentWrapper';
import { Button } from '../../../node_modules/@mui/material/index';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { collapseItem, setActiveStep } from 'store/reducers/main';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';

const StepComponent = ({ Component, step, order, nextStep, prevStep }) => (
  <Component order={order} prevStep={prevStep} nextStep={nextStep} step={step} />
);

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const { activeStep, unlockedSteps, selectedOrder, orderDetails } = useSelector((state) => state.main);
  const currentStep = orderDetails && orderDetails[activeStep + 1];

  const initSteps = () => {
    dispatch(collapseItem(true));
    if (currentStep?.status.toLowerCase() === 'done') {
      dispatch(setActiveStep(activeStep + 1));
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  // useEffect(() => {
  // }, [dispatch, selectedOrder, orderDetails]);
  return (
    <Grid sx={{ width: { xl: 1100 }, pb: 25 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25, flex: 'wrap' }}>
        <Typography variant="h5">Main Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sx={{ flex: 'wrap' }}>
        <Instruction title="Welcome! This is your Dashboard" isDashboard={true} order={selectedOrder} />
        <Button variant="contained" disabled={selectedOrder ? false : true} onClick={initSteps} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
          Start
        </Button>

        {unlockedSteps.map((step, index) => {
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
