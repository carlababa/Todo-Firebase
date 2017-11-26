import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapDispatchToProps, mapStateToProps } from '../containers/Auth';
import SubmissionForm from './SubmissionForm';
import { StyledLink, Centered } from './styledComponents';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  setValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.signIn(this.state.email, this.state.password);
  }

  render() {
    return (
      <Centered>
        {this.props.auth.isLoggedIn && <Redirect to="/" />}
        <p>You must sign in to view add a TODO</p>
        <SubmissionForm
          handleSubmit={this.handleSubmit}
          setValue={this.setValue}
          email={this.state.email}
          password={this.state.password}
          buttonText="Sign In"
          errorMessage={this.props.auth.error && this.props.auth.errorMessage}
        />
        <StyledLink href="/signup" to="/signup">Sign Up</StyledLink>
      </Centered>
    );
  }
}

SignIn.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
