import { Button, Col, Flex, Form, Input, Row } from 'antd';
import { useRegisterMutation } from 'src/service/user';
import { LoginLayout } from '../login';

type RegisterForm = {
  username: string;
  password: string;
  confirm_password: string;
  nick_name: string;
  email: string;
  captcha: string;
};

const Register = (): React.ReactNode => {
  const [form] = Form.useForm<RegisterForm>();
  const [register, { isLoading }] = useRegisterMutation();
  const onFinish = (values: RegisterForm) => {
    register(values)
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <LoginLayout>
      <Form form={form} labelCol={{ span: 5 }} style={{ marginTop: '40px' }} onFinish={onFinish}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input size="large" placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="nick_name"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password size="large" placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="确认密码"
          rules={[{ required: true, message: '请输入确认密码' }]}
        >
          <Input.Password size="large" placeholder="确认密码" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input size="large" placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="captcha"
          label="验证码"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Row gutter={8}>
            <Col span={15}>
              <Input type="number" size="large" maxLength={6} />
            </Col>
            <Col span={6}>
              <Button size="large" type="primary">
                发送验证码
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Flex justify="flex-end" align="center">
            <a href="/login">已有账号？去登录</a>
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
            注册
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default Register;
