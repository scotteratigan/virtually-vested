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
// import update from "react-addons-update";

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
    workingPortfolio: [],
    count: 0
  };

  // todo: add stock to list button should clear input field

  deleteStock = index => {
    if (this.state.workingPortfolio[index].quantity > 0) {
      alert("Can't delete a stock you own!"); // todo: replace with modal
      return;
    }
    this.state.workingPortfolio.splice(index, 1);
    this.setState({ workingPortfolio: this.state.workingPortfolio });
  }

  loadPortfolioData = () => {
    // destructuring each object here to avoid mutation
    const workingPortfolio = this.props.stockPortfolio.map(stock => { return { ...stock, netShareChange: 0 } });
    this.setState({ workingPortfolio });
  }

  componentDidMount() {
    this.loadPortfolioData();
  }

  addStockToPortfolio = ticker => {
    const updatedPortfolio = [...this.state.workingPortfolio];
    updatedPortfolio.unshift({ centsTotal: 0, netShareChange: 0, quantity: 0, tickerSymbol: ticker }); // todo: replace with push but then render in opposite order
    this.setState({ workingPortfolio: updatedPortfolio });
  }

  handleIncrement = (index) => {
    let tempPortfolio = [...this.state.workingPortfolio];
    tempPortfolio[index].netShareChange += 1
    this.setState({ workingPortfolio: tempPortfolio });
    // console.log("Increment value: " + JSON.stringify(this.state.netShareChange));
  };

  handleDecrement = (index) => {
    let tempPortfolio = [...this.state.workingPortfolio];
    tempPortfolio[index].netShareChange -= 1
    this.setState({ workingPortfolio: tempPortfolio });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <img src={Logo} alt='Virtually Vested' />
              <h1>Stock Portfolio</h1>
              <h3>{this.state.name}</h3>
              <div className=""><p style={{ textDecoration: 'underline' }}>Starting Cash:</p> {formatCash(this.props.user.startingCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Cash on Hand:</p> {formatCash(this.props.user.cash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Total Gain/Loss:</p> {formatCash(this.state.currentCash - this.state.startCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>% Total Gain/Loss:</p> {(((this.state.currentCash - this.state.startCash) / this.state.startCash) * 100).toFixed(2)}%</div>
              {/* Rank state data goes below */}
              <div><p style={{ textDecoration: 'underline' }}>Rank:</p> {"X"} of {"X"}</div>
            </Jumbotron>
            <SearchStocks clickFunction={this.addStockToPortfolio} buttonLabel='Add Stock to Portfolio' />
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
                  {this.state.workingPortfolio.map((stock, index) => (
                    <tr key={stock.tickerSymbol} className={'list-group-item-action'} >
                      <td style={{ display: 'block' }}>{stock.tickerSymbol}</td>
                      {console.log('this.props.stockInfo:', this.props.stockInfo)}
                      {console.log('stock.tickerSymbol', stock.tickerSymbol)}
                      {console.log('this.props.stockInfo[stock.tickerSymbol]:', this.props.stockInfo[stock.tickerSymbol].companyName)}
                      <td style={{ display: 'block' }}><a href={`https://news.google.com/search?q=${this.props.stockInfo[stock.tickerSymbol].companyName}`}
                        rel='noopener noreferrer' target='_blank'>{this.props.stockInfo[stock.tickerSymbol].companyName} Info</a></td>
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

                            {/* Counter Div */}
                            <div className='counter' count={stock.netShareChange} name={stock.tickerSymbol}
                              handleIncrement={this.handleIncrement}
                              handleDecrement={this.handleDecrement}>

                              {/* Decrement button */}
                              <button className='btn-outline-danger btn-sm' onClick={() => this.handleDecrement(index)}>
                                -
                          </button>

                              {/* Score display */}
                              <div className="counter-score" style={{ display: 'inline-block', overflow: 'hidden' }}>{stock.netShareChange}</div>

                              {/* Increment button */}
                              <button className='btn-outline-success btn-sm' onClick={() => this.handleIncrement(index)}>
                                +
                          </button>
                              <button onClick={() => this.deleteStock(index)}>delete</button>
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