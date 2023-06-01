import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';

function ImmuneTestPicture({step}) {
  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ flex: 'wrap', width: { xs: 320, sm: 480, md: 600, lg: 760, xl: 900 } }}>
            <Typography variant="h2" fontWeightBold color="textPrimary">
              Immune Test Picture
            </Typography>
            <Typography>Here you will find all the steps on your journey with us.</Typography>
            Every time you log on here you will find an arrow pointing to the{' '}
            <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
              current step
            </Typography>{' '}
            as well as see what the next step is. Double click anywhere on the{' '}
            <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
              current step
            </Typography>{' '}
            to move on to the next step. You can always scroll up to see previous steps. To come back to the{' '}
            <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
              current step
            </Typography>{' '}
            simply press the current task button on the menu bar on the left
          </Box>
        </Grid>
      )}
    </>
  );
}

export default ImmuneTestPicture;
