import { useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

import { BellOutlined, CloseOutlined, MailOutlined } from '@ant-design/icons';

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  const notifications = [
    {
      icon: <MailOutlined />,
      notification: 'Your sample has been delivered',
      time1: '2 min ago',
      time2: '3:00 AM'
    },
    {
      icon: <MailOutlined />,
      notification: 'Your test kits are on the way',
      time1: '5 August',
      time2: '6:00 PM'
    }
  ];

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: '#45d9c9' }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={notifications.length} color="secondary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  sx={{ background: 'linear-gradient(232deg, rgba(247,194,228,1) 12%, rgba(53,192,233,1) 56%)' }}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {notifications.map((notification, i) => (
                      <>
                        <ListItemButton key={i}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                color: 'success.main',
                                bgcolor: 'success.lighter'
                              }}
                            >
                              {notification.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="h6">{notification.notification}</Typography>}
                            secondary={notification.time1}
                          />
                          <ListItemSecondaryAction>
                            <Typography variant="caption" noWrap>
                              {notification.time2}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                      </>
                    ))}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
