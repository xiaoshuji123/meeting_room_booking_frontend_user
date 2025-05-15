import { lazy } from 'react';
import type { ComponentType } from 'react';

const Login = lazy(() => import('src/views/login'));
const NotFound = lazy(() => import('src/views/not-found'));

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
    path: '*',
    Component: NotFound,
  },
];

export default ROUTERS;
