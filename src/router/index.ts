import { lazy } from 'react';
import type { ComponentType } from 'react';

const NotFound = lazy(() => import('src/views/not-found'));
const Login = lazy(() => import('src/views/login'));
const Register = lazy(() => import('src/views/register'));
const ForgetPassword = lazy(() => import('src/views/forget-password'));

export type RouterItem = {
  path: string;
  Component: ComponentType;
  children?: RouterItem[];
};

const ROUTERS: RouterItem[] = [
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/forget-password',
    Component: ForgetPassword,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export default ROUTERS;
