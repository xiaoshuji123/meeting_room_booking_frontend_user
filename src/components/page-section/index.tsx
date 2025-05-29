import { Card, CardProps } from 'antd';

const PageSection = ({
  title,
  children,
  ...props
}: { title: string; children: React.ReactNode } & CardProps): React.ReactNode => {
  return (
    <Card title={title} {...props}>
      <div>{children}</div>
    </Card>
  );
};

export default PageSection;
