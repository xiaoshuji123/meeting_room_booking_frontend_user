import { Col, Row } from 'antd';
import './index.module.less';
const RowInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <Row styleName="row-info">
      <Col flex="200px">{title}</Col>
      <Col styleName="row-info-content">{children}</Col>
    </Row>
  );
};

export default RowInfo;
