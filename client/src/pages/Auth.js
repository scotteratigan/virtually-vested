// Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'scotte.auth0.com', // todo: update when deploying to Heroku
    clientID: 'fLrth2SyXCru10XKaJflwtXu-YZ7ecVU',
    redirectUri: 'http://localhost:3000/loggedin',
    response_mode: 'query',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    // let temp = this.auth0.authorize();
    // console.log(JSON.stringify(temp));
    this.auth0.authorize();
  }
}