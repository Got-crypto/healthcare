import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function LifestyleProgram() {
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap'}}>
          <Typography variant="h2" color="textPrimary">
            Begin Your Lifestyle Program
          </Typography>
          <Typography sx={{ mt: 2 }}>
            To get the greatest benefits from the personalized protocol follow the suggestions in our lifestyle course. These will provide
            [XYZZ]
          </Typography>
          <Typography sx={{ mt: 2, color: 'primary.main', ':hover': { textDecoration: 'underline' }, cursor: 'pointer' }}>
            Click here to access
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(LifestyleProgram, 'beginLifestyleProgram', !0);
