import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Auth from '../routers/Auth';
import Reservation from '../routers/Rooms';

const LoggedIn = () => (
  <Switch>
    <Route path="/" component={Reservation} />
  </Switch>
);

const LoggedOut = () => (
  <Switch>
    <Route path="/" component={Auth} />
  </Switch>
);

const Routes = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedIn /> : <LoggedOut />;
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Routes;
