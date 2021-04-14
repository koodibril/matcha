import React from 'react';
import { Row } from 'antd';
import DisplayComponent from './components/Display/Display';
import { useNavigation } from 'src/ducks/navigation/navigation';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const { pushState } = useNavigation();

  if (!user) pushState('/auth');

  return (
  <Row justify="center" align="middle">
      <DisplayComponent></DisplayComponent>
  </Row>);
};

export default Home;