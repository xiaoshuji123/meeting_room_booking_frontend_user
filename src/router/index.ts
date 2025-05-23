import { lazy } from 'react';
import type { ComponentType } from 'react';
import { LayoutWithHeader, LoginLayout } from 'src/components/layout';
const NotFound = lazy(() => import('src/views/not-found'));
const Login = lazy(() => import('src/views/login'));
const Register = lazy(() => import('src/views/register'));
const ForgetPassword = lazy(() => import('src/views/forget-password'));
const Home = lazy(() => import('src/views/home'));
const UserCenter = lazy(() => import('src/views/user-center'));

export type RouterItem = {
  path: string;
  Component: ComponentType;
  layout?: ComponentType<{ children: React.ReactNode }>;
};

const ROUTERS: RouterItem[] = [
  {
    path: '/login',
    Component: Login,
    layout: LoginLayout,
  },
  {
    path: '/register',
    Component: Register,
    layout: LoginLayout,
  },
  {
    path: '/forget-password',
    Component: ForgetPassword,
    layout: LoginLayout,
  },
  {
    path: '/meeting-room',
    Component: Home,
    layout: LayoutWithHeader,
  },
  {
    path: '/user-center',
    Component: UserCenter,
    layout: LayoutWithHeader,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export default ROUTERS;
