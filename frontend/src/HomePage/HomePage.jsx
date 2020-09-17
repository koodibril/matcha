import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions/user';

import styles from './HomePage.module.scss';

function HomePage() {
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  return (
    <div className={styles.view}>
      <h1>Hi {user.firstName}!</h1>
      <p>You're logged in with React Hooks!!</p>
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

export { HomePage };