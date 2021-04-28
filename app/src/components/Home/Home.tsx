import React, { useEffect, useState } from 'react';
import { Divider, Row, Tag } from 'antd';
import DisplayComponent from './components/Display/Display';
import { useNavigation } from 'src/ducks/navigation/navigation';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSearch, useSearchActions } from 'src/ducks/search/actions/search';

const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [double, setDouble] = useState(false);
  const user = localStorage.getItem('user');
  const { pushState } = useNavigation();
  const { getSearchResult } = useSearchActions();
  const userList = useSearch();
  const tagsData = ['Age', 'Distance', 'Popularity', 'Tags'];

  if (!user) pushState('/auth');
  
  useEffect(() => {
    if (user)
      getSearchResult(user);
  }, [user, getSearchResult]);

  const handleSort = (tag: string, sense: boolean) => {
    console.log('sort by');
    console.log(tag);
    if (sense === true)
      console.log('ascending');
    else
      console.log('descending');
  }

  const handleChange = (tag: any, checked: any) => {
    setSelectedTags([tag]);
    if (checked === false && double === true) {
      setSelectedTags([]);
      setDouble(false);
    }
    if (checked === false && double === false) {
      setDouble(true);
      handleSort(tag, true);
    }
    handleSort(tag, false);
  };

  return (
    <>
    <Row justify="center" align="middle">
      <Divider plain>Sort</Divider>
      {tagsData.map(tag => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={checked => handleChange(tag, checked)}>
            {tag} {double && selectedTags.indexOf(tag) > -1 ? <UpOutlined></UpOutlined> : <DownOutlined></DownOutlined>}
        </Tag.CheckableTag>
      ))}
    </Row>
    <Divider plain></Divider>
    <Row justify="center" align="middle">
        <DisplayComponent userList={userList}></DisplayComponent>
    </Row>
    </>);
};

export default Home;