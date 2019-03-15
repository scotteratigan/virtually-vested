/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Col, Row } from '../Grid';

class StockPortfolioCounter extends Component {
  state = { buyMode: true }

  handleBuyClick = () => {
    this.setState({ buyMode: true });
    this.props.handleQtyChange(this.props.index, 'buy');
  }

  handleSellClick = () => {
    this.setState({ buyMode: false });
    this.props.handleQtyChange(this.props.index, 'sell');
  }

  render() {
    return (
      <>
        {/* todo: force buy/sell on same line */}
        <Row className='text-center'>
          <Col size='sm-6' className='text-center'>
            <button className='mx-auto' onClick={this.handleBuyClick}
              className={this.state.buyMode ? 'btn btn-primary' : 'btn btn-outline-info'}>
              Buy
            </button>
          </Col>
          <Col size='sm-6' className='text-center'>
            <button className='mx-auto' onClick={this.handleSellClick}
              className={!this.state.buyMode ? 'btn btn-primary' : 'btn btn-outline-info'}>
              Sell
            </button>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col size='sm-4'>
            {/* decrement button: */}
            <button className='btn-outline-danger btn-sm' onClick={() => this.props.handleQtyChange(this.props.index, '-')}>
              <i className='fas fa-xs fa-minus' />
            </button>
          </Col>
          <Col size='sm-4'>
            {/* netShareChange display: */}
            {Math.abs(this.props.workingPortfolio[this.props.index].netShareChange)}
          </Col>
          <Col size='sm-4'>
            {/* increment button: */}
            <button className='btn-outline-success btn-sm' onClick={() => this.props.handleQtyChange(this.props.index, '+')}>
              <i className='fas fa-xs fa-plus' />
            </button>
          </Col>
        </Row>
      </>
    );
  }
}

export default StockPortfolioCounter;