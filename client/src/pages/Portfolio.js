import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
 
class Portfolio extends Component {
  state = {
    currentCash: 0,
    startCash: 0,
    email: '',
    name: '',
    portfolioValue: 0,
    tradeHistory: [],
    selectedStock: null // todo: determine data type
  };
 
  componentDidMount() {
    this.loadUserData();
  }
 
  loadUserData = () => {
    // todo: retry if db connection fails
    // todo: replace with a filter search when we have other users
    API.getUser()
      .then(res => {
        const { startCash, email, name, portfolioValue, tradeHistory } = res.data[0];
        console.log(res.data[0]);
        // Calculate the net of all trades:
        const transactionsNet = tradeHistory.reduce((net, trade) => (net + trade.total), 0);
        const currentCash = startCash + transactionsNet;
        this.setState({ currentCash, startCash, email, name, portfolioValue, tradeHistory })
      }).catch(err => console.log(err));
  };
 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <h1>Stock Portfolio</h1>
              <h3>{this.state.name}</h3>
              <div className="">Starting Cash: {formatCash(this.state.startCash)}</div>
              <div>Cash on Hand: {formatCash(this.state.currentCash)}</div>
            </Jumbotron>
            <div><h3 className='text-center'>Trade History</h3></div>
            {this.state.tradeHistory.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col" className='text-center'>Symbol</th>
                    <th scope="col" className='text-center'>Qty</th>
                    <th scope="col" className='text-right'>$ / ea</th>
                    <th scope="col" className='text-right'>Total Net</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tradeHistory.map(trade => (
                    <tr key={trade.date + trade.symbol + trade.type} className={trade.type === 'sell' ? 'bg-secondary' : 'bg-primary'} >
                      <td>{trade.type}</td>
                      <td className='text-center'>{trade.symbol}</td>
                      <td className='text-center'>{trade.qty}</td>
                      <td className='text-right'>{formatCash(trade.total / trade.qty)}</td>
                      <td className='text-right'>{formatCash(trade.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
                <h3>Loading data...</h3>
              )}
          </Col>
        </Row>
        <SearchStocks selectedStock={this.state.selectedStock} />
      </Container>
    );
  }
}
 
export default Portfolio;