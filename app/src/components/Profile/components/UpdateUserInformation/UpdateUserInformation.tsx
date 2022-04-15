import React, { useState } from 'react';

import { Row, Form, Button, Input, Select, InputNumber } from 'antd';

import { useTranslation } from 'react-i18next';

import { useProfileActions } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import MapHolderComponent from '../MapHolder/MapHolder';

interface Infos {
  Age: number;
  Bio: string;
  Distance: string;
  Email: string
  Gender: string;
  Interests: string;
  Latitude: number;
  Location: string;
  Longitude: number;
  Name: string;
  Online: boolean;
  Pictures: string[];
  Sexo: boolean;
  Surname: string;
  Username: string;
  Valid: boolean;
}

const UpdateUserInformation: React.FC<Partial<Infos>> = ({ info: { Interests, Location, Latitude, Longitude } }) => {
  const [location, setLocation] = useState({Location: 'Unknow', Latitude: 0, Longitude: 0});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const { updateProfileInfo } = useProfileActions(); 
  const { t } = useTranslation('profile');

  const user = localStorage.getItem('user');

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

  if (Interests && selectedTags.length === 0  && !tagsLoaded) {
    setSelectedTags(Interests);
    setLocation({  Location,  Latitude,  Longitude });
    setTagsLoaded(true);
  }

  const handleUpdate = ({ interests }: UserData) => {
    usr.interests = selectedTags;
    updateProfileInfo(usr, user, location);
  };

  const handleChange = (tag: string, checked: any) => {
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
      { info ? (
      <Form
        style={{margin: "10px", maxWidth: "100%"}}
        fields={[ info.Age ? {
          name: ['age'],
          value: info.Age
        } : { name: ['age']},
        info.Gender ? {
          name: ['gender'],
          value: info.Gender
        } : { name: ['gender']},
         info.Sexo ? {
          name: ['sexo'],
          value: info.Sexo
        } : { name: ['sexo']},
        info.Bio ? {
          name: ['bio'],
          value: info.Bio
        } : { name: ['bio']},
        info.Location ? {
          name: ['location'],
          value: location.city
        } : {name :['location']}
        ]}
        name="update"
        onFinish={handleUpdate}>

        <Form.Item>{info.Username}</Form.Item>
        
        <Form.Item
          label={t('age')}
          name='age'
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
          name='gender'
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
          name='sexo'
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
          name='bio'
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
          name='interests'
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
          label={t('city')}
          name='location'
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
            <Button type="primary" htmlType="submit">
              {t('update information')}
            </Button>
        </Form.Item>
      </Form>) : null }
    </Row>
  )
}

export default UpdateUserInformation;
