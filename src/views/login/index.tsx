import { Button, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from 'src/service/user';
import { localStorage } from 'src/utils/storage';

type LoginForm = {
  username: string;
  password: string;
};

const Login = (): React.ReactNode => {
  const [form] = Form.useForm<LoginForm>();
  const [login, { isLoading }] = useLoginMutation();
  const onFinish = (values: LoginForm) => {
    login(values)
      .unwrap()
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      });
  };
  return (
    <Form form={form} labelCol={{ span: 4 }} style={{ marginTop: '20px' }} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password size="large" prefix={<LockOutlined />} placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <a href="/register" style={{ color: '#1890ff' }}>
            创建账号
          </a>
          <a href="/forget-password" style={{ color: '#1890ff' }}>
            忘记密码
          </a>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
