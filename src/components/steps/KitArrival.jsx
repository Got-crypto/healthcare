import { formatDistance } from 'date-fns';
import dayjs from 'dayjs';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleConfirmPackageReceived, handleGetCustomerOrderById } from 'services/BeOne';
import { getUnlockedSteps, setOrderDetails } from 'store/reducers/main';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import { Box, Card, CardContent, FormControlLabel, FormGroup, Grid, Switch, Typography } from '../../../node_modules/@mui/material/index';

function KitArrival() {
  const { orderDetails, selectedOrder } = useSelector((state) => state.main);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const stepTwoData = orderDetails && orderDetails[1];

  const completion = () => {
    let completedAt, completedIn, jsx;
    try {
      completedIn = formatDistance(0, parseInt(stepTwoData?.data?.completedIn));
      completedAt = dayjs(stepTwoData?.data?.completedAt).format('MMMM DD, YYYY');
    } catch {
      console.log('completion time unavailable');
    } finally {
      if (completedAt && completedIn) {
        jsx = `completed in ${completedIn} at ${completedAt}`;
      } else {
        jsx = `completed`;
      }
      console.clear();
    }
    return jsx;
  };

  const getNewOrderDetails = async () => {
    try {
      const response = await handleGetCustomerOrderById(selectedOrder);
      dispatch(setOrderDetails(response?.data));
      dispatch(getUnlockedSteps());
    } catch (error) {
      console.log('error', error);
    }
  };

  const confirmPackageReceived = async () => {
    try {
      setIsLoading(true);
      const response = await handleConfirmPackageReceived(selectedOrder);
      await getNewOrderDetails();
      setSuccessMessage(response?.data?.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error confirming delivery', error);
    }
  };

  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <span id="kit-arrival" />
        <Box sx={{ flex: 'wrap', width: '100%' }}>
          <Typography variant="h2" color="textPrimary">
            Kit Arrival
          </Typography>
          {!stepTwoData?.data?.packageReceiptStatus && (
            <Typography>
              Your test kits are on their way. Please{' '}
              <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                Log in
              </Typography>{' '}
              when they have arrived so together we can plan your testing steps
            </Typography>
          )}
          <>
            {stepTwoData?.status.toLowerCase() === 'active' ? (
              <>
                <Typography sx={{ color: !checked ? 'warning.main' : 'success.main' }}>
                  {checked ? 'Great! Confirm and proceed to planning tests.' : 'The package should be with you now?'}
                </Typography>
                <FormGroup sx={{ width: 'fit-content' }}>
                  <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label={checked ? 'Yes' : 'No'} />
                </FormGroup>
                {!checked && (
                  <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                    The Package Should be with you soon. Please be Patient
                  </Typography>
                )}
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={confirmPackageReceived}
                  disabled={!checked}
                  sx={{ mt: 2, backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' } }}
                  startIcon={<ThumbUp />}
                >
                  Confirm
                </LoadingButton>
                {successMessage && (
                  <Typography variant="body1" sx={{ color: 'success.main' }}>
                    {successMessage}
                  </Typography>
                )}
              </>
            ) : stepTwoData?.status.toLowerCase() === 'done' || successMessage ? (
              <>
                <Typography sx={{ color: 'success.main' }}>Packages delivered!</Typography>
                <Box sx={{ width: '100%' }}>
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {stepTwoData?.data?.awbNumber}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {stepTwoData?.data?.awbStatus}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>Package Recepient Status: {stepTwoData?.data?.packageReceiptStatus}</Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Package Recepient Status Date: {dayjs(stepTwoData?.data?.packageReceiptStatusDate).format('MMMM DD, YYYY')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {completion()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </>
            ) : null}
          </>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(KitArrival, 'kitarrival', !1);
