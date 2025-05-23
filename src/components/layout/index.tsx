import { Card, Layout } from 'antd';
import Header from 'src/components/header';
const { Content } = Layout;

export const LayoutWithHeader = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      <Content>{children}</Content>
    </Layout>
  );
};

export const LoginLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <Layout style={{ height: '100vh' }}>
      <div style={{ margin: '200px auto 0', width: '500px' }}>
        <h1 style={{ textAlign: 'center' }}>会议室预定系统</h1>
        <Card style={{ marginTop: '20px' }} variant="borderless">
          {children}
        </Card>
      </div>
    </Layout>
  );
};

export const FullScreenLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return <div style={{ height: '100%' }}>{children}</div>;
};
