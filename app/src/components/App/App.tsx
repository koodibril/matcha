import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../helpers/history';
import { alertActions } from '../../actions/alert';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

const App: React.FC = () => {
  const alert = useSelector((state: any) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location: any, action: any) => {
      // Clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-md offset-md-2">
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
          <Router history={history} >
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App;
