import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { Box, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '../../../node_modules/@mui/material/index';
import Questions from './Testing/Questions';

function TestingInstructions() {
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap', width: '100%' }}>
          <Typography variant="h2" color="textPrimary">
            Testing Instructions
          </Typography>
          <Typography sx={{ mt: 2 }}>
            The kits you received come with fully comprehensive instructions. For practicality we are providing a digital version of them
            here.
          </Typography>
          <Typography sx={{ mt: 2 }}>And in addition we have made video companions to the instructions.</Typography>
          <Typography sx={{ mt: 2, color: 'warning.main' }}>
            Read the instructions and watch the videos at least a few days before starting the preparation to ensure that everything is
            clear
          </Typography>
          <List>
            <ListItem disablePadding sx={{ gap: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <ListItemButton component="a" href="#">
                <ListItemText sx={{ mx: 'auto' }} primary="Hormone Test video instructions" />
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
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(TestingInstructions, 'testingInstructions', !1);
