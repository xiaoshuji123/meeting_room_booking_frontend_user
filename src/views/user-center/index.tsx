import PageSection from 'src/components/page-section';
import RowInfo from 'src/components/row-info';
import { useGetUserInfoQuery } from 'src/service/user';
import { Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserCenter = (): React.ReactNode => {
  const { data } = useGetUserInfoQuery();

  return (
    <div style={{ margin: '60px auto', width: '1000px' }}>
      <PageSection title="个人中心">
        <RowInfo title="头像">
          <Image
            style={{ width: 80, height: 80 }}
            preview={{
              toolbarRender: () => null,
            }}
            src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
          />
          {/* {data?.userInfo?.headPic ? (
            <Image
              style={{ width: 40, height: 40 }}
              src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
            />
          ) : (
            <UserOutlined />
          )} */}
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
