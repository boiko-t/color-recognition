import React, { useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function ImageUploader(props) {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const uploadButton = (
    <div>
      {loadingStatus ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingStatus(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoadingStatus(false);
        props.onImageUploaded(imageUrl);
      });
    }
  };

  return (
    <div className="color-detecter">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        method="get"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
}

export default ImageUploader;
