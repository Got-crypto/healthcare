import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function LifestyleProgram() {
  return (
    <>
      <Grid marginTop={10} item xs={12} sm={6} md={4} lg={3}>
        <Box sx={{ flex: 'wrap', width: { xs: 320, sm: 480, md: 600, lg: 760, xl: 900 } }}>
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

export default SectionWrapper(LifestyleProgram);
