import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';
import { Box, SwipeableDrawer, useMediaQuery } from '@mui/material';

import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from 'config';

// const useStyles = makeStyles(() => ({
//   customDrawer: {
//     background: 'linear-gradient(to right, #f2f2f2, #e6e6e6)'
//   }
// }));
const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('xl'));

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <SwipeableDrawer
          container={container}
          variant="temporary"
          open={open}
          onOpen={() => {}}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
            },
            background: 'linear-gradient(90deg, rgba(247,194,228,1) 12%, rgba(53,192,233,.3) 56%)'
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </SwipeableDrawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default MainDrawer;
