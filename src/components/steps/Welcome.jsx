import { Box, Typography } from '@mui/material';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';

const Welcome = () => {
  return (
    <Box
      sx={{
        flex: 'wrap',
        '@media (max-width: 686px)': {
          textAlign: 'justify'
        },
        '@media (max-width: 414px)': {
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 1.57
        },
      }}
    >
      <Typography
        sx={{
          textAlign: 'left',
          fontWeight: 600,
          fontSize: '2.375rem',
          lineHeight: 1.21,
          '@media (max-width: 620px)': {
            fontSize: '1.875rem',
            lineHeight: 1.27
          },
          '@media (max-width: 536px)': {
            fontSize: '1.5rem',
            lineHeight: 1.33
          },
          '@media (max-width: 414px)': {
            fontSize: '1.25rem',
            lineHeight: 1.4
          },
          '@media (max-width: 348px)': {
            fontSize: '1rem',
            lineHeight: 1.5
          }
        }}
        color="textPrimary"
      >
        Welcome! This is your Dashboard
      </Typography>
      Here you will find all the steps on your journey with us. Every time you log on here the{' '}
      <Typography component="span" variant="body1" sx={{ color: `primary.main` }}>
        tests
      </Typography>{' '}
      section on the sidebar will be pointing to the{' '}
      <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
        current step
      </Typography>{' '}
      as well as see what the next step is. You can always scroll up to see previous steps. To come back to the{' '}
      <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
        current step
      </Typography>{' '}
      simply press the current task button on the menu bar on the left.
    </Box>
  );
};

export default SectionWrapper(Welcome, 'welcome');
