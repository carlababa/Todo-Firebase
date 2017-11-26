import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (authed === true ? <Component {...props} /> : <Redirect to="signin" />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  authed: PropTypes.bool.isRequired,
};

export default PrivateRoute;
