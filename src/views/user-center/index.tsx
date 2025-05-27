import PageSection from 'src/components/page-section';
import RowInfo from 'src/components/row-info';

const UserCenter = (): React.ReactNode => {
  return (
    <div style={{ margin: '60px auto', width: '1000px' }}>
      <PageSection title="个人中心">
        <RowInfo title="基本信息">123123</RowInfo>
        <RowInfo title="基本信息">123123</RowInfo>
      </PageSection>
    </div>
  );
};

export default UserCenter;
