import React, { useState } from 'react';
import { Form, Row, Slider } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useTranslation } from 'react-i18next';

const Filter: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<any[]>([]);
    const [ageGap, setAgeGap] = useState([18, 26]);
    const [proximity, setProximity] = useState(24);
    const [popularity, setPopularity] = useState([0, 10]);
    const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

    const { t } = useTranslation('filter');
    const handleChange = (tag: any, checked: any) => {
        const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nexSelectedTags);
      };

    const handleAgeGap = (values: any) => {
        setAgeGap(values);
    }

    const handleProximity = (values: any) => {
        setProximity(values);
    }

    const handlePopularity = (values: any) => {
        setPopularity(values);
    }

  return (
    <Row justify="center" align="middle" style={{margin: '16px'}}>
        <Form
            name="filter"
            initialValues={{
                age: [18,26],
                proximity: 24,
                popularity: [0,10]
            }}>
            <Form.Item
                label={t('age') + ':   ' + ageGap[0] + ' - ' + ageGap[1] + (ageGap[1] === 80 ? '+' : '')}
                >
                <Slider
                    onChange={handleAgeGap}
                    max={80}
                    min={18}
                    range
                    defaultValue={[18, 26]}/>
            </Form.Item>
            <Form.Item
                label={t('proximity') + ':   ' + proximity}
                >
                <Slider
                    onChange={handleProximity}
                    max={24}
                    min={0}
                    defaultValue={24}/>
            </Form.Item>
            <Form.Item
                label={t('popularity') + ':   ' + popularity[0] + ' - ' + popularity[1]}
                >
                <Slider
                    onChange={handlePopularity}
                    max={10}
                    min={0}
                    range
                    defaultValue={[0, 10]}/>
            </Form.Item>
            <Form.Item
                label={t('interests')}
                >
                {tagsData.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => handleChange(tag, checked)}>
                    {tag}
                </CheckableTag>
                ))}
            </Form.Item>
        </Form>
  </Row>);
};

export default Filter;