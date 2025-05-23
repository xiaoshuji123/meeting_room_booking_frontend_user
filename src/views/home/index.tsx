import { Layout } from 'antd';
import Header from 'src/components/header';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const Home = (): React.ReactNode => {
  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Home;
