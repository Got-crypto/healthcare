import { useEffect, useState } from 'react';
import { Box, FormControlLabel, FormGroup, Grid, Switch, Typography } from '../../../node_modules/@mui/material/index';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { useDispatch, useSelector } from 'react-redux';
import { handleConfirmPackageReceived, handleGetCustomerOrderById } from 'services/BeOne';
import { setOrderDetails } from 'store/reducers/main';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';

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

  const confirmPackageReceived = async () => {
    try {
      await handleConfirmPackageReceived(selectedOrder?.orderId);
    } catch (error) {
      console.log('error confirming delivery', error);
    }
  };

  useEffect(() => {
    const getNewOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await handleGetCustomerOrderById(selectedOrder?.orderId);
        dispatch(setOrderDetails(response?.data));
        setSuccessMessage(response?.data?.message);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log('error', error);
      }
    };
    if (selectedOrder) {
      getNewOrderDetails();
    }
  }, [selectedOrder, dispatch]);

  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <span id="kit-arrival" />
        <Box sx={{ flex: 'wrap' }}>
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
                {successMessage && <Typography>{successMessage}</Typography>}
              </>
            ) : stepTwoData?.status.toLowerCase() === 'done' || successMessage ? (
              <>
                <Typography sx={{ color: 'success.main' }}>Packages delivered!</Typography>
              </>
            ) : null}
          </>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(KitArrival);
