import { RouterProvider, Routes, Route, Navigate, createBrowserRouter } from 'react-router-dom';
import ROUTERS, { type RouterItem } from './router';
import { Suspense } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { FullScreenLayout } from 'src/components/layout';
const WithSubRoute = ({ route }: { route: RouterItem }) => {
  const Layout = route.layout || FullScreenLayout;
  return (
    <Layout>
      <Suspense
        fallback={
          <Spin
            size="large"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        }
      >
        <route.Component />
      </Suspense>
    </Layout>
  );
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {ROUTERS.map((route) => (
        <Route key={route.path} path={route.path} element={<WithSubRoute route={route} />} />
      ))}
    </Routes>
  );
};

// 当用户访问任何路径时，外层的 path: '*' 都会匹配到，并将请求转发给 Router 组件
// 然后 Router 组件内部的路由系统会再次进行具体的匹配
const router = createBrowserRouter([{ path: '*', element: <Router /> }], {
  basename: '/',
});

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Layout: {
            bodyBg: '#f5f7fa',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
