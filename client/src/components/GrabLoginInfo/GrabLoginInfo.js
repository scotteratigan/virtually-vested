/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Detail extends Component {
  state = { redirect: false, timeout: null }

  componentDidMount() {
    // todo: handle authentication of token, and expiration of token
    const currentHash = window.location.hash;
    const JWT = currentHash.match(/&id_token=(.+)/)[1];
    const decoded = jwt_decode(JWT);
    let userToken = decoded.sub;
    let userEmail = decoded.email;
    userToken = userToken.replace(/\|/, '-'); // strip out the | in token, replace with - (no need to escape in url this way)
    console.log('userToken:', userToken);
    this.props.logUserIn(userToken, userEmail);
    // console.log('about to call API.logUserIn from GrabLoginInfo');
    // API.logUserIn(userToken); // note: no need to set state here, this is done in App.js
    console.log('this.state.redirect:', this.state.redirect);
    setTimeout(() => {
      // redirect to logged in after 2 seconds
      // todo: replace with better method?
      this.setState({ redirect: true });
    }, 2000);
  }

  render = () => {
    return (
      <h1 className='text-center'>{this.state.redirect ? <Redirect to='/portfolio' /> : <>Loading account details...</>}</h1>
    );
  }
}

export default Detail;
