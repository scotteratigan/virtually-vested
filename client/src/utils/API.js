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
    if (!symbol) {
      console.error('Error getting current stock price.');
      return Promise.reject({});
    }
    return axios.get(`/api/stock/quote/${symbol}`);
  },
  stockDailyHistory: function (symbol) {
    return axios.get(`/api/stock/daily/${symbol}`);
  },
  makeTrade: function (tradeData) {
    console.log('inside API.js, calling axios.post with data:', JSON.stringify(tradeData));
    return axios.post('/api/transactions/', tradeData);
  }
};
