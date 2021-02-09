import React, { useState } from 'react';
import { Upload, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileInfo, removeProfilePicture } from '../../../../ducks/profile/actions/profile';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageHolder: React.FC<{ reading: boolean }> = (reading) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const user = { "token": localStorage.getItem('user') as string };
    const userr = localStorage.getItem('user');
    const info = useSelector((state: any) => state.profile);
    const dispatch = useDispatch();

    const handleCancel = () => setPreviewVisible(false);

    const updateList = () => {
      let pictures = info.payload.Pictures as string[];
      let newFileList: any[] = [];
      pictures.forEach((picture: any, i:number) => {
        if (picture !== '') {
          const newPic = { uid: i, status: 'done', url: 'http://localhost:3001/' + picture };
          newFileList.push(newPic);
          setFileList(newFileList);
        }
      });
    }

    const getFileLength = () => {
      let pictures = info.payload.Pictures as string[];
      let i = 0;
      pictures.forEach((picture: any) => {
        if (picture !== '')
        i++;
      })
      return i;
    }

    if (info && info.payload && fileList.length !== getFileLength()) updateList();
  
    if (info && fileList.length === 0 && info.payload) updateList();

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
      if (info.file.status === 'done'){
        dispatch(getProfileInfo(userr, null));
      }
    }

    const uploadList = ({
      showPreviewIcon: true,
      showDownloadIcon: false,
      showRemoveIcon: true
    });

    const readingList = ({
      showPreviewIcon: true,
      showDownloadIcon: false,
      showRemoveIcon: false
    });

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

      return (
        info.payload ? (
        <Row>
          <Upload
            data={user}
            accept="image/png,image/jpeg,.png,.jpeg"
            action="http://localhost:3001/api/profile/picture/upload"
            listType="picture-card"
            fileList={fileList}
            showUploadList={ reading ? readingList : uploadList }
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
          >
            {fileList.length <= 5 && !reading.reading ? uploadButton : null}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Row>) : null
      );
    }

export default ImageHolder;