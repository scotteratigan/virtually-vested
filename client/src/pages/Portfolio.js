import React, { Component, useState } from 'react';
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
import '../components/Counter/style.css';
import update from "react-addons-update";

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
    currentPortfolio: [],
    workingPortfolio: [],
    count: 0
  };

  loadPortfolioData = () => {
    const currentPortfolio = this.props.stockPortfolio
    const workingPortfolio = currentPortfolio.map(element => ({netShareChange: 0 ,...element}))
    this.setState({ currentPortfolio: currentPortfolio });
    this.setState({ workingPortfolio: workingPortfolio })
  }



  componentDidMount() {
    this.loadPortfolioData();
  }
  

    handleIncrement = () => {
      this.setState({ netShareChange: this.state.netShareChange + 1 });
      console.log("Increment value: " + JSON.stringify(this.state.netShareChange));
    };

    handleDecrement = () => {
      this.setState({ netShareChange: this.state.netShareChange - 1 });
      console.log("Decrement value: " + JSON.stringify(this.state.netShareChange));
    };

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
                  {this.state.workingPortfolio.map(stock => (
                    <tr key={stock.tickerSymbol} className={'list-group-item-action'} >
                      <td style={{ display: 'block' }}>{stock.tickerSymbol}</td>
                      {/* <td style={{ display: 'block' }}><a href={'link to company website from API call here'}>{trade.name}</a></td> */}
                      <td>{stock.quantity}</td>
                      <td>{'API data'}</td>
                      <td>{'calc using API data'}</td>
                      <td className='text-center'>{formatCash(Math.abs(stock.price))}</td>
                      <td className='text-right'>{formatCash(Math.abs(stock.price * stock.qty))}</td>
                      <td>{'calc using API data'}</td>
                      <td>{'calc using API data'}</td>
                      <td style={{ columnCount: 3 }}>
                          <td style={{ display: 'block' }}><ActionBtns /></td>
                          <td style={{ display: 'block' }}>
                          <div className="card text-center">
          <div className='counter' count={stock.netShareChange} name={stock.tickerSymbol} 
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}>
          <button className='btn-outline-danger btn-sm' onClick={this.handleDecrement}>
          -
          </button>
            <div className="counter-score" style={{display: 'inline-block', overflow: 'hidden' }}>{stock.netShareChange}</div>
              
          <button className='btn-outline-success btn-sm' onClick={this.handleIncrement}>
          +
          </button>
          </div>
        </div>
                          </td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. Total Gain/Loss: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Cash on Hand: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio Value: {'calc using API data'}</td>
                          <td style={{ fontSize: '.75rem', display: 'block' }}>Est. New Portfolio % Gain/Loss: {'calc using API data'}</td>
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
