import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { activeItem } from 'store/reducers/menu';
import { Collapse, List, ListItem } from '../../../../../../node_modules/@mui/material/index';
import { collapseItem } from 'store/reducers/menu';

const StepChildren = ({ step }) => (
  <ListItem button>
    <ListItemText primary={step.header} sx={{ color: step.isActive ? 'primary.main' : 'text.secondary', ml: 2, overflow: 'hidden' }} />
  </ListItem>
);
const Step = ({ step }) => {
  const { itemCollapsed } = useSelector((state) => state.menu);
  return (
    <>
      <ListItem button>
        <ListItemText primary={step.header} sx={{ color: step.isActive ? 'primary.main' : 'text.primary' }} />
      </ListItem>
      {step.collapse && (
        <Collapse in={itemCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {step.children.map((step, i) => (
              <StepChildren step={step} key={`${step}-${i}`} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { drawerOpen, openItem, itemCollapsed, steps } = useSelector((state) => state.menu);

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <>
      {item?.type === 'item' ? (
        <ListItemButton
          {...listItemProps}
          disabled={item.disabled}
          onClick={() => itemHandler(item.id)}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              '&:hover': {
                bgcolor: 'primary.lighter'
              },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                '&:hover': {
                  color: iconSelectedColor,
                  bgcolor: 'primary.lighter'
                }
              }
            }),
            ...(!drawerOpen && {
              '&:hover': {
                bgcolor: 'transparent'
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
              }
            })
          }}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: 'secondary.lighter'
                  }
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: 'primary.lighter',
                    '&:hover': {
                      bgcolor: 'primary.lighter'
                    }
                  })
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                  {item.title}
                </Typography>
              }
            />
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <>
          <ListItemButton
            disabled={item.disabled}
            onClick={() => {
              itemHandler(item.id);
              dispatch(collapseItem(!itemCollapsed));
            }}
            selected={isSelected}
            sx={{
              zIndex: 1201,
              pl: drawerOpen ? `${level * 28}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                '&:hover': {
                  bgcolor: 'primary.lighter'
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.lighter',
                  borderRight: `2px solid ${theme.palette.primary.main}`,
                  color: iconSelectedColor,
                  '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: 'primary.lighter'
                  }
                }
              }),
              ...(!drawerOpen && {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent'
                  },
                  bgcolor: 'transparent'
                }
              })
            }}
          >
            {itemIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isSelected ? iconSelectedColor : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: 'secondary.lighter'
                    }
                  }),
                  ...(!drawerOpen &&
                    isSelected && {
                      bgcolor: 'primary.lighter',
                      '&:hover': {
                        bgcolor: 'primary.lighter'
                      }
                    })
                }}
              >
                {itemIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <>
                <ListItemText
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  primary={
                    <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                      {item.title}
                    </Typography>
                  }
                />
              </>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={item.chip.label}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )}
          </ListItemButton>
          <Collapse in={itemCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {steps.map((step, i) => (
                <Step step={step} key={`${step}-${i}`} />
              ))}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

Step.propTypes = {
  step: PropTypes.object
};

export default NavItem;
