import { Upload, Image, message, Space } from 'antd';
import type { UploadProps, GetProp } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { localStorage } from 'src/utils/storage';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default ({
  value = '',
  onChange,
  ...props
}: {
  value: string;
} & UploadProps): React.ReactNode => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(value);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type.startsWith('image');
    if (!isJpgOrPng) {
      message.error('只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('图片大小不能超过 3MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImageUrl(info.file.response.data);
      onChange?.(info.file.response.data);
    }
  };

  return (
    <Space>
      {imageUrl && (
        <Image src={imageUrl} alt="avatar" style={{ width: '100px', height: '100px' }} />
      )}
      <Upload
        name="file"
        action="http://localhost:3003/user/upload"
        // customRequest={() => {
        //   console.log('customRequest');
        // }}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        disabled={loading}
        {...props}
      >
        {uploadButton}
      </Upload>
    </Space>
  );
};
