import { Box, Typography } from '@mui/material';

const ContentWrapper = ({ color }) => (
  <Box sx={{ width: '650px', flex: 'wrap' }}>
    <Typography variant="h1" fontWeightBold color="textPrimary">
      Welcome! This is your Dashboard
    </Typography>
    <Typography>Here you will find all the steps on your journey with us.</Typography>
    Every time you log on here you will find an arrow pointing to the{' '}
    <Typography component="span" variant="body1" sx={{ color: `${color || 'primary'}.main` }}>
      current step
    </Typography>{' '}
    as well as see what the next step is. Double click anywhere on the{' '}
    <Typography component="span" variant="body1" sx={{ color: `${color || 'primary'}.main` }}>
      current step
    </Typography>{' '}
    to move on to the next step. You can always scroll up to see previous steps. To come back to the{' '}
    <Typography component="span" variant="body1" sx={{ color: `${color || 'primary'}.main` }}>
      current step
    </Typography>{' '}
    simply press th current task button on the menu bar on th left
  </Box>
);

export default ContentWrapper;
