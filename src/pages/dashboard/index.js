import { Grid, Typography } from '@mui/material';

import Instruction from 'components/cards/statistics/ContentWrapper';
import { Button } from '../../../node_modules/@mui/material/index';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { collapseItem, setActiveStep } from 'store/reducers/menu';
import { useDispatch, useSelector } from 'react-redux';

const StepComponent = ({ Component, step, nextStep, prevStep }) => <Component prevStep={prevStep} nextStep={nextStep} step={step} />;

const DashboardDefault = () => {
  const dispatch = useDispatch();
  const { activeStep, steps } = useSelector((state) => state.menu);

  const initSteps = () => {
    dispatch(collapseItem(true));

    dispatch(setActiveStep(activeStep + 1));
  };

  const prevStep = () => {
    if (activeStep > 0) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Main Dashboard</Typography>
      </Grid>

      <Grid item xs={12}>
        <Instruction title="Welcome! This is your Dashboard" isDashboard={true} />
        <Button variant="contained" onClick={initSteps} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
          Start
        </Button>

        {steps.map((step, index) => {
          const { component } = step;

          return <StepComponent prevStep={prevStep} nextStep={initSteps} step={step} Component={component} key={index} />;
        })}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
