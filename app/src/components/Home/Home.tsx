import React from 'react';
import { useDispatch } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { Modal } from "../Modal/Modal";
import { useModal } from '../../hooks/useModal';

const Home: React.FC = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const { isShown, toggle } = useModal();
  const content = <React.Fragment>Hey, I'm a model.</React.Fragment>;

  if (!user) dispatch(pushState('/auth'));

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(pushState('/'));
  }

  return (
  <div>Home Component
    <button onClick={logout}>logout</button>
    <React.Fragment>
      <button onClick={toggle}>Open modal</button>
      <Modal isShown={isShown} hide={toggle} modalContent={content} headerText="hello there"/>
    </React.Fragment>
  </div>);
};

export default Home;