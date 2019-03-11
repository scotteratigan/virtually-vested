import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
// import API from '../utils/API';
// import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';
import SearchStocks from '../components/SearchStock/SearchStock';
// import Counter from '../components/Counter';
// import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';

// todo: convert to stateless component? maybe...
class Portfolio extends Component {
  // props are transactions (array) and user (object)

  state = {}

  componentDidMount = () => {
    console.log('PROPS:', this.props);
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size='md-6 sm-12'>
            <Jumbotron>
              <h1>Trade History</h1>
            </Jumbotron>
            <div><h3 className='text-center'>Trade History</h3></div>
            {this.props.transactions ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className='text-center'>Symbol/Name</th>
                    <th scope="col" className='text-center'>Qty</th>
                    <th scope="col" className='text-right'>Value Each</th>
                    <th scope="col" className='text-right'>Current Value</th>
                    <th scope="col" className='text-right'>Cost Basis per Share</th>
                    <th scope="col" className='text-right'>Total Cost Basis</th>
                    <th scope="col" className='text-right'>Total Gain/Loss</th>
                    <th scope="col" className='text-right'>% Total Gain/Loss</th>
                    <th scope="col" className='text-right'>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.transactions.map(trade => (
                    <tr key={trade._id} className={'list-group-item-action'} >
                      <td style={{ display: 'block' }}>{trade.tickerSymbol}</td>
                      <td>{trade.quantity}</td>
                      <td>{formatCash(trade.centsTotal / trade.quantity)}</td>
                      <td>{formatCash(this.props.stockInfo[trade.tickerSymbol].price)}</td>
                      <td className='text-center'>{formatCash(trade.centsTotal)}</td>
                      <td className='text-right'></td>
                      <td>{'calc using API data'}</td>
                      <td>{'calc using API data'}</td>
                      <td></td>


                      {/* <td className='text-right'><Moment format='MM-DD-YYYY HH:mm a'>{trade.date}</Moment></td> */}
                    </tr>

                  ))}
                </tbody>
              </table>
            ) : (
                <h3>Loading data...</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
