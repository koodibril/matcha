import React, { useState } from 'react';

import { Row, Form, Button, Input, Select, InputNumber } from 'antd';

import { useTranslation } from 'react-i18next';

import { useProfileActions } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import MapHolderComponent from '../MapHolder/MapHolder';


const UpdateUserInformation: React.FC<{info: any}> = (props) => {
  const [location, setLocation] = useState({city: 'Unknow', latitude: 0, longitude: 0});
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const user = localStorage.getItem('user');

  const { updateProfileInfo } = useProfileActions(); 
  const { t } = useTranslation('profile');

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

  if (props.info && props.info && props.info.Interests && selectedTags.length === 0  && !tagsLoaded) {
    setSelectedTags(props.info.Interests);
    setLocation({city: props.info.Location, latitude: props.info.Latitude, longitude: props.info.Longitude});
    setTagsLoaded(true);
  }

  const handleUpdate = (usr: UserData) => {
    usr.interests = selectedTags;
    console.log(location);
    //updateProfileInfo(usr, user, location);
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
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({city: "Unknow", latitude: position.coords.latitude, longitude: position.coords.longitude});
    }, (error) => {
      fetch('https://geolocation-db.com/json/').then(res => res.json().then(res => {
        setLocation(res);
      }));
    });
  }

  return (
    <Row>
      { props.info ? (
      <Form
        style={{margin: "10px", maxWidth: "100%"}}
        initialValues={{
          age: props.info.Age,
          gender: props.info.Gender,
          sexo: props.info.Sexo,
          bio: props.info.Bio,
          location: props.info.Location,
        }}
        onFinish={handleUpdate}>

        <Form.Item>{props.info.Username}</Form.Item>
        
        <Form.Item label={t('age')}>
          <Form.Item 
            name="age" 
            rules={[{
            required: true,
            message: t('age_missing')
          }]}>
            <InputNumber min={18} max={80}/>
          </Form.Item>
        </Form.Item>

        <Form.Item label={t('gender')}>
          <Form.Item
            name="gender"
            rules={[{
              required: true,
              message: t('gender_missing')
            }]}>
            <Select>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label={t('sexual orientation')}>
            <Form.Item
              name="sexo"
              rules={[{
                required: true,
                message: t('sexual_orientation_missing')
              }]}>
              <Select>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Both">Bi</Select.Option>
              </Select>
            </Form.Item>
        </Form.Item>

        <Form.Item label={t('bio')}>
            <Form.Item
              name="bio"
              rules={[{
                required: true,
                message: t('bio_missing')
              }]}>
              <Input.TextArea maxLength={500}/>
            </Form.Item>
        </Form.Item>
        
        <Form.Item label={t('interests')}>
          <Form.Item
            name="interests"
            rules={[{
              required: true,
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
        </Form.Item>

        <Form.Item label={t('city')}>
            <Form.Item
              name="location"
              rules={[{
                required: true,
                validator: checkLocation
              }]}>
              <Input></Input>
            </Form.Item>
            <MapHolderComponent location={location.city} latitude={location.latitude} longitude={location.longitude}></MapHolderComponent>
            <Button onClick={handleLocation}>{t('update location')}</Button>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('update information')}
            </Button>
        </Form.Item>
      </Form>) : null }
    </Row>
  )
}

export default UpdateUserInformation;