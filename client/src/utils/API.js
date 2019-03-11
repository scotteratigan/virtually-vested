/* eslint-disable no-console */
import axios from 'axios';

export default {
  getUser: function (token) {
    console.log('API.js getUser: token:', token);
    return axios.get(`/api/user/${token}`);
  },
  getTrades: function () {
    // todo: specify user
    return axios.get('/api/transactions');
  },
  getCurrentPrice: function (symbol) {
    if (!symbol) return {};
    return axios.get(`/api/stock/quote/${symbol}`);
  },
  stockDailyHistory: function (symbol) {
    return axios.get(`/api/stock/daily/${symbol}`);
  },
  logUserIn: function (userToken) {
    console.log('API.logUserIn: should be calling a POST to /api/user/login');
    console.log('passing in token:', userToken);
    try {
      return axios.post(`/api/user/login?user=${userToken}`);
    } catch (err) {
      console.err('API.js POST error:', err);
    }
  }
};
