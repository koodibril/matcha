import React, { useEffect, useState } from 'react';
import { Divider, Row, Tag } from 'antd';
import DisplayComponent from './components/Display/Display';
import { useNavigation } from 'src/ducks/navigation/navigation';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useSearch, useSearchActions } from 'src/ducks/search/actions/search';
import { useProfile } from 'src/ducks/profile/actions/profile';

const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [double, setDouble] = useState(false);
  const [listSorted, setListSorted] = useState<any[]>([]);
  const user = localStorage.getItem('user');
  const { pushState } = useNavigation();
  const { getSearchResult } = useSearchActions();
  const info = useProfile();
  const userList = useSearch();
  const tagsData = ['Age', 'Distance', 'Popularity', 'Tags'];

  if (!user) pushState('/auth');
  
  useEffect(() => {
    if (user)
      getSearchResult(user);
  }, [user, getSearchResult]);

  const handleChange = (tag: any, checked: any) => {
    if (tag !== selectedTags[0]) {
      setSelectedTags([tag]);
      setDouble(false);
      sort(tag, false);
    }
    if (checked === false && double === true) {
      setSelectedTags([]);
      setDouble(false);
      sort('', false);
    }
    if (checked === false && double === false) {
      setDouble(true);
      sort(tag, true);
    }
  };

  const sort = (by: string, order: boolean) => {
    if (by === '') {
      setListSorted(userList.userResult);
    }
    else {
      const newList = userList.userResult;
      if (by === 'Age') {
        newList.sort((a: any, b: any) => {return (order ? a.Age - b.Age : b.Age - a.Age)});
      }
      else if (by === 'Distance') {
        newList.sort((a: any, b: any) => {return (order ? a.Distance - b.Distance : b.Distance - a.Distance)});
      }
      else if (by === 'Popularity') {
        newList.sort((a: any, b: any) => {return (order ? a.Popularity - b.Popularity : b.Popularity - a.Popularity)});
      }
      else if (by === 'Tags') {
        newList.sort((a: any, b: any) => {
          let amatched = 0;
          for (const interest of a.Interests) {
            for (const match of info.payload.Interests) {
              if (interest === match)
                amatched++;
            }
          }
          let bmatched = 0;
          for (const interest of b.Interests) {
            for (const match of info.payload.Interests) {
              if (interest === match)
                bmatched++;
            }
          }
          return (order ? amatched - bmatched : bmatched - amatched);
        })
      }
      setListSorted(newList);
    }
  }

  return (
    <>
      <Row justify="center" align="middle">
        <Divider plain style={{width: "80%"}}>Sort</Divider>
        {tagsData.map(tag => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}>
              {tag} {double && selectedTags.indexOf(tag) > -1 ? <UpOutlined></UpOutlined> : <DownOutlined></DownOutlined>}
          </Tag.CheckableTag>
        ))}
      </Row>
      <Divider style={{width: "80%"}}></Divider>
      <Row justify="center" align="middle">
          <DisplayComponent userList={userList} sortedList={listSorted}></DisplayComponent>
      </Row>
    </>);
};

export default Home;