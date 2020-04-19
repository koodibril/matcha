import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: any,
  exact: boolean,
  path: string,
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props: any) => (
      localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
);

export default PrivateRoute;
