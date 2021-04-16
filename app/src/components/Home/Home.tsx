import React, { useEffect } from 'react';
import { Row } from 'antd';
import DisplayComponent from './components/Display/Display';
import { useNavigation } from 'src/ducks/navigation/navigation';
import { useSearchActions } from 'src/ducks/search/actions/search';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const { pushState } = useNavigation();
  const { getSearchResult } = useSearchActions();

  if (!user) pushState('/auth');

  
  useEffect(() => {
    if (user)
      getSearchResult(user);
  }, [user, getSearchResult]);

  return (
  <Row justify="center" align="middle">
      <DisplayComponent></DisplayComponent>
  </Row>);
};

export default Home;