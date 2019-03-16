import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import API from '../../utils/API';
import Footer from '../Footer';
import SearchStocks from '../SearchStock/SearchStock';

class DailyHistory extends PureComponent {
  state = {
    symbol: this.props.location.state.tickerSymbol || 'MSFT',
    series: []
  }
  componentDidMount = () => {
    if (this.state.symbol) this.displayGraph();
  }
  displayGraph = async () => {
    const res = await API.stockDailyHistory(this.state.symbol);
    this.setState({ series: res.data });
  }
  handleAddStock = newTickerSymbol => {
    this.setState({ symbol: newTickerSymbol }, () => this.displayGraph());
  }

  render() {
    return (
      <>
        <div className='container-fluid'>
          <br />
          <h1 style={{ marginInlineStart: '250px' }}>
            History for: {this.state.symbol}
          </h1>
          <br />
          <LineChart
            width={800} height={500}
            data={this.state.series}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='close' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
          <SearchStocks clickFunction={this.handleAddStock} buttonLabel='Chart Stock' prompt='Stock to chart' />

        </div>
        <Footer />
      </>
    );
  }
}

export default DailyHistory;