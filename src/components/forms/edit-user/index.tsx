import { Form, Input, Button, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

import Captcha from 'src/components/captcha';
import Upload from 'src/components/upload';
import { useLazyUpdateUserInfoCaptchaQuery, useUpdateUserInfoMutation } from 'src/service/user';
import { UserInfo } from 'src/service/user/type';
type EditUserForm = {
  username: string;
  nickName: string;
  email: string;
  phone: string;
  captcha: string;
  headPic: string;
};

export default ({ info }: { info?: UserInfo }): React.ReactNode => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [updateUserInfoCaptcha, { isLoading }] = useLazyUpdateUserInfoCaptchaQuery();
  const [updateUserInfo, { isLoading: isUpdateUserInfoLoading }] = useUpdateUserInfoMutation();

  const onSend = async () => {
    try {
      const { email } = await form.validateFields(['email']);
      return updateUserInfoCaptcha({ email })
        .unwrap()
        .then(() => {
          message.success('验证码发送成功');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values: EditUserForm) => {
    updateUserInfo({
      email: values.email,
      captcha: values.captcha,
      nick_name: values.nickName,
      phone: values.phone,
      avatar: values.headPic,
    })
      .unwrap()
      .then(() => {
        message.success('修改成功');
        setTimeout(() => {
          navigate('/user-center');
        }, 1000);
      });
  };

  return (
    <Form form={form} labelCol={{ span: 2 }} onFinish={onFinish}>
      <Form.Item name="nickName" label="昵称" initialValue={info?.nickName}>
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item name="username" label="用户名" initialValue={info?.username}>
        <Input disabled placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" initialValue={info?.email}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="phone" label="手机号" initialValue={info?.phone}>
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="captcha"
        label="验证码"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Captcha onSend={onSend} isLoading={isLoading} />
      </Form.Item>
      <Form.Item name="headPic" label="头像" initialValue={info?.headPic}>
        <Upload
          value={info?.headPic || ''}
          onChange={(value) => {
            form.setFieldsValue({
              headPic: value,
            });
          }}
        ></Upload>
      </Form.Item>
      <Form.Item label={null}>
        <Row justify="end">
          <Button type="default" onClick={() => navigate('/user-center')}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdateUserInfoLoading}
            style={{ marginLeft: 10 }}
          >
            提交
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
