import { Button, Flex, Form, Input, message } from 'antd';
import { useLazyRegisterCaptchaQuery, useRegisterMutation } from 'src/service/user';
import { LoginLayout } from '../login';
import Captcha from 'src/components/captcha';
import { useNavigate } from 'react-router-dom';
type RegisterForm = {
  username: string;
  password: string;
  confirm_password: string;
  nick_name: string;
  email: string;
  captcha: string;
};

const Register = (): React.ReactNode => {
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterForm>();
  const [register, { isLoading }] = useRegisterMutation();
  const [getRegisterCaptcha, { isLoading: isRegisterCaptchaLoading }] =
    useLazyRegisterCaptchaQuery();
  const onFinish = (values: RegisterForm) => {
    register(values)
      .unwrap()
      .then(() => {
        message.success('注册成功');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      });
  };
  const onSend = async () => {
    try {
      const { email } = await form.validateFields(['email']);
      return getRegisterCaptcha({ email })
        .unwrap()
        .then(() => {
          message.success('验证码发送成功');
        });
    } catch (error) {
      console.log(error);
      return Promise.reject('验证码发送失败');
    }
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
          <Input size="large" placeholder="昵称" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password size="large" placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          label="确认密码"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: '请输入确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="确认密码" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input size="large" placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="captcha"
          label="验证码"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Captcha onSend={onSend} isLoading={isRegisterCaptchaLoading} />
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
