/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import { Col, Row, Container } from '../components/Grid';
import { formatCash } from '../utils/misc';

// todo: convert back to stateless function?
class TradeHistory extends Component {
  stockPrice = trade => {
    // check is necessary in case we haven't loaded stock info for a particular stock yet:
    return this.props.stockInfo[trade.tickerSymbol] ? this.props.stockInfo[trade.tickerSymbol].price : '';
  }

  netChange = trade => {
    if (this.props.stockInfo[trade.tickerSymbol]) {
      return this.stockPrice(trade) - Math.abs(trade.centsTotal / trade.quantity);
    }
    return '';
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Trade History</h1>
        </Jumbotron>
        <div><h3 className='text-center'>Trade History</h3></div>
        {this.props.transactions ? (
          <table className='table'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>Symbol/Name</th>
                <th scope='col' className='text-center'>Order</th>
                <th scope='col' className='text-center'>Qty</th>
                <th scope='col' className='text-right'>Cost Basis</th>
                <th scope='col' className='text-right'>Current Value</th>
                <th scope='col' className='text-right'>Net per Share</th>
                <th scope='col' className='text-right'>Net Total</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.map(trade => (
                <tr key={trade._id} className={'list-group-item-action'} >
                  <td style={{ display: 'block' }}>{trade.tickerSymbol}</td>
                  <td>{trade.quantity > 0 ? 'buy' : 'sell'}</td>
                  <td className='text-right'>{Math.abs(trade.quantity)}</td>
                  <td className='text-right'>{formatCash(Math.abs(trade.centsTotal / trade.quantity))}</td>
                  <td className='text-right'>{formatCash(this.stockPrice(trade))}</td>
                  <td className='text-right'>{formatCash(this.netChange(trade))}</td>
                  <td className='text-right'>{formatCash(this.netChange(trade) * Math.abs(trade.quantity))}</td>
                </tr>

              ))}
            </tbody>
          </table>
        ) : (
            <h3>Loading data...</h3>
          )}
      </Container>
    );
  }
}

export default TradeHistory;