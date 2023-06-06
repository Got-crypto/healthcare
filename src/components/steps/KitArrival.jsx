import { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, Typography } from '../../../node_modules/@mui/material/index';
import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { useDispatch, useSelector } from 'react-redux';
import { handleConfirmPackageReceived, handleGetCustomerOrderById } from 'services/BeOne';
import { setOrderDetails } from 'store/reducers/main';

function KitArrival({ step, nextStep }) {
  const { orderDetails, selectedOrder } = useSelector((state) => state.main);
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
        const response = await handleGetCustomerOrderById(selectedOrder?.orderId);
        dispatch(setOrderDetails(response?.data));
      } catch (error) {
        console.log('error', error);
      }
    };
    if (selectedOrder) {
      getNewOrderDetails();
    }
  }, [selectedOrder, dispatch]);

  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12}>
          <span id="kit-arrival" />
          <Box sx={{ flex: 'wrap', height: '20vh' }}>
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
              {stepTwoData?.status.toLowerCase() === 'pending' ? (
                <>
                  <Typography sx={{ color: !checked ? 'warning.main' : 'success.main' }}>
                    {checked ? 'Great! Confirm and proceed to planning tests.' : 'The package should be with you now?'}
                  </Typography>
                  <FormGroup sx={{ width: 'fit-content' }}>
                    <FormControlLabel
                      control={<Switch checked={checked} onChange={handleChange} defaultChecked={!1} />}
                      label={checked ? 'Yes' : 'No'}
                    />
                  </FormGroup>
                  {!checked && (
                    <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                      The Package Should be with you soon. Please be Patient
                    </Typography>
                  )}
                  <Button variant="contained" onClick={confirmPackageReceived} disabled={!checked} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
                    Confirm
                  </Button>
                </>
              ) : stepTwoData?.status.toLowerCase() === 'done' ? (
                <>
                  <Typography sx={{ color: 'success.main' }}>Packages delivered!</Typography>
                  <Button variant="contained" sx={{mt: 2}} onClick={nextStep} startIcon={<ThumbUp />}>
                    Proceed to Planning
                  </Button>
                </>
              ) : null}
            </>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default KitArrival;
