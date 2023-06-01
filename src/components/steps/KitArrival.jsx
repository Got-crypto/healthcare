import { useState } from 'react';
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, Typography } from '../../../node_modules/@mui/material/index';
import { ThumbUp, Undo } from '../../../node_modules/@mui/icons-material/index';

function KitArrival({ step, nextStep, prevStep }) {
  const user = null;

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ flex: 'wrap', width: { xs: 320, sm: 480, md: 600, lg: 760, xl: 900 } }}>
            <Typography variant="h2" fontWeightBold color="textPrimary">
              Kit Arrival
            </Typography>
            {user ? (
              <Typography>
                Your test kits are on thier way. Please{' '}
                <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  Log in
                </Typography>{' '}
                when they have arrived so together we can plan your testing steps
              </Typography>
            ) : (
              <>
                <Typography>The package should be with you now</Typography>
                <FormGroup sx={{ width: 'fit-content' }}>
                  <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} defaultUnChecked />}
                    label={checked ? 'Yes' : 'No'}
                  />
                </FormGroup>
                <Button variant="contained" onClick={nextStep} disabled={!checked} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
                  Next
                </Button>
                <Button variant="outlined" onClick={prevStep} color="error" sx={{ mt: 2, ml: 2 }} startIcon={<Undo />}>
                  back
                </Button>
              </>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
}

export default KitArrival;
