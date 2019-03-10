import React, { Component } from "react";

// import Auth from '../../pages/Auth';

import jwt_decode from 'jwt-decode';
import API from '../../utils/API';

class Detail extends Component {
  state = {
    book: {}
  };

  componentDidMount() {
    // todo: handle authentication of token, and expiration
    const currentHash = window.location.hash;
    const JWT = currentHash.match(/&id_token=(.+)/)[1];
    const decoded = jwt_decode(JWT);
    const userId = decoded.sub;
    console.log('userId:', userId);
    this.props.logUserIn(userId);
    console.log('about to call API.logUserIn from GrabLoginInfo');
    API.logUserIn(userId);
    // todo: redirect to new page now? or allow user to set username here?
  }

  render() {
    return (
      <div>
        We're grabbing the login info.
      </div>
    );
  }
}

export default Detail;
