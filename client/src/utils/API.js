/* eslint-disable no-console */
import axios from 'axios';

export default {
  getUser: function (user) {
    console.log('API.js getUser: user:', user);
    return axios.get(`/api/user/token-${user.token}&email-${user.email}`);
  },
  getTrades: function (token) {
    // todo: ensure user is authorized
    return axios.get(`/api/transactions/${token}`);
  },
  getCurrentPrice: function (symbol) {
    if (!symbol) return {};
    return axios.get(`/api/stock/quote/${symbol}`);
  },
  stockDailyHistory: function (symbol) {
    return axios.get(`/api/stock/daily/${symbol}`);
  }/*,
  logUserIn: function (userToken) {
    console.log('API.logUserIn: should be calling a POST to /api/user/login');
    console.log('passing in token:', userToken);
    try {
      return axios.post(`/api/user/login?user=${userToken}`);
    } catch (err) {
      console.err('API.js POST error:', err);
    }
  }*/
};
