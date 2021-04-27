import React, { useState } from 'react';

import { Row, Form, Button, Input, Select, InputNumber } from 'antd';
import { Spin } from 'antd';

import { useTranslation } from 'react-i18next';

import { useProfile, useProfileActions } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import MapHolderComponent from '../MapHolder/MapHolder';


const UpdateUserInformation: React.FC = () => {
  const [location, setLocation] = useState({city: 'Unknow', latitude: 0, longitude: 0});
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const user = localStorage.getItem('user');

  const info = useProfile();
  const { updateProfileInfo } = useProfileActions(); 
  const { t } = useTranslation('profile');

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];



  if (info && info.payload && info.payload.Interests && selectedTags.length === 0  && !tagsLoaded) {
    setSelectedTags(info.payload.Interests);
    setLocation({city: info.payload.Location, latitude: info.payload.Latitude, longitude: info.payload.Longitude});
    setTagsLoaded(true);
  }

  const handleUpdate = (usr: UserData) => {
    setLoading(true);
    usr.interests = selectedTags;
    updateProfileInfo(usr, user, location);
    setLoading(false);
  };

  const handleChange = (tag: any, checked: any) => {
    if (selectedTags.length <= 5 || checked === false) {
      const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
      setSelectedTags(nexSelectedTags);
    }
  };

  const checkTags = () => {
    if (selectedTags.length < 3)
      return Promise.reject('You must select at least 3 tags');
    else
      return Promise.resolve();
  }

  const checkLocation = () => {
    if (location.city === 'Unknow')
      return Promise.reject('You must set your location');
    else
      return Promise.resolve();
  }

  const handleLocation = () => {
    fetch('https://geolocation-db.com/json/').then(res => res.json().then(res => {
      setLocation(res);
    }));
  }

  return (
    <Row>
      { info.payload ? (
      <Form
        style={{margin: "10px", maxWidth: "100%"}}
        fields={[{
          name: ['age'],
          value: info.payload.Age
        },
        {
          name: ['gender'],
          value: info.payload.Gender
        },
        {
          name: ['sexo'],
          value: info.payload.Sexo
        },
        {
          name: ['bio'],
          value: info.payload.Bio
        }
        ]}
        name="update"
        onFinish={handleUpdate}>

        <Form.Item>{info.payload.Username}</Form.Item>
        
        <Form.Item
          label={t('age')}
          rules={[{
            required: true,
            message: t('age_missing')
          }]}>
          <Form.Item name="age">
            <InputNumber min={18} max={80}/>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label={t('gender')}
          rules={[{
            required: true,
            message: t('gender_missing')
          }]}>
          <Form.Item name="gender">
            <Select>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label={t('sexual orientation')}
          rules={[{
            required: true,
            message: t('sexual_orientation_missing')
          }]}>
            <Form.Item name="sexo">
              <Select>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Both">Bi</Select.Option>
              </Select>
            </Form.Item>
        </Form.Item>

        <Form.Item
          label={t('bio')}
          rules={[{
            required: true,
            message: t('bio_missing')
          }]}>
            <Form.Item name="bio">
              <Input.TextArea maxLength={500}/>
            </Form.Item>
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

        <Form.Item
          label={t('location')}
          rules={[{
            validator: checkLocation
          }]}>
            <Form.Item name="location">
              <Input disabled value={location.city}></Input>
            </Form.Item>
            <MapHolderComponent location={location.city} latitude={location.latitude} longitude={location.longitude}></MapHolderComponent>
            <Button onClick={handleLocation}>{t('update location')}</Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading} >
            <Button type="primary" htmlType="submit">
              {t('update information')}
            </Button>
          </Spin>
        </Form.Item>
      </Form>) : null }
    </Row>
  )
}

export default UpdateUserInformation;