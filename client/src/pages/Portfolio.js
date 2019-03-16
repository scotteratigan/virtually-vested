import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Logo from '../images/logo.png';
import StockPortfolioItem from '../components/StockPortolioItem/StockPortfolioItem';

class Portfolio extends Component {
  state = {
    workingPortfolio: [],
    redirectToHome: false
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
    if (!this.props.userLoggedIn) {
      this.setState({ redirectToHome: true })
    } else {
      this.loadPortfolioData();
    }
  }

  componentDidUpdate = prevProps => {
    // re-render if list of stocks is a different length:
    if (prevProps.stockPortfolio.length !== this.props.stockPortfolio.length) {
      this.loadPortfolioData(); // todo: also detect small changes in quantities
      return;
    }
    // re-render if any quantity in list has changed, or stock ticker symbols don't match:
    for (let i = 0; i < prevProps.stockPortfolio.length; i++) {
      if (prevProps.stockPortfolio[i].quantity !== this.props.stockPortfolio[i].quantity ||
        prevProps.stockPortfolio[i].tickerSymbol !== this.props.stockPortfolio[i].tickerSymbol) {
        this.loadPortfolioData(); // todo: what if 
        return;
      }
    }
  }

  addStockToPortfolio = async ticker => {
    // wait to get new stock info before updating array to include new stock listing:
    await this.props.getNewStockInfo(ticker);
    const updatedPortfolio = [...this.state.workingPortfolio];
    updatedPortfolio.unshift({ centsTotal: 0, netShareChange: 0, quantity: 0, tickerSymbol: ticker }); // todo: replace with push but then render in opposite order
    this.setState({ workingPortfolio: updatedPortfolio });
  }

  handleQtyChange = (index, action) => {
    // index is position in array, doIncrement is boolean, true means add, false means subtract
    // man, this would have been much simpler to implement with 2 vars...
    const tempPortfolio = [...this.state.workingPortfolio];
    const currStock = tempPortfolio[index];
    const selling = currStock.netShareChange < 0 || (1 / currStock.netShareChange) === -Infinity;
    if (action === '+') {
      if (selling && currStock.quantity - Math.abs(currStock.netShareChange - 1) < 0) return; // don't allow to sell more than we have
      currStock.netShareChange = Math.abs(currStock.netShareChange) + 1;
      if (selling) currStock.netShareChange *= -1;
    }
    else if (action === '-') {
      // subtract, but not below zero:
      if (Math.abs(currStock.netShareChange) > 0) {
        currStock.netShareChange = Math.abs(currStock.netShareChange) - 1;
        if (selling) currStock.netShareChange *= -1;
      }
    } else if (action === 'buy') {
      // buying or selling is stored in array by sign of the netShareChange, negative means sell
      currStock.netShareChange = Math.abs(currStock.netShareChange);
    } else if (action === 'sell') {
      currStock.netShareChange = - Math.abs(currStock.netShareChange);
      // if counter is higher than amount owned, reduce amount to sell to qty owned
      if (Math.abs(currStock.netShareChange) > currStock.quantity) currStock.netShareChange = -currStock.quantity;
    }
    this.setState({ workingPortfolio: tempPortfolio });
  }

  formatTradeData = () => {
    const submitData = this.state.workingPortfolio
      .filter(stock => stock.netShareChange !== 0)
      .map(stock => ({ symbol: stock.tickerSymbol, net: stock.netShareChange }));
    this.props.submitTrade(submitData);
  }

  render() {
    return (
      <>
        {this.state.redirectToHome ? <Redirect to='/' /> : null}
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
                Portfolio Value: {formatCash(this.props.portfolioValue)}
              </Col>
              <Col size='sm-12 md-6 lg-4'>
                Cash: {formatCash(this.props.user.cash)}
              </Col>
            </Row>
            <Row>
              <Col size='sm-12 md-6 lg-4'>
                Current Total (portfolio + cash): {formatCash(this.props.user.cash + this.props.portfolioValue)}
              </Col>
              <Col size='sm-12 md-6 lg-4'>
                {/* current total - starting cash */}
                {/* todo: save this in state and conditionally render Total Gain or Total Loss instead of both */}
                Total Gain/Loss: {formatCash(this.props.user.cash + this.props.portfolioValue - this.props.user.startingCash)}
              </Col>
              <Col size='sm-12 md-6 lg-4'>
                {/* Net change / initial investment */}
                Total Gain/Loss: {((this.props.user.cash + this.props.portfolioValue - this.props.user.startingCash) / this.props.user.startingCash * 100).toFixed(2)}%
              </Col>
            </Row>
          </Jumbotron>

          <div className='table-responsive' style={{ backgroundColor: '#5B45B9', color: 'white', width: 'auto', paddingTop: '5px' }}><h3 className='text-center'>Current Portfolio</h3></div>
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
                  <th scope='col' className='text-right'>Cash Impact</th>
                </tr>
              </thead>
              <tbody>
                {this.state.workingPortfolio.map((stock, index) => (
                  <StockPortfolioItem key={stock.tickerSymbol} stock={stock} index={index} stockInfo={this.props.stockInfo}
                    workingPortfolio={this.state.workingPortfolio} handleQtyChange={this.handleQtyChange} />
                ))}
              </tbody>
            </table>
            <SearchStocks clickFunction={this.addStockToPortfolio} buttonLabel='Add Stock to Portfolio' prompt='Stock to add' />
            <Button variant='outline-success' size='lg' block style={{ margin: '1rem' }} onClick={() => this.formatTradeData()}>Make Trade!</Button>
          </>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Portfolio;