/* eslint-disable no-console */
import axios from 'axios';

export default {
  getUser: function () {
    return axios.get('/api/user');
  },
  getTrades: function () {
    // todo: specify user
    return axios.get('/api/transactions');
  },
  stockDailyHistory: function (symbol) {
    return axios.get(`/api/stock/daily/${symbol}`);
  }
};
