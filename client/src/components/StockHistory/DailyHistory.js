import React, { Component, PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import API from '../../utils/API';

class DailyHistory extends PureComponent {
  state = {
    symbol: 'MSFT',
    series: {}
  }
  componentDidMount = async () => {
    const res = await API.stockDailyHistory(this.state.symbol);
    console.log(res.data);
    this.setState({ series: res.data });
  }
  render() {
    return (
      <>
        <h1>History for {this.state.symbol}</h1>
        <LineChart
          width={800}
          height={500}
          data={this.state.series}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </>
    );
  }
}

export default DailyHistory;