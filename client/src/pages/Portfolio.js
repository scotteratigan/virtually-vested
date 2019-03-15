import React, { Component, useState } from 'react';
import Jumbotron from '../components/Jumbotron';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
// import ActionBtns from '../components/ActionBtns';
// import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Logo from '../images/logo.png';
import StockPortfolioItem from '../components/StockPortolioItem/StockPortfolioItem';

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

  deleteStock = index => {
    if (this.state.workingPortfolio[index].quantity > 0) {
      alert('Can\'t delete a stock you own!'); // todo: replace with modal
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

  // handleIncrement = (index) => {
  //   let tempPortfolio = [...this.state.workingPortfolio];
  //   tempPortfolio[index].netShareChange += 1
  //   this.setState({ workingPortfolio: tempPortfolio });
  // };

  // handleDecrement = (index) => {
  //   let tempPortfolio = [...this.state.workingPortfolio];
  //   tempPortfolio[index].netShareChange -= 1
  //   this.setState({ workingPortfolio: tempPortfolio });
  // };

  handleQtyChange = (index, action) => {
    // index is position in array, doIncrement is boolean, true means add, false means subtract
    const tempPortfolio = [...this.state.workingPortfolio];
    if (action === '+') tempPortfolio[index].netShareChange += 1;
    else if (action === '-') {
      // subtract, but not below zero:
      if (Math.abs(tempPortfolio[index].netShareChange) > 0) tempPortfolio[index].netShareChange -= 1;
    }
    this.setState({ workingPortfolio: tempPortfolio });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <img src={Logo} alt='Virtually Vested' />
              <h1>Stock Portfolio</h1>
              <h3>{this.state.name}</h3>
              <div className=''><p style={{ textDecoration: 'underline' }}>Starting Cash:</p> {formatCash(this.props.user.startingCash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Cash on Hand:</p> {formatCash(this.props.user.cash)}</div>
              <div><p style={{ textDecoration: 'underline' }}>Total Gain/Loss:</p> {formatCash(this.state.currentCash - this.state.startCash)}</div>
              {/* todo: use formatCash in below?: */}
              <div><p style={{ textDecoration: 'underline' }}>% Total Gain/Loss:</p> {(((this.state.currentCash - this.state.startCash) / this.state.startCash) * 100).toFixed(2)}%</div>
              {/* <div><p style={{ textDecoration: 'underline' }}>Rank:</p> {'X'} of {'X'}</div> */}
            </Jumbotron>
            <SearchStocks clickFunction={this.addStockToPortfolio} buttonLabel='Add Stock to Portfolio' />
            <div className='table-responsive' style={{ backgroundColor: '#5B45B9', color: 'white', width: 'auto', paddingTop: '5px' }}><h3 className='text-center'>Current Portfolio</h3></div>
            {this.props.stockPortfolio.length ? (
              <table className='table table-bordered table-hover table-sm'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col' className='text-center'>Symbol<br />Company Name</th>
                    <th scope='col' className='text-center'>Qty</th>
                    <th scope='col' className='text-center'>Current Price / Share</th>
                    <th scope='col' className='text-center'>Current Value</th>
                    <th scope='col' className='text-center'>Cost Basis per Share</th>
                    <th scope='col' className='text-center'>Total Cost Basis</th>
                    <th scope='col' className='text-center'>Total Gain/Loss</th>
                    <th scope='col' className='text-center'>% Total Gain/Loss</th>
                    <th scope='col' className='text-center'>Buy/Sell Action Selection & Estimated Impact</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.workingPortfolio.map((stock, index) => (
                    <StockPortfolioItem key={index} stock={stock} index={index} stockInfo={this.props.stockInfo} rerenderStockInfo={this.props.rerenderStockInfo}
                      workingPortfolio={this.state.workingPortfolio} handleQtyChange={this.handleQtyChange} />
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