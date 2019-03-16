// Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  redirectUri = window.location.hostname === 'localhost' ? 'http://localhost:3000/loggedin' : 'https://virtuallyvested.herokuapp.com/loggedin';

  auth0 = new auth0.WebAuth({
    domain: 'scotte.auth0.com', // todo: update when deploying to Heroku
    clientID: 'fLrth2SyXCru10XKaJflwtXu-YZ7ecVU',
    redirectUri: this.redirectUri,
    response_mode: 'query',
    responseType: 'token id_token',
    scope: 'openid email'
  });

  login() {
    this.auth0.authorize();
  }
}