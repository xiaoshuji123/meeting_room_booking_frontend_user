import { Row, Col, Space, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.module.less';
import { useNavigate } from 'react-router-dom';
const Header = (): React.ReactNode => {
  const navigate = useNavigate();
  const menus = [
    {
      key: 'center',
      label: '个人中心',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ];
  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'center':
        navigate('/center');
        break;
      case 'logout':
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
        break;
    }
  };
  return (
    <Row
      justify="space-between"
      gutter={20}
      align="middle"
      style={{ height: 60, margin: 0, padding: '0 20px', backgroundColor: '#ffffff' }}
    >
      <Col span={8}>
        <h1>会议室预定系统</h1>
      </Col>
      <Col span={8} style={{ textAlign: 'right' }}>
        <Space>
          <span>xingming</span>
          <Dropdown
            overlayClassName="header-dropdown"
            menu={{
              items: menus,
              onClick: (e) => handleMenuClick(e.key),
            }}
            overlayStyle={{ padding: '10px 0' }}
          >
            <UserOutlined style={{ fontSize: 22 }} />
          </Dropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
