import { ThumbUp } from '../../../node_modules/@mui/icons-material/index';
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '../../../node_modules/@mui/material/index';
import Questions from './Testing/Questions';

function TestingInstructions({ step, nextStep }) {
  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12}>
          <Box sx={{ flex: 'wrap' }}>
            <Typography variant="h2" color="textPrimary">
              Testing Instructions
            </Typography>
            <Typography sx={{ mt: 2 }}>
              The kits you received come with fully comprehensive instructions. For practicality we are providing a digital version of them{' '}
              <Typography component="span" sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' }, color: 'primary.main' }}>
                HERE
              </Typography>
            </Typography>
            <Typography sx={{ mt: 2 }}>And in addition we have made video companions to the instructions.</Typography>
            <Typography sx={{ mt: 2, color: 'warning.main' }}>
              Read the instructions and watch the videos at least a few days before starting the preparation to ensure that everything is
              clear
            </Typography>
            <List fullWidth>
              <ListItem fullWidth disablePadding sx={{ gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ListItemButton component="a" href="#" fullWidth>
                  <ListItemText sx={{mx: 'auto'}} primary="Hormone Test video instructions" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#">
                  <ListItemText primary="Metabolic Test video instructions" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#">
                  <ListItemText primary="Thyroid Test video instructions" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#">
                  <ListItemText primary="Immune Test video instructions" />
                </ListItemButton>
              </ListItem>
            </List>
            <Questions />
            <Button variant="contained" onClick={nextStep} sx={{ mt: 2 }} startIcon={<ThumbUp />}>
              Next
            </Button>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default TestingInstructions;
