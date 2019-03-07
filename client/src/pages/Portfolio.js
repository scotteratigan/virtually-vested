import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
// import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
import ActionBtns from '../components/ActionBtns';
import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';

// todo: convert to stateless component? maybe...
class Portfolio extends Component {
  // props are transactions (array) and user (object)

  state = {}

  componentDidMount = () => {
    console.log('PROPS:', this.props);
    this.calculateCurrentStockHoldings();
  }

  calculateCurrentStockHoldings = () => {
    // An object is much more efficient than an array here.
    // Should be O(n) instead of O(n^2) if I used array.find().
    const stocksObject = {};
    this.props.transactions.forEach(transaction => {
      // console.log('Analyzing transaction:', transaction);
      const { tickerSymbol, quantity } = transaction;
      if (!stocksObject[tickerSymbol]) stocksObject[tickerSymbol] = 0;
      stocksObject[tickerSymbol] += quantity;
    });
    console.log('stocksObject:', stocksObject);
    this.setState({ stocks: stocksObject });
  }

  renderPortfolioListing = () => {
    for (let key in this.state.stocks) {
      console.log('Stock key:', key);
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <h1>Stock Portfolio</h1>
              <h3>{this.state.name}</h3>
              <div className="">Cash: {this.props.user ? formatCash(this.props.user.cash) : 0}</div>
              <div>Total Gain/Loss: formatCash(this.state.currentCash - this.state.startCash)</div>
              <div>% Total Gain/Loss: (((this.state.currentCash - this.state.startCash) / this.state.startCash) * 100).toFixed(2)%</div>
              {/* Rank state data goes below */}
              <div>Rank: {"X"} of {"X"}</div>
            </Jumbotron>
            <SearchStocks selectedStock={this.state.selectedStock} />
            {this.renderPortfolioListing()}
            {this.props.transactions ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className='text-center'>Symbol/Name</th>
                    <th scope="col" className='text-center'>Qty</th>
                    <th scope="col" className='text-right'>Current Price per Share</th>
                    <th scope="col" className='text-right'>Current Value</th>
                    <th scope="col" className='text-right'>Cost Basis per Share</th>
                    <th scope="col" className='text-right'>Total Cost Basis</th>
                    <th scope="col" className='text-right'>Total Gain/Loss</th>
                    <th scope="col" className='text-right'>% Total Gain/Loss</th>
                    <th scope="col" className='text-center'>Action</th>
                    <th scope="col" className='text-right'>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.transactions.map(trade => (
                    <tr key={trade._id} className={'list-group-item-action'} >
                      <td style={{ display: 'block' }}>{trade.tickerSymbol}</td>
                      <td style={{ display: 'block' }}><a href={'link to company website from API call here'}>{trade.name}</a></td>
                      <td>{trade.quantity}</td>
                      <td>{'API data'}</td>
                      <td>{'calc using API data'}</td>
                      <td className='text-center'>{formatCash(trade.centsTotal)}</td>
                      <td className='text-right'>formatCash(trade.price * trade.qty)</td>
                      <td>{'calc using API data'}</td>
                      <td>{'calc using API data'}</td>
                      <td style={{ display: 'block' }}><ActionBtns /></td>
                      <td style={{ display: 'block' }}><Counter /></td>


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
      </Container>
    );
  }
}

export default Portfolio;
