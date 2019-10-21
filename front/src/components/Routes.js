import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Reservation from '../routes/Rooms';
import Header from './Header';

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
  return isLoggedIn ? (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <LoggedIn />
    </>
  ) : (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <LoggedOut />
    </>
  );
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Routes;
