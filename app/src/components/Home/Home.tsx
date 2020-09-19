import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';

interface UserState {
  user: {
    token: string | null
  }
}

const Home: React.FC = () => {
  const user = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();

  if (!user || !user.token) dispatch(pushState('/auth'));

  return <div>Home Component</div>
};

export default Home;