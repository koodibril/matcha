import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Form, Select, Slider } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useTranslation } from 'react-i18next';
import { getSearchResult } from '../../../../ducks/search/actions/search';

const Filter: React.FC = () => {
    const [age, setAge] = useState([18, 26]);
    const [proximity, setProximity] = useState(24);
    const [popularity, setPopularity] = useState([0, 10]);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];
    const dispatch = useDispatch();

    const { t } = useTranslation('filter');
    const handleChange = (tag: any, checked: any) => {
        const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nexSelectedTags);
      };

    const handleFilterChange = (type: string, change: any) => {
        console.log(type, change);
        if (type === 'age') {
            dispatch(getSearchResult(change, proximity, popularity, selectedTags));
        } else if (type === 'pro') {
            dispatch(getSearchResult(age, change, popularity, selectedTags));
        } else if (type === 'pop') {
            dispatch(getSearchResult(age, proximity, change, selectedTags));
        }
    }

    const handleAge = (change: any) => {
        setAge(change);
        handleFilterChange('age', change);
    }
    const handleProximity = (change: any) => {
        setProximity(change);
        handleFilterChange('pro', change);
    }
    const handlePopularity = (change: any) => {
        setPopularity(change);
        handleFilterChange('pop', change);
    }

  return (
  <Form>
    <Form.Item
        label={t('age')}
        name="age">
        <Slider
            max={80}
            min={18}
            onAfterChange={handleAge}
            range
            defaultValue={[18, 26]}
            marks={{
              18: '18',
              22: '22',
              26: '26',
              30: '30',
              34: '34',
              38: '38',
              42: '42',
              46: '46',
              50: '50',
              54: '54',
              58: '58',
              62: '62',
              66: '66',
              70: '70',
              74: '74',
              80: '80+'
            }}/>
    </Form.Item>
    <Form.Item
        label={t('proximity')}
        name="proximity">
        <Slider
            max={24}
            min={0}
            onAfterChange={handleProximity}
            defaultValue={24}
            marks={{
              0: '0',
              4: '4',
              8: '8',
              12: '12',
              16: '16',
              20: '20',
              24: '24+',
            }}/>
    </Form.Item>
    <Form.Item
        label={t('popularity')}
        name="popularity">
        <Slider
            max={10}
            min={0}
            range
            onAfterChange={handlePopularity}
            defaultValue={[0, 10]}
            marks={{
              0: '0',
              2: '2',
              4: '4',
              6: '6',
              8: '8',
              10: "10"
            }}/>
    </Form.Item>
    <Form.Item
        label={t('interests')}
        name="interests">
        {tagsData.map(tag => (
        <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}>
            {tag}
        </CheckableTag>
        ))}
    </Form.Item>
  </Form>);
};

export default Filter;