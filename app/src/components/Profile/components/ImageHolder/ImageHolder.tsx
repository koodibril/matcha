import React, { useState } from 'react';
import { Upload, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeProfilePicture } from '../../../../ducks/profile/actions/profile';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageHolder: React.FC = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const user = { "token": localStorage.getItem('user') as string };
    const info = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const handleCancel = () => setPreviewVisible(false);

    if (info && fileList.length === 0 && info.payload) {
      let pictures = info.payload.Pictures as string[];
      pictures.forEach((picture: any, i:number) => {
        if (picture !== '') {
          const newPic = { uid: i, status: 'done', url: 'http://localhost:3001/' + picture };
          let newFileList = fileList;
          newFileList.push(newPic);
          setFileList(newFileList);
        }
      });
    }
  
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }

    const onRemove = (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList:any = fileList.slice();
      newFileList.splice(index, 1);
      dispatch(removeProfilePicture(user.token, file));
      setFileList(newFileList)
    }

    const handleChange = (info: any) => {
      let newFileList = info.fileList;
      setFileList(newFileList);
    }

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

      return (
        <Row justify="center" align="middle">
          <Upload
            data={user}
            action="http://localhost:3001/api/auth/picture/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Row>
      );
    }

export default ImageHolder;