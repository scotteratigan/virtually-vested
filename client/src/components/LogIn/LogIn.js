import React, { Component } from 'react';
import Auth from '../../pages/Auth';



class LogIn extends Component {
  state = {
    userLoggedIn: this.props.userLoggedIn,
    userToken: this.props.userToken
  }

  logIn = () => {
    // alert('calling login');
    const auth = new Auth();
    auth.login();
  }

  render() {
    return (
      <div>
        {/* todo: use actual token in future? */}
        {/* <button onClick={() => this.props.logUserIn('first user')}>Log In</button> */}
        <button onClick={() => this.logIn()}>Log In</button>
      </div>
    );
  }
}

export default LogIn;