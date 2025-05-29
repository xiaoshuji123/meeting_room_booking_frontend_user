import { Row, Col, Space, Dropdown, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.module.less';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery } from 'src/service/user';
const Header = (): React.ReactNode => {
  const navigate = useNavigate();
  const { data } = useGetUserInfoQuery();
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
        navigate('/user-center');
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
        <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/meeting-room')}>
          会议室预定系统
        </h1>
      </Col>
      <Col span={8} style={{ textAlign: 'right' }}>
        <Space>
          <span>{data?.userInfo?.nickName}</span>
          <Dropdown
            overlayClassName="header-dropdown"
            menu={{
              items: menus,
              onClick: (e) => handleMenuClick(e.key),
            }}
            overlayStyle={{ padding: '10px 0' }}
          >
            {data?.userInfo?.headPic ? (
              <Image
                style={{ width: 38, height: 38, borderRadius: 19 }}
                preview={false}
                src={data?.userInfo?.headPic || ''}
              />
            ) : (
              <UserOutlined style={{ fontSize: 22 }} />
            )}
          </Dropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
