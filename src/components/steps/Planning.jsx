import { useState } from 'react';
import { Box, Button, Grid, Typography } from '../../../node_modules/@mui/material/index';
import { HormoneTest, MetabollicTest } from './Planning/index';
import { useSelector } from 'react-redux';

function Planning({ step, nextStep }) {
  const [isClicked, setIsClicked] = useState(false);
  const { hormorneTestComplete } = useSelector((state) => state.tests);
  const { orderDetails } = useSelector((state) => state.main);
  const [successMessage, setSuccessMessage] = useState();

  const planning = orderDetails && orderDetails[2];

  const handleClick = () => [setIsClicked(true)];

  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12}>
          <Box sx={{ flex: 'wrap' }}>
            <Typography variant="h2" color="textPrimary">
              Planning
            </Typography>
            <Typography>
              Click{' '}
              <Typography component="span" onClick={handleClick} sx={{ color: 'primary.main', cursor: 'pointer' }}>
                here
              </Typography>{' '}
              {planning.status.toLowerCase() === 'done' ? 'to review your planning' : 'to start Planning your testing steps'}
            </Typography>
            {isClicked && (
              <Box sx={{ mt: 2 }}>
                <Typography>
                  This package contains a battery of tests. Each test has specific timelines and procedures. Here we will guide you through
                  the process of planning for each one in the right order and so that they can be delivered while still viable to the
                  laboratories.
                </Typography>

                <Box sx={{ mt: 2, width: 'full' }}>
                  <>
                    <HormoneTest />
                    {hormorneTestComplete && (
                      <Typography variant="body1" sx={{ ml: 1, mt: 1, color: 'success.main' }}>
                        Great now lets plan the next tests
                      </Typography>
                    )}
                  </>
                </Box>
                <Box sx={{ mt: 2, width: 'full' }}>
                  <>
                    <MetabollicTest successMessage={successMessage} setSuccessMessag={setSuccessMessage} />
                  </>
                </Box>
              </Box>
            )}
            <Button sx={{ mt: 2 }} variant="contained" onClick={nextStep}>
              Proceed to Next step
            </Button>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Planning;
