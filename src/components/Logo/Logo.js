import { useEffect, useState } from 'react';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';

import HeaderLogo from '../../assets/images/Logo-header.png';
import LoginLogo from '../../assets/images/Logo.png';

const Logo = () => {
  const [isDashboard, setIsDashboard] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      if (location.pathname === '/login') return setIsDashboard(false);
    };

    handleRouteChange();
  }, [location]);
  return <img src={isDashboard ? HeaderLogo : LoginLogo} alt="logo" width={isDashboard ? '70' : '120'} />;
};

export default Logo;
