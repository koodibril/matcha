import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  if (!user) dispatch(pushState('/auth'));

  const logout = () => localStorage.removeItem('user');

  return <div>Home Component<button onClick={logout}>logout</button></div>
};

export default Home;