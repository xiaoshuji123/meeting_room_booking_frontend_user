import { Card, CardProps } from 'antd';

const PageSection = ({
  title,
  children,
}: { title: string; children: React.ReactNode } & CardProps): React.ReactNode => {
  return (
    <Card title={title}>
      <div>{children}</div>
    </Card>
  );
};

export default PageSection;
