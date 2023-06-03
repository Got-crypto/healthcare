import { useRoutes } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes]);
}
