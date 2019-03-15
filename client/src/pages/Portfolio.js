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
    const currStock = tempPortfolio[index];
    if (action === '+') currStock.netShareChange += 1;
    else if (action === '-') {
      // subtract, but not below zero:
      if (Math.abs(currStock.netShareChange) > 0) currStock.netShareChange -= 1;
    } else if (action === 'buy') {
      // buying or selling is stored in array by sign of the netShareChange, negative means sell
      currStock.netShareChange = Math.abs(currStock.netShareChange);
    } else if (action === 'sell') {
      currStock.netShareChange = - Math.abs(currStock.netShareChange);
      // if counter is higher than amount owned, reduce amount to sell to qty owned
      if (Math.abs(currStock.netShareChange) > currStock.quantity) currStock.netShareChange = -currStock.quantity;
    }
    this.setState({ workingPortfolio: tempPortfolio });
    // todo: if we click sell but qty is greater than qty owned, change qty to qty owned
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <img src={Logo} alt='Virtually Vested' />
          {/* <h1>Stock Portfolio</h1> */}
          <h4>{this.props.user.email}</h4>
          <Row>
            <Col size='sm-6 md-3 lg-2' className='text-right'>
              Initial Investment:
            </Col>
            <Col size='sm-6 md-3 lg-2' className='text-left'>
              {formatCash(this.props.user.startingCash)}
            </Col>
            <Col size='sm-12 md-6 lg-4'>
              Portfolio Value: {formatCash(this.props.user.portfolioValue)}
            </Col>
            <Col size='sm-12 md-6 lg-4'>
              Cash: {formatCash(this.props.user.cash)}
            </Col>
          </Row>
          <Row>
            <Col size='sm-12 md-6 lg-4'>
              Current Total (portfolio + cash): {formatCash(this.props.user.startingCash)}
            </Col>
            <Col size='sm-12 md-6 lg-4'>
              Total Gain/Loss:
                </Col>
            <Col size='sm-12 md-6 lg-4'>
              Total Gain / Loss %:
                </Col>
          </Row>
        </Jumbotron>

        <div className='table-responsive' style={{ backgroundColor: '#5B45B9', color: 'white', width: 'auto', paddingTop: '5px' }}><h3 className='text-center'>Current Portfolio</h3></div>
        {this.props.stockPortfolio.length ? (
          <>
            <table className='table table-bordered table-hover table-sm'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col' className='text-center'>Symbol<br />Company Name</th>
                  <th scope='col' className='text-right'>Qty</th>
                  <th scope='col' className='text-right'>Current Price / Share</th>
                  <th scope='col' className='text-right'>Current Value</th>
                  <th scope='col' className='text-right'>Cost Basis per Share</th>
                  <th scope='col' className='text-right'>Total Cost Basis</th>
                  <th scope='col' className='text-right'>Total Gain/Loss</th>
                  <th scope='col' className='text-center'>% Total Gain/Loss</th>
                  <th scope='col' className='text-center'>Modify</th>
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
            <SearchStocks clickFunction={this.addStockToPortfolio} buttonLabel='Add Stock to Portfolio' />
            <Button variant='outline-success' size='lg' block style={{ margin: '1rem' }}>Make Trade!</Button>
          </>
        ) : (
            // todo: timeout at some point?
            <h3>Loading data...</h3>
          )}

        <Footer />
      </Container>
    );
  }
}

export default Portfolio;