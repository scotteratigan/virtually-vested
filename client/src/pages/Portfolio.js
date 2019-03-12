import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
import ActionBtns from '../components/ActionBtns';
// import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Logo from '../images/logo.png';
import CardBody from "../components/Counter/CardBody";

// let allUniqueSymbols = [];
// let currentPrices = [];

class Portfolio extends Component {
  state = {
    currentCash: 0,
    startCash: 0,
    email: '',
    name: '',
    portfolioValue: 0,
    tradeHistory: [],
    selectedStock: null, // todo: determine data type
    currentPortfolio: [{
      symbol: '',
      sharesOwned: 0,
      totalCostBasis: 0,
      currentCostPerShare: 0,
      netChangeNumOfShares: 0
    }]
  };

  // componentDidMount() {
  //   this.loadUserData();
  // }

  // loadUserData = () => {
  //   // todo: retry if db connection fails
  //   // todo: replace with a filter search when we have other users
  //   API.getUser()
  //     .then(res => {
  //       const { startCash, email, name, portfolioValue, tradeHistory } = res.data[0];
  //       console.log(res.data[0]);
  //       // Calculate the net of all trades:
  //       const transactionsNet = tradeHistory.reduce((net, trade) => (net + trade.price), 0);
  //       const currentCash = startCash + transactionsNet;
  //       // Creates an array of all unique symbols from the trade history
  //       const allSymbols = tradeHistory.map(trade => trade.symbol)
  //       // console.log("All Symbols: " + allSymbols);
  //       allUniqueSymbols = allSymbols.filter(function (item, pos, self) {
  //         return self.indexOf(item) === pos;
  //       });
  //       console.log('All Unique Symbols: ' + allUniqueSymbols);
  //       // Get sharesOwned for each symbol and push to an array
  //       const sharesOwnedPerSymbol = [];
  //       for (let i = 0; i < allUniqueSymbols.length; i++) {
  //         let temp = tradeHistory.filter((trade) => trade.symbol.indexOf(allUniqueSymbols[i]) > -1);
  //         let owned = temp.reduce((net, trade) => (net + trade.qty), 0);
  //         sharesOwnedPerSymbol.push(owned);
  //       }
  //       console.log('owned: ' + sharesOwnedPerSymbol);
  //       // Get totalCostBasis for each symbol and push to an array
  //       const totalCostBasisPerSymbol = [];
  //       for (let i = 0; i < allUniqueSymbols.length; i++) {
  //         let temp = tradeHistory.filter((trade) => trade.symbol.indexOf(allUniqueSymbols[i]) > -1);
  //         let owned = temp.reduce((net, trade) => (net + trade.price), 0);
  //         totalCostBasisPerSymbol.push(owned);
  //       }
  //       console.log('Total Cost Basis: ' + totalCostBasisPerSymbol);
  //       // todo: add currentPortfolio data to setstate    
  //       this.setState({ currentCash, startCash, email, name, portfolioValue, tradeHistory })
  //     }).catch(err => console.log(err));
  // };






  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <img src={Logo} alt='Virtually Vested' />
              <h1>Stock Portfolio</h1>
              <h3>{this.state.name}</h3>
              <div className=""><p style={{ textDecoration: 'underline' }}>Starting Cash:</p> {formatCash(this.state.startCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Cash on Hand:</p> {formatCash(this.state.currentCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Total Gain/Loss:</p> {formatCash(this.state.currentCash - this.state.startCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>% Total Gain/Loss:</p> {(((this.state.currentCash - this.state.startCash) / this.state.startCash) * 100).toFixed(2)}%</div>
              {/* Rank state data goes below */}
              <div><p style={{ textDecoration: 'underline' }}>Rank:</p> {"X"} of {"X"}</div>
            </Jumbotron>
            <SearchStocks selectedStock={this.state.selectedStock} />
            <div className='table-responsive' style={{ backgroundColor: '#5B45B9', color: 'white', width: 'auto', paddingTop: '5px' }}><h3 className='text-center'>Current Portfolio</h3></div>
            {this.props.stockPortfolio.length ? (
              <table className='table table-bordered table-hover table-sm'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope="col" className='text-center'>Symbol
                        {'\n'}Company Name</th>
                    <th scope="col" className='text-center'>Qty</th>
                    <th scope="col" className='text-right'>Current Price / Share</th>
                    <th scope="col" className='text-right'>Current Value</th>
                    <th scope="col" className='text-right'>Cost Basis per Share</th>
                    <th scope="col" className='text-right'>Total Cost Basis</th>
                    <th scope="col" className='text-right'>Total Gain/Loss</th>
                    <th scope="col" className='text-right'>% Total Gain/Loss</th>
                    <th scope="col" className='text-center'>Buy/Sell Action Selection & Estimated Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log('PORTFOLIO.JS line 143 this.props.stockPortfolio:', this.props.stockPortfolio)}
                  {this.props.stockPortfolio.map(stock => (
                    <tr key={stock.tickerSymbol} className={'list-group-item-action'} >
                      <td style={{ display: 'block' }}>{stock.tickerSymbol}</td>
                      {/* <td style={{ display: 'block' }}><a href={'link to company website from API call here'}>{trade.name}</a></td> */}
                      <td>{stock.quantity}</td>
                      <td>{formatCash(this.props.stockInfo[stock.tickerSymbol].price)}</td>
                      <td>{formatCash(this.props.stockInfo[stock.tickerSymbol].price * stock.quantity)}</td>{/* current val */}
                      <td className='text-center'>{formatCash(Math.abs(stock.centsTotal / stock.quantity))}</td> {/* cost basis per share */}
                      <td className='text-right'>{formatCash(Math.abs(stock.centsTotal))}</td> {/* total cost basis */}
                      <td>{formatCash((this.props.stockInfo[stock.tickerSymbol].price * stock.quantity) - Math.abs(stock.centsTotal))}</td> {/* total gain/loss (cost basis per share - current val) */}

                      <td>{(((this.props.stockInfo[stock.tickerSymbol].price * stock.quantity) - Math.abs(stock.centsTotal)) / Math.abs(stock.centsTotal) * 100).toFixed(2) + ' %'}</td> {/* total gain/loss divided by total cost basis */}
                      <td style={{ columnCount: 3 }}>
                        <tr>
                          <Counter />
                          {/* <td style={{ display: 'block' }}><ActionBtns id={stock.tickerSymbol} /></td>
                          <td style={{ display: 'block' }}><Counter /></td> */}
                          {/* <td style={{ fontSize: '.75rem', display: 'block' }}>Est. Total Gain/Loss: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Cash on Hand: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio Value: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio % Gain/Loss: {'calc using API data'}</td> */}
                        </tr>
                      </td>


                      {/* <td className='text-right'><Moment format='MM-DD-YYYY HH:mm a'>{trade.date}</Moment></td> */}
                    </tr>

                  ))}
                </tbody>
              </table>
            ) : (
                <h3>Loading data...</h3>
              )}
            <Button variant='outline-success' size='lg' block style={{ margin: '1rem' }}>Make Trade!</Button>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Portfolio;


// By extending the React.Component class, Counter inherits functionality from it
class Counter extends Component {
  state: { netChangeNumOfShares: 0 }

  // handleIncrement increases this.state.count by 1
  handleIncrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ netChangeNumOfShares: this.state.netChangeNumOfShares + 1 });
  }

  // handleDecrement decreases this.state.count by 1
  handleDecrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ netChangeNumOfShares: this.state.netChangeNumOfShares - 1 });
  }
  // The render method returns the JSX that should be rendered
  render() {
    return (
      <div className="card text-center">
        {/* <button onClick={() => this.state.handleIncrement}>-</button> */}
        <p>{this.state.netChangeNumOfShares}</p>
        {/* <button onClick={() => this.state.handleDecrement}>-</button> */}
        {/* <CardBody
          netChangeNumOfShares={this.state.netChangeNumOfShares}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        /> */}
      </div>
    );
  }
}