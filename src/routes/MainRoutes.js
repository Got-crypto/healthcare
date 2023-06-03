import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Profile = Loadable(lazy(() => import('pages/profile/index')));

const authUser = localStorage.getItem('authUser');

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          path: '/',
          element: authUser !== undefined && authUser ? <DashboardDefault /> : <Navigate to="/login" replace />
        },
        {
          path: '/profile',
          element: authUser !== undefined && authUser ? <Profile /> : <Navigate to="/login" replace />
        }
      ]
    }
  ]
};

export default MainRoutes;
