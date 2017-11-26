import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { mapDispatchToProps, mapStateToProps } from '../containers/Auth';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.signIn(this.state.email, this.state.password);
  }

  render() {
    return (
      <section>
        {this.props.auth.isLoggedIn && <Redirect to="/" />}
        <p>You must log in to view add a TODO</p>
        {this.props.auth.errorMessage && <p style={{ color: 'red', fontWeight: 500 }}>{this.props.auth.errorMessage}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" value={this.state.email} onChange={this.setValue} />
          <input type="password" name="password" value={this.state.password} onChange={this.setValue} />
          <button type="submit">Sign In</button>
        </form>
        <Link to='/signup'>Sign Up</Link>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
