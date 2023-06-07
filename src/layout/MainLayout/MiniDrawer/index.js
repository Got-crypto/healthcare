import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { Block, HourglassTop, RadioButtonChecked, RadioButtonUnchecked } from '../../../../node_modules/@mui/icons-material/index';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default function MiniDrawer() {
  const open = true;

  const { steps, orderDetails } = useSelector((state) => state.main);

  return (
    <Box component="nav" sx={{ position: 'fixed', flexShrink: { md: 0 }, zIndex: 100 }} aria-label="mailbox folders">
      <Drawer variant="permanent" open={!0} anchor="right">
        <Box sx={{ height: '100px' }} />
        <List>
          {steps.map(({ header, id }, i) => {
            return (
              <ListItem key={`${id}-${i}`} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 1
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {orderDetails && orderDetails[i]?.status && orderDetails[i]?.status.toLowerCase() === 'done' && (
                      <RadioButtonChecked color="success" />
                    )}
                    {orderDetails && orderDetails[i]?.status && orderDetails[i]?.status.toLowerCase() === 'active' && (
                      <RadioButtonUnchecked color="success" />
                    )}
                    {orderDetails && orderDetails[i]?.status && orderDetails[i]?.status.toLowerCase() === 'pending' && (
                      <HourglassTop color="warning" />
                    )}
                    {orderDetails && !orderDetails[i]?.status && <Block color="disabled" />}
                  </ListItemIcon>
                  <ListItemText primary={header} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
