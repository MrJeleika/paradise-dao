import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyWithRetry(dynamicImportFn: () => any) {
  return lazy(() =>
    dynamicImportFn().catch(() => {
      window.location.reload();
    }),
  );
}

export const routes = {
  root: '/',
  createSpl: '/create-spl',
} as const;

export const router = createBrowserRouter([
  {
    path: routes.root,
    Component: lazyWithRetry(() => import('@/layouts/default-layout')),
    children: [
      {
        path: routes.root,
        Component: lazyWithRetry(() => import('@/pages/home')),
      },
      {
        path: routes.createSpl,
        Component: lazyWithRetry(() => import('@/pages/spl-token')),
      },
      {
        path: '*',
        Component: lazyWithRetry(() => import('@/pages/home')),
      },
    ],
  },
]);
