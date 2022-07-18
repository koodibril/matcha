import React, { useState } from 'react';
import { Upload, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProfileActions } from '../../../../ducks/profile/actions/profile';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageHolder: React.FC<{ reading: boolean, pictures: string[] }> = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [reading, setReading] = useState(props.reading);
    const user = { "token": localStorage.getItem('user') as string };
    const userr = localStorage.getItem('user');

    const { getProfileInfo, removeProfilePicture } = useProfileActions();

    const handleCancel = () => setPreviewVisible(false);

    const isUrlValid = (testUrl: string) => {
      let url;
      
      try {
        url = new URL(testUrl);
      } catch (_) {
        return false;  
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    }

    const updateList = (init: boolean) => {
      let pictures: string[];
      pictures = props.pictures;
      let newFileList: any[] = [];
      pictures.forEach((picture: any, i:number) => {
        if (picture !== '') {
          const newPic = { uid: i, status: 'done', url: isUrlValid(picture) ? picture : 'http://localhost:3001/' + picture };
          newFileList.push(newPic);
        }
      });
      setFileList(newFileList);
    }

    const getFileLength = () => {
      let pictures = props.pictures;
      let i = 0;
      pictures.forEach((picture: any) => {
        if (picture !== '')
        i++;
      })
      if (i === 1 && reading === false)
        setReading(true);
      return i;
    }

    if (props.pictures && fileList.length !== getFileLength()) updateList(true);

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
      removeProfilePicture(user.token, file);
      setFileList(newFileList)
    }

    const handleChange = (info: any) => {
      setTimeout(() => {
        getProfileInfo(userr, null);
      }, 2000);
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
        props.pictures ? (
        <Row>
          <Upload
            data={user}
            accept="image/png, image/jpeg, .png, .jpeg"
            action="http://localhost:3001/api/profile/picture/upload"
            listType="picture-card"
            fileList={fileList}
            showUploadList={ reading ? readingList : uploadList }
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
            style={{height: 100}}
          >
            {fileList.length <= 5 && !props.reading ? uploadButton : null}
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