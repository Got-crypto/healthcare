import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Box, List, Typography } from '@mui/material';

import NavItem from './NavItem';
import { collapseItem } from '../../../../../store/reducers/main';

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.main);
  const { drawerOpen } = menu;

  const dispatch = useDispatch();

  const navCollapse = item.children?.map((menuItem) => {
    return <NavItem key={menuItem.id} item={menuItem} level={1} />;
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }} onClick={() => dispatch(collapseItem(true))}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
