import { Button, Col, Form, Input, Row } from 'antd';
import { useUpdatePasswordMutation } from 'src/service/user';
import { LoginLayout } from '../login';

type ForgetPasswordForm = {
  email: string;
  password: string;
  confirm_password: string;
  captcha: string;
};

const Login = (): React.ReactNode => {
  const [form] = Form.useForm<ForgetPasswordForm>();
  const [forgetPassword, { isLoading }] = useUpdatePasswordMutation();
  const onFinish = (values: ForgetPasswordForm) => {
    forgetPassword({
      email: values.email,
      captcha: values.captcha,
      new_password: values.password,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <LoginLayout>
      <Form form={form} labelCol={{ span: 5 }} style={{ marginTop: '40px' }} onFinish={onFinish}>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input size="large" placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password size="large" placeholder="新密码" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="确认密码"
          rules={[{ required: true, message: '请输入确认密码' }]}
        >
          <Input.Password size="large" placeholder="确认密码" />
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
          <Button
            size="large"
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            修改
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default Login;
