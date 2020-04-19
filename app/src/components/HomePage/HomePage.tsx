import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions/user';

const HomePage: React.FC = () => {
  const users = useSelector((state: any) => state.users);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  const handleDeleteUser = (id: any) => {
    dispatch(userActions.delete(id));
  };

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hi {user.firstName}!</h1>
      <p>You're logged in with React Hooks!!</p>
      <h3>All reggistered users:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items &&
        <ul>
          {users.items.map((user: any, index: any) =>
            <li key={user.id}>
              {`${user.firstName} ${user.lastName}`}
              {
                user.deleting
                  ? <em> - Deleting...</em>
                  : user.deleteError
                    ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                    : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary" >Delete</a></span>
              }
            </li>
          )}
        </ul>
      }
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  )
};

export default HomePage;
