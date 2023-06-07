import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

const authUser = localStorage.getItem('authUser');

const LoginRoutes = {
  path: '/',
  element: !authUser ? <MinimalLayout /> : <Navigate to="/" replace />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
