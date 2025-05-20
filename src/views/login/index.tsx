import { Button, Flex, Form, Input, Layout } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from 'src/service/user';

type LoginForm = {
  username: string;
  password: string;
};

export const LoginLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <Layout>
      <div style={{ margin: '200px auto 0', width: '400px' }}>
        <h1 style={{ textAlign: 'center' }}>会议室预定系统</h1>
        {children}
      </div>
    </Layout>
  );
};

const Login = (): React.ReactNode => {
  const [form] = Form.useForm<LoginForm>();
  const [login, { isLoading }] = useLoginMutation();
  const onFinish = (values: LoginForm) => {
    login(values)
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <LoginLayout>
      <Form form={form} labelCol={{ span: 4 }} style={{ marginTop: '40px' }} onFinish={onFinish}>
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
    </LoginLayout>
  );
};

export default Login;
