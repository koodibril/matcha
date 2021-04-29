import React, { useState } from 'react';
import { Form, Row, Slider } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { useTranslation } from 'react-i18next';
import { useSearchActions } from 'src/ducks/search/actions/search';

const Filter: React.FC<{filter: any}> = (props) => {
    const [selectedTags, setSelectedTags] = useState<any[]>(props.filter.lfinterests);
    const [ageGap, setAgeGap] = useState<any>(props.filter.agegap);
    const [proximity, setProximity] = useState(props.filter.proximity);
    const [popularity, setPopularity] = useState<any>(props.filter.lfpopularity);
    const tagsData = ['Movies', 'Books', 'Music', 'Sports', 'Bio', 'Geek', 'Netflix', 'Nature', 'Video Games', 'Ski'];

    const { t } = useTranslation('filter');
    const user = localStorage.getItem('user');
    const { updateAgeGap, updateInterests, updatePopularity, updateProximity } = useSearchActions();

    const handleChange = (tag: any, checked: any) => {
        const nexSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        updateInterests(nexSelectedTags, user);
        setSelectedTags(nexSelectedTags);
      };

    const handleAgeGap = (values: any) => {
        updateAgeGap(values, user);
        setAgeGap(values);
    }

    const handleProximity = (values: any) => {
        updateProximity(values, user);
        setProximity(values);
    }

    const handlePopularity = (values: any) => {
        updatePopularity(values, user);
        setPopularity(values);
    }

  return (
    <Row justify="center" align="middle" style={{margin: '16px'}}>
        <Form
            name="filter"
            initialValues={{
                age: ageGap,
                proximity: proximity,
                popularity: popularity
            }}>
            <Form.Item
                label={t('age') + ':   ' + ageGap[0] + ' - ' + ageGap[1] + (ageGap[1] === 80 ? '+' : '')}
                >
                <Slider
                    onChange={handleAgeGap}
                    max={80}
                    min={18}
                    range
                    defaultValue={ageGap}/>
            </Form.Item>
            <Form.Item
                label={t('proximity') + ':   ' + proximity}
                >
                <Slider
                    onChange={handleProximity}
                    max={24}
                    min={0}
                    defaultValue={proximity}/>
            </Form.Item>
            <Form.Item
                label={t('popularity') + ':   ' + popularity[0] + ' - ' + popularity[1]}
                >
                <Slider
                    onChange={handlePopularity}
                    max={10}
                    min={0}
                    range
                    defaultValue={popularity}/>
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