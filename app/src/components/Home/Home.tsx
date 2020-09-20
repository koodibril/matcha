import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';

import { AuthenticationState } from '../../ducks/authentication/types/AuthenticationState.d';

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: AuthenticationState) => state.authentication);
  const dispatch = useDispatch();

  if (!isAuthenticated) dispatch(pushState('/auth'));

  return <div>Home Component</div>
};

export default Home;