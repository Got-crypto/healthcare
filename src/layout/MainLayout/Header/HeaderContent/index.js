import { Box, useMediaQuery } from '@mui/material';

import Orders from './Orders';
import Profile from './Profile';
import MobileSection from './MobileSection';
// import OrdersSelect from './OrdersSelect';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Orders />
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
