import React, { useState } from 'react';

import { Row, Form, Button, Input, Select, InputNumber, Col } from 'antd';

import { useTranslation } from 'react-i18next';

import { useProfile, useProfileActions } from '../../../../ducks/profile/actions/profile';
import { UserData } from '../../../Profile/components/UpdateUserInformation/UpdateUserInformation.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import MapHolderComponent from '../MapHolder/MapHolder';
import axios from 'axios';


const UpdateUserInformation: React.FC<{info: any}> = (props) => {
  const [location, setLocation] = useState({city: 'Unknow', latitude: 0, longitude: 0});
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [errorTag, setErrorTag] = useState(false);
  const [errorPicture, setErrorPicture] = useState(false);
  const user = localStorage.getItem('user');
  const info = useProfile();

  const { updateProfileInfo } = useProfileActions(); 
  const { t } = useTranslation('profile');

  const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

  if (props.info && props.info && props.info.Interests && selectedTags.length === 0  && !tagsLoaded) {
    setSelectedTags(props.info.Interests);
    setLocation({city: props.info.Location, latitude: props.info.Latitude, longitude: props.info.Longitude});
    setTagsLoaded(true);
  }

  const gotPicture = (pictures: string[]) => {
    let empty = 0
    pictures.forEach(el => {
      if (el === '') {
        empty++;
      }
    })
    if (empty === 5) {
      return false;
    }
    return true;
  }

  const handleUpdate = (newval: UserData, usr: UserData) => {
    usr.interests = selectedTags;
    if (!gotPicture(info.payload.Pictures)) {
      setErrorPicture(true);
    } else if (!errorTag) {
      updateProfileInfo(usr, user, location);
      setErrorTag(false);
      setErrorPicture(false);
    }
  };

  const checkTags = (tags: any) => {
    if (tags.length < 3) {
      setErrorTag(true);
    } else {
      setErrorTag(false);
      const usr = {age: info.payload.Age, gender: info.payload.Gender, sexo: info.payload.Sexo, bio: info.payload.Bio, interests: tags};
      updateProfileInfo(usr, user, location);
    }
  }

  const handleChange = (tag: any, checked: any) => {
    if (selectedTags.length <= 5 || checked === false) {
      const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
      checkTags(nexSelectedTags);
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
    {errorPicture ? <div role="alert" className='ant-form-item-explain-error'>You need to add at least one picture</div>: null}
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
        onValuesChange={handleUpdate}>

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
              <Row>
                <Col>
                  <Input disabled value={location.city}></Input>
                </Col>
                <Col>
                  <Button onClick={handleLocation}>{t('update location')}</Button>
                </Col>
              </Row>
            </Form.Item>
            <MapHolderComponent location={location.city} latitude={location.latitude} longitude={location.longitude}></MapHolderComponent>
        </Form.Item>
      </Form>) : null }
    </Row>
  )
}

export default UpdateUserInformation;