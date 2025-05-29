import { Form, Input, Button, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useUploadFileMutation } from 'src/service/user';
import Upload from 'src/components/upload';
export default (): React.ReactNode => {
  const [form] = useForm();
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  return (
    <Form form={form} labelCol={{ span: 2 }}>
      <Form.Item name="username" label="用户名">
        <Input />
      </Form.Item>
      <Form.Item name="nickName" label="昵称">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Input />
      </Form.Item>
      <Form.Item name="headPic" label="头像">
        <Upload></Upload>
      </Form.Item>
      <Form.Item label={null}>
        <Row justify="end">
          <Button type="default">取消</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            提交
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
