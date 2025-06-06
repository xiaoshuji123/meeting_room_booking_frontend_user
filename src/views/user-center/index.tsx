import { useNavigate } from 'react-router-dom';
import { Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PageSection from 'src/components/page-section';
import RowInfo from 'src/components/row-info';
import { useGetUserInfoQuery } from 'src/service/user';

const UserCenter = (): React.ReactNode => {
  const { data } = useGetUserInfoQuery();
  const navigate = useNavigate();

  return (
    <div style={{ margin: '60px auto', width: '1000px' }}>
      <PageSection
        title="个人中心"
        extra={
          <Button variant="text" color="primary" onClick={() => navigate('/user-center/edit')}>
            编辑
          </Button>
        }
      >
        <RowInfo title="头像">
          {data?.userInfo?.headPic ? (
            <Image style={{ width: 80, height: 80 }} src={data?.userInfo?.headPic} />
          ) : (
            <UserOutlined />
          )}
        </RowInfo>
        <RowInfo title="昵称">{data?.userInfo?.nickName}</RowInfo>
        <RowInfo title="用户名">{data?.userInfo?.username}</RowInfo>
        <RowInfo title="邮箱">{data?.userInfo?.email}</RowInfo>
        <RowInfo title="手机号">{data?.userInfo?.phone || '--'}</RowInfo>
      </PageSection>
    </div>
  );
};

export default UserCenter;
