import { Box } from '@mui/material';

import logo from '../icon.png';

const AuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <img src={logo} alt="beone" />
    </Box>
  );
};

export default AuthBackground;
