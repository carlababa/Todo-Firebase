import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false,
  }

  handleSubmit = (evt) => {
    // evt.preventDefault();
    // auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
    //   this.setState({redirectToReferrer: true});
    // });
  }

  setValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <section>
        <p>You must log in to view add a TODO</p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <input type="password" name="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          <button type="submit">Sign In</button>
        </form>
        <Link to='/signin'>Sign In</Link>
      </section>
    );
  }
}

export default SignUp;
