import { Button, Col, Input, Row } from 'antd';
import { useEffect, useState } from 'react';

export default ({
  value,
  onChange,
  onSend,
  isLoading,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onSend: () => Promise<void>;
  isLoading?: boolean;
}): React.ReactNode => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let timer;
    if (count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <Row gutter={8}>
      <Col span={16}>
        <Input
          type="number"
          size="large"
          maxLength={6}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Col>
      <Col span={8} style={{ textAlign: 'right' }}>
        <Button
          style={{ width: '100%', maxWidth: 120 }}
          size="large"
          type="primary"
          loading={isLoading}
          disabled={count > 0}
          onClick={() => {
            onSend().then(() => {
              setCount(60);
            });
          }}
        >
          {count > 0 ? `${count} 秒` : '发送验证码'}
        </Button>
      </Col>
    </Row>
  );
};
