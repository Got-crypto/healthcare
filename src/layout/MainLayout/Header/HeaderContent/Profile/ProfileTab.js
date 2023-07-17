import PropTypes from 'prop-types';
import { useState } from 'react';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const navigate = useNavigate();

  const handleNavigation = (event) => {
    handleListItemClick(event, 1);
    navigate('/profile');
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 1} onClick={handleNavigation}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
