import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
      ]
    }
  ]
};

export default MainRoutes;
