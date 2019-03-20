import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import API from '../../utils/API';
import Footer from '../Footer';
import SearchStocks from '../SearchStock/SearchStock';

class DailyHistory extends PureComponent {
  state = {
    symbol: this.props.location.state && this.props.location.state.tickerSymbol ? this.props.location.state.tickerSymbol : 'MSFT',
    companyName: this.props.location.state && this.props.location.state.companyName ? this.props.location.state.companyName : 'Microsoft Corp.',
    series: [],
    width: 0,
    height: 0
  }
  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (this.state.symbol) this.displayGraph();
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  displayGraph = async () => {
    const res = await API.stockDailyHistory(this.state.symbol);
    this.setState({ series: res.data });
  }
  handleAddStock = (newTickerSymbol, companyName) => {
    console.log('handlingAddStock, args are:', newTickerSymbol, companyName);
    this.setState({ symbol: newTickerSymbol, companyName }, () => this.displayGraph());
  }

  render() {
    return (
      <>
        <div className='container-fluid'>
          <br />
          {/* <h1 style={{ marginInlineStart: '250px' }}> */}
          <h1 className='text-center'>
            6 Month Daily Close Price
          </h1>
          <h2 className='text-center'>
            {this.state.symbol} - {this.state.companyName}
          </h2>
          <br />
          <LineChart
            className='mx-auto'
            width={Math.floor(this.state.width * .85)} height={Math.floor(this.state.height * .5)}
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