import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push as pushState } from 'connected-react-router';
import { activateUser } from '../../../../ducks/authentication/actions/authentication';

const Activate: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message);

  useEffect(() => {
    const path = window.location.pathname.split('/');
    console.log(path);
    if (path.length === 4) {
      dispatch(activateUser(path[3]));
    } else dispatch(pushState('/auth'));
  }, [dispatch]);

  return (
    <>
        { message.message }
    </>
  )
}

export default Activate;