import { Box, useMediaQuery } from '@mui/material';

import Orders from './Orders';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
// import OrdersSelect from './OrdersSelect';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Orders />
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
