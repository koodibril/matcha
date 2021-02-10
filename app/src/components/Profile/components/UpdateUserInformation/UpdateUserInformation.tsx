import React, { useState } from 'react';

import { Row, Form, Button, Input, Alert, Select, InputNumber } from 'antd';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { updateProfileInfo } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';


const UpdateUserInformation: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

  const { t } = useTranslation('profile');
  const message= useSelector((state: any) => state.message);

  const info = useSelector((state: any) => state.profile);

  if (info && info.payload && info.payload.Interests && selectedTags.length === 0  && !tagsLoaded) {
    setSelectedTags(info.payload.Interests);
    setTagsLoaded(true);
  }
  
  if (message && message.message !== '' && visible === false) setVisible(true);

  const handleUpdate = (usr: UserData) => {
    setLoading(true);
    usr.interests = selectedTags;
    dispatch(updateProfileInfo(usr, user));
    setLoading(false);
  };

  const handleClose = () => {
    setVisible(false);
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  const handleChange = (tag: any, checked: any) => {
    if (selectedTags.length <= 5 || checked === false) {
      const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
      setSelectedTags(nexSelectedTags);
    }
  };

  const errorMessage = (
    <Alert 
      style={{ margin: '16px 0' }} 
      message={ message.message } 
      type="error" 
      closable 
      afterClose={handleClose}/>
  );

  const checkTags = () => {
    if (selectedTags.length < 3)
      return Promise.reject('You must select at least 3 tags');
    else
      return Promise.resolve();
  }

  return (
    <Row>
      { info.payload ? (
      <Form
        initialValues= {{
          age: info.payload.Age,
          gender: info.payload.Gender,
          sexo: info.payload.Sexo,
          bio: info.payload.Bio
        }}
        style={{ margin: '16px 0' }}
        name="update"
        onFinish={handleUpdate}
        onFinishFailed={console.error}>
        
        { visible ? errorMessage : null }

        <Form.Item>{info.payload.Username}</Form.Item>
        
        <Form.Item
          label={t('age')}
          name="age"
          rules={[{
            required: true,
            message: t('age_missing')
          }]}>
          <InputNumber min={18} max={80}/>
        </Form.Item>

        <Form.Item
          label={t('gender')}
          name="gender"
          rules={[{
            required: true,
            message: t('gender_missing')
          }]}>
          <Select defaultValue="Unknow">
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Male">Male</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t('sexual orientation')}
          name="sexo"
          rules={[{
            required: true,
            message: t('sexual_orientation_missing')
          }]}>
            <Select defaultValue="Unknow">
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Both">Both</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
          label={t('bio')}
          name="bio"
          rules={[{
            required: true,
            message: t('bio_missing')
          }]}>
          <Input.TextArea maxLength={500}/>
        </Form.Item>
        
        <Form.Item
          label={t('interests')}
          name="interests"
          rules={[{
            validator: checkTags
          }]}>
            {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading} >
            <Button type="primary" htmlType="submit">
              {t('update information')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>) : visible ? errorMessage : null }
    </Row>
  )
}

export default UpdateUserInformation;