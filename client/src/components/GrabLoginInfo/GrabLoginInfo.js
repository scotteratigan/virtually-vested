import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import API from '../../utils/API';

class Detail extends Component {
  state = {
    book: {}
  };

  componentDidMount() {
    // todo: handle authentication of token, and expiration of token
    const currentHash = window.location.hash;
    const JWT = currentHash.match(/&id_token=(.+)/)[1];
    const decoded = jwt_decode(JWT);
    let userToken = decoded.sub;
    userToken = userToken.replace(/\|/, '-'); // strip out the | in token, replace with - (no need to escape in url this way)
    console.log('userToken:', userToken);
    this.props.logUserIn(userToken);
    // console.log('about to call API.logUserIn from GrabLoginInfo');
    // API.logUserIn(userToken); // note: no need to set state here, this is done in App.js
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
