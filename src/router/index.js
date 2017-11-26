import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as firebase from '../firebase';
import App from '../containers/App';
import PrivateRoute from './PrivateRoute';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { mapStateToProps, mapDispatchToProps } from '../containers/Auth';

class Router extends Component {
  componentDidMount() {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.actions.userIsFetched();
      } else {
        this.props.actions.userIsLoggedOut();
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute path="/" authed={this.props.auth.isLoggedIn} component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
