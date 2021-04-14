import React, { useState } from 'react';
import { Button, Form, Row, Slider, Spin } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useTranslation } from 'react-i18next';
import { useSearchActions } from '../../../../ducks/search/actions/search';

const Filter: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];
    const user = localStorage.getItem('user');

    const { t } = useTranslation('filter');
    const { getSearchResult } = useSearchActions();

    const handleChange = (tag: any, checked: any) => {
        const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nexSelectedTags);
      };

    const handleFilterChange = (values: any) => {
        setLoading(true);
        getSearchResult(values.age, values.proximity, values.popularity, selectedTags, user);
        setLoading(false);
    }

  return (
    <Row justify="center" align="middle">
        <Form
            style={{ margin: '16px 0' }}
            name="login"
            onFinish={handleFilterChange}
            initialValues={{
                age: [18,26],
                proximity: 24,
                popularity: [0,10]
            }}
            onFinishFailed={console.error}>
            <Form.Item
                label={t('age')}
                name="age">
                <Slider
                    max={80}
                    min={18}
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
            <Form.Item>
                <Spin spinning={loading}>
                    <Button type="primary" htmlType="submit">
                    {t('search')}
                    </Button>
                </Spin>
            </Form.Item>
        </Form>
  </Row>);
};

export default Filter;