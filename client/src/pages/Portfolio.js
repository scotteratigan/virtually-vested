import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
import ActionBtns from '../components/ActionBtns';
import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
 
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
        const transactionsNet = tradeHistory.reduce((net, trade) => (net + trade.price), 0);
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
              <div>Total Gain/Loss: {formatCash(this.state.currentCash-this.state.startCash)}</div>
              <div>% Total Gain/Loss: {(((this.state.currentCash-this.state.startCash)/this.state.startCash)*100).toFixed(2)}%</div>
              {/* Rank state data goes below */}
              <div>Rank: {"X"} of {"X"}</div>
            </Jumbotron>
              <SearchStocks selectedStock={this.state.selectedStock} />
                <div><h3 className='text-center'>Trade History</h3></div>
                {this.state.tradeHistory.length ? (
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
                      {this.state.tradeHistory.map(trade => (
                        <tr key={trade.date + trade.symbol + trade.type} className={'list-group-item-action'} >
                          <td style={{ display: 'block' }}>{trade.symbol}</td>
                          <td style={{ display: 'block' }}><a href={'link to company website from API call here'}>{trade.name}</a></td>
                          <td>{trade.qty}</td>
                          <td>{'API data'}</td>
                          <td>{'calc using API data'}</td>
                          <td className='text-center'>{formatCash(trade.price)}</td>
                          <td className='text-right'>{formatCash(trade.price * trade.qty)}</td>
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
                  <Button variant='outline-success' size='lg' block style={{ margin: '1rem'}}>Make Trade!</Button>
          </Col>
        </Row>
      </Container>
    );
  } 
}
 
export default Portfolio;