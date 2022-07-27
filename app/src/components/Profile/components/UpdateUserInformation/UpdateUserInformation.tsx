import React, { useState } from 'react';

import { Row, Form, Button, Input, Select, InputNumber } from 'antd';

import { useTranslation } from 'react-i18next';

import { useProfileActions } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import MapHolderComponent from '../MapHolder/MapHolder';
import axios from 'axios';


const UpdateUserInformation: React.FC<{info: any}> = (props) => {
  const [location, setLocation] = useState({city: 'Unknow', latitude: 0, longitude: 0});
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [errorTag, setErrorTag] = useState(false);
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
    console.log('hey')
    usr.interests = selectedTags;
    if (selectedTags.length < 3) {
      setErrorTag(true);
    } else {
      updateProfileInfo(usr, user, location);
      setErrorTag(false);
    }
  };

  const checkTags = () => {
    if (selectedTags.length < 3) {
      setErrorTag(true);
    } else {
      setErrorTag(false);
    }
  }

  const handleChange = (tag: any, checked: any) => {
    if (selectedTags.length <= 5 || checked === false) {
      const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
      setSelectedTags(nexSelectedTags);
    }
  };

  const checkLocation = () => {
    if (location.city === 'Unknow')
      return Promise.reject('You must set your location');
    else
      return Promise.resolve();
  }

  const handleLocation = async () => {
    const loc = await axios.get('http://www.geoplugin.net/json.gp');
    setLocation({
      city: loc.data.geoplugin_regionName,
      latitude: parseFloat(loc.data.geoplugin_latitude),
      longitude: parseFloat(loc.data.geoplugin_longitude)
    });
  }

  return (
    <Row>
      { props.info ? (
      <Form
        style={{margin: "10px", maxWidth: "100%"}}
        fields={[ props.info.Age ? {
          name: ['age'],
          value: props.info.Age
        } : { name: ['age']},
        props.info.Gender ? {
          name: ['gender'],
          value: props.info.Gender
        } : { name: ['gender']},
         props.info.Sexo ? {
          name: ['sexo'],
          value: props.info.Sexo
        } : { name: ['sexo']},
        props.info.Bio ? {
          name: ['bio'],
          value: props.info.Bio
        } : { name: ['bio']},
        {
          name: ['location'],
          value: location.city
        }
        ]}
        name="update"
        onFinish={handleUpdate}>

        <Form.Item>{props.info.Username}</Form.Item>
        
        <Form.Item
          label={t('age')}>
          <Form.Item
            name="age"
            rules={[{
              required: true,
              message: t('age_missing')
            }]}>
            <InputNumber min={18} max={80}/>
          </Form.Item>
        </Form.Item>

        <Form.Item
          label={t('gender')}>
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

        <Form.Item
          label={t('sexual orientation')}>
            <Form.Item name="sexo"
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

        <Form.Item
          label={t('bio')}>
            <Form.Item 
              name="bio"
              rules={[{
                required: true,
                message: t('bio_missing')
              }]}>
              <Input.TextArea maxLength={500}/>
            </Form.Item>
        </Form.Item>
        
        <Form.Item
          label={t('interests')}>
            {tagsData.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
            {errorTag ? <div role="alert" className='ant-form-item-explain-error'>You need to select at least 3 interests</div>: null}
        </Form.Item>

        <Form.Item
          label={t('city')}>
            <Form.Item
            name="location"
            rules={[{
              validator: checkLocation
            }]}>
              <Input disabled value={location.city}></Input>
            </Form.Item>
            <MapHolderComponent location={location.city} latitude={location.latitude} longitude={location.longitude}></MapHolderComponent>
            <Button onClick={handleLocation}>{t('update location')}</Button>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => checkTags()}>
              {t('update information')}
            </Button>
        </Form.Item>
      </Form>) : null }
    </Row>
  )
}

export default UpdateUserInformation;