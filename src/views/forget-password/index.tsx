import { Button, Form, Input, message } from 'antd';
import { useLazyUpdatePasswordCaptchaQuery, useUpdatePasswordMutation } from 'src/service/user';
import Captcha from 'src/components/captcha';
import { useNavigate } from 'react-router-dom';
type ForgetPasswordForm = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  captcha: string;
};

const Login = (): React.ReactNode => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ForgetPasswordForm>();
  const [forgetPassword, { isLoading }] = useUpdatePasswordMutation();
  const [getUpdatePasswordCaptcha, { isLoading: isUpdatePasswordCaptchaLoading }] =
    useLazyUpdatePasswordCaptchaQuery();
  const onFinish = (values: ForgetPasswordForm) => {
    forgetPassword({
      username: values.username,
      email: values.email,
      captcha: values.captcha,
      new_password: values.password,
    })
      .unwrap()
      .then(() => {
        message.success('密码修改成功');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      });
  };

  const onSend = async () => {
    try {
      const { email } = await form.validateFields(['email']);
      return getUpdatePasswordCaptcha({ email })
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
    <Form form={form} labelCol={{ span: 5 }} style={{ marginTop: '20px' }} onFinish={onFinish}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input size="large" placeholder="用户名" />
      </Form.Item>
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
      <Form.Item
        name="captcha"
        label="验证码"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Captcha onSend={onSend} isLoading={isUpdatePasswordCaptchaLoading} />
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
  );
};

export default Login;
