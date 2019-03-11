import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
// import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
// import ActionBtns from '../components/ActionBtns';
// import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
// import StockPriceLive from '../components/StockPriceLive/StockPriceLive';

// todo: convert to stateless component? maybe...
class Portfolio extends Component {

  state = { stocks: {} }

  renderPortfolioListing = () => {
    console.log('rendering portfolio listing:', this.props.stockPortfolio);
    return this.props.stockPortfolio.map(stock => {
      console.log('stock is:', stock);
      return (
        <tr key={stock.tickerSymbol} className={'list-group-item-action'} >
          <td style={{ display: 'block' }}>{stock.tickerSymbol}</td>
          <td style={{ display: 'block' }}><a href={'link to company website from API call here'}>link</a></td>
          <td>{stock.quantity}</td>
          <td>{formatCash(this.props.stockInfo[stock.tickerSymbol].price)}</td>
          <td>{formatCash(stock.quantity * this.props.stockInfo[stock.tickerSymbol].price)}</td>
        </tr>
      )
    })
  }

  // todo: redirect to login page if not logged in

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <h1>Stock Portfolio</h1>
              <h3>{this.props.user.name}</h3>
              <div className="">Cash: {this.props.user ? formatCash(this.props.user.cash) : 0}</div>
              {/* <div>Total Gain/Loss: formatCash(this.state.currentCash - this.state.startCash)</div>
              <div>% Total Gain/Loss: (((this.state.currentCash - this.state.startCash) / this.state.startCash) * 100).toFixed(2)%</div> */}
              {/* Rank state data goes below */}
              <div>Rank: {"X"} of {"X"}</div>
            </Jumbotron>
            <SearchStocks selectedStock={this.state.selectedStock} />
            {this.props.stockPortfolio ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className='text-center'>Symbol/Name</th>
                    <th scope="col" className='text-center'>Qty</th>
                    <th scope="col" className='text-right'>Current Price per Share</th>
                    <th scope="col" className='text-right'>Current Value</th>
                    {/* <th scope="col" className='text-right'>Cost Basis per Share</th>
                    <th scope="col" className='text-right'>Total Cost Basis</th>
                    <th scope="col" className='text-right'>Total Gain/Loss</th>
                    <th scope="col" className='text-right'>% Total Gain/Loss</th>
                    <th scope="col" className='text-center'>Action</th>
                    <th scope="col" className='text-right'>Impact</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.renderPortfolioListing()}
                </tbody>
              </table>
            ) : (
                <h3>No Stocks Found</h3>
              )}
            <Button variant='outline-success' size='lg' block style={{ margin: '1rem' }}>Make Trade!</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
