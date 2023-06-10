import { useState } from 'react';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';
import { HormoneTest, MetabollicTest } from './Planning/index';
import { useSelector } from 'react-redux';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';

function Planning() {
  const { hormorneTestComplete } = useSelector((state) => state.tests);
  const [successMessage, setSuccessMessage] = useState();

  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap' }}>
          <Typography variant="h2" color="textPrimary">
            Planning
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>
              This package contains a battery of tests. Each test has specific timelines and procedures. Here we will guide you through the
              process of planning for each one in the right order and so that they can be delivered while still viable to the laboratories.
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
                <MetabollicTest successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
              </>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(Planning, 'planning', !0);
