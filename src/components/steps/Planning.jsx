import { useState } from 'react';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';
import { HormoneTest, MetabollicTest } from './Planning/index';

function Planning({ step }) {
  const [isClicked, setIsClicked] = useState(false);

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
              to start Planning your testing steps
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
                  </>
                </Box>
                <Box sx={{ mt: 2, width: 'full' }}>
                  <>
                    <MetabollicTest />
                  </>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Planning;
