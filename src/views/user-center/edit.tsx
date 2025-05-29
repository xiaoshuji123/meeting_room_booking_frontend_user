import PageSection from 'src/components/page-section';
import EditUserForm from 'src/components/forms/edit-user';
import { useGetUserInfoQuery } from 'src/service/user';
const UserCenterEdit = (): React.ReactNode => {
  const { data } = useGetUserInfoQuery();

  return (
    <div style={{ margin: '60px auto', width: '1000px' }}>
      <PageSection title="编辑用户">
        <div style={{ width: '80%', margin: '0 auto' }}>
          <EditUserForm info={data?.userInfo} />
        </div>
      </PageSection>
    </div>
  );
};

export default UserCenterEdit;
